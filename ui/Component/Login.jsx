import React, { PureComponent } from 'react';
import { Container, Header, Form, Input, Icon, Button, Divider } from 'semantic-ui-react';

export default class Login extends PureComponent {
    render() {
        return (
            <Container text>
                <Divider hidden />
                
                <Header as='h2'>
                    Ingresar al sistema
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
        );
    }
}