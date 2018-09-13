import axios from 'axios'
import React, { PureComponent } from 'react'
import { Container, Header, Form, Input, Icon, Button, Divider, Dimmer, Loader, Message } from 'semantic-ui-react'
import Main from '../Main'
import { SIDEBAR_LINKS } from './SidebarLinks'
import { GENDERS } from '../../Common/Gender'
import { ID_TYPES } from '../../Common/IdType'

export default class Register extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            idType: '',
            firstName: '',
            lastName: '',
            age: '',
            sex: '',
            address: '',
            phone: '',
            email: '',
            password: '',
            repeatPassword: '',

            // Control attributes
            submitting: false,
            submitted: false,
            user: null
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit() {
        this.setState({
            submitting: true
        })

        axios.post('http://localhost:8080/register', this.state)
            .then(r => {
                const { data } = r

                this.setState({
                    submitting: false,
                    submitted: true,
                    user: data
                })

                this.autoRemoveSubmitState()
            })
            .catch(() => {
                this.setState({
                    submitting: false,
                    submitted: true
                })

                this.autoRemoveSubmitState()
            })
    }

    handleChange(event, data = null) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        this.setState({
            [name]: value
        })

        this.removeSubmitState()
    }

    removeSubmitState() {
        const { submitted } = this.state

        if (submitted) {
            this.setState({
                submitted: false,
                user: null
            })
        }
    }

    autoRemoveSubmitState() {
        setTimeout(() => {
            this.removeSubmitState()
        }, 3000)
    }

    handleIdTypeChange = (_, { value }) =>  this.setState({idType: value})

    handleSexChange = (_, { value }) =>  this.setState({sex: value})

    render() {
        const { submitting, submitted, user } = this.state

        return (
            <Main menuItems={SIDEBAR_LINKS}>
                <Container>
                    <br /><br />
                    
                    <Header as='h2'>
                        Registrate
                    </Header>

                    <Form onSubmit={this.handleSubmit}>
                        {submitted && user !== null ? (
                        <Message success visible
                                header={`Felicidades ${user.firstName + ' ' + user.lastName}.`} 
                                content='Ya te puedes conectar y registrar tu tesis' />
                        ) : (submitted ? (
                            <Message error visible 
                                    header='Lo sentimos, no se pudo registrar en el sistema' 
                                    content='Algo ha salido mal, intentalo nuevamente más tarde' />
                        ) : '')}
                        <Dimmer inverted active={submitting}>
                            <Loader inverted />
                        </Dimmer>
                        <Form.Field>
                            <Input iconPosition='left' placeholder='DNI o Carné de extranjería o Pasaporte'>
                                <Icon name='user circle' />
                                <input name='id' onChange={this.handleChange} />
                            </Input>
                        </Form.Field>

                        <Form.Field>
                            <Form.Select fluid labeled={false} options={ID_TYPES} placeholder='Tipo de documento' onChange={this.handleIdTypeChange} />
                        </Form.Field>

                        <Divider />

                        <Form.Field>
                            <Input iconPosition='left' placeholder='Nombres'>
                                <Icon name='font' />
                                <input name='firstName' onChange={this.handleChange} />
                            </Input>
                        </Form.Field>

                        <Form.Field>
                            <Input iconPosition='left' placeholder='Apellidos'>
                                <Icon name='font' />
                                <input name='lastName' onChange={this.handleChange} />
                            </Input>
                        </Form.Field>

                        <Form.Field>
                            <Input iconPosition='left' placeholder='Edad'>
                                <Icon name='birthday cake' />
                                <input name='age' onChange={this.handleChange} />
                            </Input>
                        </Form.Field>

                        <Form.Field>
                            <Form.Select fluid labeled={false} options={GENDERS} placeholder='Sexo' onChange={this.handleSexChange} />
                        </Form.Field>

                        <Divider />

                        <Form.Field>
                            <Input iconPosition='left' placeholder='Dirección'>
                                <Icon name='address card' />
                                <input name='address' onChange={this.handleChange} />
                            </Input>
                        </Form.Field>

                        <Form.Field>
                            <Input iconPosition='left' placeholder='Teléfono'>
                                <Icon name='phone' />
                                <input name='phone' onChange={this.handleChange} />
                            </Input>
                        </Form.Field>

                        <Divider />

                        <Form.Field>
                            <Input iconPosition='left' placeholder='Correo electrónico'>
                                <Icon name='at' />
                                <input name='email' onChange={this.handleChange} />
                            </Input>
                        </Form.Field>

                        <Form.Field>
                            <Input iconPosition='left' type='password' placeholder='Contraseña'>
                                <Icon name='key' />
                                <input name='password' onChange={this.handleChange} />
                            </Input>
                        </Form.Field>

                        <Form.Field>
                            <Input iconPosition='left' type='password' placeholder='Repetir contraseña'>
                                <Icon name='key' />
                                <input name='repeatPassword' onChange={this.handleChange} />
                            </Input>
                        </Form.Field>

                        <Divider />

                        <Button primary type='submit'>Registrar</Button>
                    </Form>
                </Container>
            </Main>
        )
    }
}