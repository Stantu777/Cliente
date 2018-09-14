import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Divider, Form, Button, Header, Icon, Message } from 'semantic-ui-react'
import { UploadButton } from '../../elements'

export default class MakeProposal extends Component {
    state = {
        // Data
        solo: true,
        partnerId: ''
    }

    handleSubmit = () => {

    }

    handleChange = ({ target }) => {
        const { name, value } = target
        console.log(name, value)
    }

    handleCheckboxChange = (_, { name, checked}) => {
        this.setState({
            [name]: checked
        })
    }

    render() {
        const { solo } = this.state

        return (
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
                        <Form.Input iconPosition='left' placeholder='Título de tesis'>
                            <Icon name='info' />
                            <input name='thesisTitle' />
                        </Form.Input>
                    </Form.Field>

                    <Form.Field required>
                        <label>Línea de investigación</label>
                        <Form.Select fluid options={[]} name='inquiryId' placeholder='Línea de investigación' />
                    </Form.Field>

                    <Form.Field required>
                        <label>Descripción de tesis</label>
                        <Form.TextArea rows={4} placeholder='Describe tu tesis' />
                    </Form.Field>

                    <Form.Field required>
                        <label>Adjuntar propuesta</label>
                        <UploadButton label='Adjuntar propuesta' uid='register-thesis-upload-file' />
                    </Form.Field>

                    <Container fluid textAlign='center'>
                        <Button.Group className='centered'>
                            <Button as={Link} to='/'>Cancelar</Button>
                            <Button.Or text='o' />
                            <Button positive type='submit'>Inscribir</Button>
                        </Button.Group>
                    </Container>
                </Form>
            </React.Fragment>
        )
    }
}