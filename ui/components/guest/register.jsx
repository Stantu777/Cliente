import findIndex from 'lodash/findIndex'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Form, Divider, Button, Icon } from 'semantic-ui-react'
import { ID_TYPES, SEXES } from '../../data'
import { School } from '../../../lib'

export default class Register extends Component {
    state = {
        // Data
        idType: '',
        id: '',
        sex: '',

        // Control
        idLabel: '...',
        hasSelectedIdType: false
    }

    componentDidMount() {
        School.all().then(schools => {
            console.log(schools)
        }).catch(e => {
            console.log(e)
        })
    }

    handleChange = ({ name, value }) => {
        console.log(name, value)
    }

    handleSelectChange = (_, d) => {
        const { name, value } = d

        if (name === 'idType') {
            const { text } = ID_TYPES[findIndex(ID_TYPES, idType => idType.value === value)]

            this.setState({
                [name]: value,
                idLabel: text,
                hasSelectedIdType: true
            })

            return
        }

        this.setState({
            [name]: value
        })
    }

    handleSubmit = () => {
        console.log('submit')
    }

    render() {
        // Data
        const { id, idType, sex } = this.state

        // Control
        const { idLabel, hasSelectedIdType } = this.state

        return (
            <React.Fragment>
                <Header as='h2'>Registrate</Header>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Field required>
                        <label>Tipo de documento</label>
                        <Form.Select name='idType' value={idType} fluid options={ID_TYPES} placeholder='Tipo de documento' onChange={this.handleSelectChange} />
                    </Form.Field>
                    <Form.Field required>
                        <label>{idLabel}</label>
                        <Form.Input disabled={!hasSelectedIdType} iconPosition='left' placeholder={idLabel}>
                            <Icon name='user circle' />
                            <input name='id' value={id} onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>

                    <Divider section />

                    <Form.Field required>
                        <label>Nombres completos</label>
                        <Form.Input iconPosition='left' placeholder='Nombres completos'>
                            <Icon name='font' />
                            <input name='firstName' onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>
                    <Form.Field required>
                        <label>Apellidos completos</label>
                        <Form.Input iconPosition='left' placeholder='Apellidos completos'>
                            <Icon name='font' />
                            <input name='lastName' onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>
                    <Form.Field required>
                        <label>Edad</label>
                        <Form.Input iconPosition='left' placeholder='Edad'>
                            <Icon name='birthday cake' />
                            <input name='age' onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>
                    <Form.Field required>
                        <label>Sexo</label>
                        <Form.Select name='sex' value={sex} fluid labeled={false} options={SEXES} placeholder='Sexo' onChange={this.handleSelectChange} />
                    </Form.Field>

                    <Divider section />

                    <Form.Field required>
                        <label>Correo electrónico</label>
                        <Form.Input iconPosition='left' placeholder='Correo electrónico'>
                            <Icon name='at' />
                            <input name='email' onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>
                    <Form.Field required>
                        <label>Dirección</label>
                        <Form.Input iconPosition='left' placeholder='Dirección'>
                            <Icon name='address card' />
                            <input name='address' onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>
                    <Form.Field required>
                        <label>Teléfono</label>
                        <Form.Input iconPosition='left' placeholder='Teléfono'>
                            <Icon name='phone' />
                            <input name='phone' onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>

                    <Divider section />

                    <Form.Field required>
                        <label>Contraseña</label>
                        <Form.Input iconPosition='left' type='password' placeholder='Contraseña'>
                            <Icon name='key' />
                            <input name='password' onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>
                    <Form.Field required>
                        <label>Repetir contraseña</label>
                        <Form.Input iconPosition='left' type='password' placeholder='Repetir contraseña'>
                            <Icon name='key' />
                            <input name='repeatPassword' onChange={this.handleChange} />
                        </Form.Input>
                    </Form.Field>

                    <Container fluid textAlign='center'>
                        <Button.Group className='centered'>
                            <Button as={Link} to='/'>Cancelar</Button>
                            <Button.Or text='o' />
                            <Button positive type='submit'>Registrar</Button>
                        </Button.Group>
                    </Container>
                </Form>
            </React.Fragment>
        )
    }
}