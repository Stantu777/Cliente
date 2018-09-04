import React, { PureComponent } from 'react'
import { Container, Header, Form, Input, Icon, Button } from 'semantic-ui-react'
import Main from '../Main'
import { SIDEBAR_LINKS } from './SidebarLinks'

export default class Login extends PureComponent {
    render() {
        return (
            <Main menuItems={SIDEBAR_LINKS}>
                <Container>
                    <br /><br />
                    
                    <Header as='h2'>
                        Conectate
                    </Header>

                    <Form>
                        <Form.Field>
                            <Input iconPosition='left' placeholder='Correo electrónico'>
                                <Icon name='at' />
                                <input />
                            </Input>
                        </Form.Field>

                        <Form.Field>
                            <Input iconPosition='left' type='password' placeholder='Contraseña'>
                                <Icon name='key' />
                                <input />
                            </Input>
                        </Form.Field>

                        <Button primary type='submit'>Entrar</Button>
                    </Form>
                </Container>
            </Main>
        )
    }
}