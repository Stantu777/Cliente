import map from 'lodash/map'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Dimmer, Divider, Dropdown, Form, Header, Icon, Loader, Message } from 'semantic-ui-react'
import genesis from '../../../client'
import { UploadButton } from '../../elements'
import { Thesis } from '../../../../lib'
import { validate } from '../../../helpers'

export default class MakeProposal extends Component {
    listenedId = null
    
    state = {
        me: genesis.me,
        myThesis: null,
        checked: false,

        partnerId: '',
        topic: '',
        lineOfInvestigationId: '',
        description: '',
        topicIsValid: null,
        lineOfInvestigationIdIsValid: null,
        descriptionIsValid: null,

        solo: true,
        lines: [],
        canSubmit: false,
        submitting: false,
        submitted: null,
        errored: null
    }

    componentDidMount() {
        const { me } = this.state

        this.listenedId = genesis.addOnReady(this.loadLines)

        Thesis.mine().then(thesis => {
            this.setState({
                myThesis: thesis,
                checked: true
            })

            if (thesis.id === null && me !== null) {
                this.loadLines(me, null);
            }
        }).catch(error => {
            console.log(error)

            this.setState({
                checked: true
            })
        })
    }

    componentWillUnmount() {
        genesis.removeOnReady(this.listenedId)
    }

    loadLines = (me, error) => {
        if (error !== null) {
            return
        }

        const { school } = me.person

        school.getLinesOfInvestigation().then(lines => {
            this.setState({
                lines: map(lines, (line, index) => ({
                    key: `line-of-investigation-${index}`,
                    value: line.id,
                    text: line.description
                }))
            })
        }).catch(error => {
            console.log(error)
        })
    }

    handleSubmit = () => {
        if (this.state.submitting) {
            return
        }

        const { person } = this.state.me
        const { topic, description, lineOfInvestigationId } = this.state

        this.setState({
            submitting: true
        })

        Thesis.new({
            authorId: person.id,
            topic: topic,
            description: description,
            lineOfInvestigationId: lineOfInvestigationId
        }).then(() => {
            this.setState({
                topic: '',
                description: '',
                lineOfInvestigationId: '',
                canSubmit: false,
                submitting: false,
                submitted: true,
                errored: false
            })
        }).catch(error => {
            console.log(error)

            this.setState({
                submitting: false,
                submitted: true,
                errored: true
            })
        })
    }

    checkIfSubmittable = () => {
        const { topicIsValid, descriptionIsValid, lineOfInvestigationIdIsValid } = this.state

        return topicIsValid && descriptionIsValid && lineOfInvestigationIdIsValid
    }

    handleChange = ({ target }) => {
        const { name, value } = target
        const nameIsValid = `${name}IsValid`
        const isValid = validate(name, value)

        if (!isValid) {
            this.setState({
                [name]: value,
                [nameIsValid]: false,
                canSubmit: false
            })

            return
        }

        this.state[nameIsValid] = true

        this.setState({
            [name]: value,
            [nameIsValid]: true,
            canSubmit: this.checkIfSubmittable()
        })
    }

    handleCheckboxChange = (_, { name, checked }) => {
        this.setState({
            [name]: checked
        })
    }

    handleSelectChange = (_, { name, value }) => this.handleChange({ target: { name: name, value: value } })

    render() {
        const {
            solo,
            lines,
            topic,
            description,
            lineOfInvestigationId,
            topicIsValid,
            descriptionIsValid,
            lineOfInvestigationIdIsValid,
            checked,
            myThesis,
            canSubmit,
            submitted,
            submitting,
            errored
        } = this.state

        return !checked ? (
            <Dimmer active inverted>
                <Loader inverted>Cargando</Loader>
            </Dimmer>
        ) : (myThesis.id !== null ? (
            <Message warning icon='exclamation triangle' header='Ya has registrado una propuesta' content='Revisa el seguimiento de tu propuesta de tesis' />
        ) : (
            <React.Fragment>
                <Header as='h2'>Inscribir propuesta</Header>
                <Message icon>
                    <Icon name='exclamation' />
                    <Message.Content>
                        <Message.Header>Aviso importante</Message.Header>
                        <Message.List>
                            <Message.Item>Seguir la guía de inscripción</Message.Item>
                            <Message.Item>Realizar inscripción en tesorería previamente</Message.Item>
                            <Message.Item>Tienes que adjuntar la propuesta de tesis</Message.Item>
                            <Message.Item>
                                Detallar correctamente y puntualmente el título y línea de investigación 
                                de la tesis, de lo contrario puede ser rechazada
                            </Message.Item>
                            <Message.Item>
                                Solo se puede desarrollar la tesis en equipos de 2 o solo.
                            </Message.Item>
                        </Message.List>
                    </Message.Content>
                </Message>
                <Divider hidden />
                <Form onSubmit={this.handleSubmit}>
                    {submitted === true ? (
                        <Message error={errored === true} success={errored === false} visible
                        header={errored === true ? 'Error, no se pudo inscribir tu propuesta' : errored === false ? 'Felicitaciones! Has inscrito tu propuesta' : null}
                        content={errored === true ? 'Algo ha salido mal, no se ha podido inscribir tu propuesta' : errored === false ? 'Digirete a la página de seguimiento de estado de propuesta para estar al tanto de la aprobación de tu propuesta' : null} />
                    ) : null}
                    <Form.Field>
                        <Form.Checkbox name='solo' required checked={solo} onChange={this.handleCheckboxChange} label='Desarrollo individual de tesis' />
                    </Form.Field>
                    <Form.Field disabled={solo} required={!solo}>
                        <label>Buscar compañero de tesis</label>
                        <Form.Input name='partnerId' type='text' icon='users' iconPosition='left' onChange={this.handleChange} placeholder='Buscar compañero de tesis' />
                    </Form.Field>
                    <Divider section />
                    <Form.Field required>
                        <label>Título de tesis</label>
                        <Form.Input disabled={submitting} error={topicIsValid === false} iconPosition='left' placeholder='Título de tesis'>
                            <Icon name='info' />
                            <input name='topic' value={topic} onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>
                    <Form.Field required>
                        <label>Línea de investigación</label>
                        <Dropdown disabled={submitting} error={lineOfInvestigationIdIsValid === false} name='lineOfInvestigationId' value={lineOfInvestigationId} placeholder='Línea de investigación' fluid search selection options={lines} loading={!lines.length} onChange={this.handleSelectChange} />
                    </Form.Field>
                    <Form.Field required>
                        <label>Descripción de tesis</label>
                        <Form.TextArea disabled={submitting} error={descriptionIsValid === false} name='description' value={description} rows={4} placeholder='Describe tu tesis' onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field required>
                        <label>Adjuntar propuesta</label>
                        <UploadButton label='Adjuntar propuesta' uid='register-thesis-upload-file' />
                    </Form.Field>
                    <Container fluid textAlign='center'>
                        <Button.Group className='centered'>
                            <Button disabled={submitting} as={Link} to='/'>Cancelar</Button>
                            <Button.Or text='o' />
                            <Button positive type='submit' loading={submitting} disabled={!canSubmit}>Inscribir</Button>
                        </Button.Group>
                    </Container>
                </Form>
            </React.Fragment>
        ))
    }
}