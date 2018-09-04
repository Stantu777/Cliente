import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Header, Form, Input, Icon, Button, Dimmer, Loader, Message } from 'semantic-ui-react'
import Main from '../Main'
import { SIDEBAR_LINKS } from './SidebarLinks'
import { TEMP_AUTH } from '../../Common/TempAuth'

export default class Login extends PureComponent {
    state = {
        email: '',
        password: '',

        // Control
        submitting: false,
        submitted: false,
        redirectToReferrer: false
    }

    handleSubmit = () => {
        this.setState({
            submitting: true
        })

        TEMP_AUTH.login(this.state, () => {
            this.setState({
                email: '',
                password: '',
                submitting: false,
                submitted: true,
                redirectToReferrer: true
            })
        }, () => {
            this.setState({
                submitting: false,
                submitted: true
            })
        })
    }

    handleChange = e => {
        const { target } = e

        this.setState({
            [target.name]: target.value
        })
    }

    render() {
        const { from } = this.props.location.state || {from: {pathname: '/dashboard'}}
        const { submitting, submitted, email, password, redirectToReferrer } = this.state
        
        if (redirectToReferrer) {
            return <Redirect to={from} />
        }

        return (
            <Main menuItems={SIDEBAR_LINKS}>
                <Container>
                    <br /><br />
                    
                    <Header as='h2'>
                        Conectate
                    </Header>

                    <Form onSubmit={this.handleSubmit}>
                        <Dimmer inverted active={submitting}>
                            <Loader inverted />
                        </Dimmer>

                        <Message success 
                            visible={submitted && TEMP_AUTH.user !== null}
                            header={`Te has conectado ${TEMP_AUTH.firstName + ' ' + TEMP_AUTH.lastName}.`} 
                            content='Serás redirigido en unos instantes.' />
                        
                        <Message error
                            visible={submitted && TEMP_AUTH.user === null}
                            header={`Intento de conexión fallido`} 
                            content='Por favor, inténtelo más tarde.' />

                        <Form.Field>
                            <Input iconPosition='left' placeholder='Correo electrónico'>
                                <Icon name='at' />
                                <input name='email' value={email} onChange={this.handleChange} />
                            </Input>
                        </Form.Field>

                        <Form.Field>
                            <Input iconPosition='left' type='password' placeholder='Contraseña'>
                                <Icon name='key' />
                                <input name='password' value={password} onChange={this.handleChange} />
                            </Input>
                        </Form.Field>

                        <Button primary type='submit'>Entrar</Button>
                    </Form>
                </Container>
            </Main>
        )
    }
}