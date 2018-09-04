import axios from 'axios'
import React, { PureComponent } from 'react'
import { Container, Header, Form, Input, Icon, Button, Divider, Dimmer, Loader, Message } from 'semantic-ui-react'
import { SIDEBAR_LINKS } from '../Dashboard'
import Main from '../Main'
import { UploadButton } from '../Common'

const THESIS_INQUIRIES = [
    {key: 'a', text: 'Ingeniería de Software', value: 1},
    {key: 'b', text: 'Ciencia de la Computación', value: 2},
    {key: 'c', text: 'Ingeniería de Computadoras', value: 3},
    {key: 'd', text: 'Sistemas de información', value: 4},
    {key: 'e', text: 'Tecnología de información', value: 5},
]

export default class RegisterThesis extends PureComponent {
    render() {
        return (
            <Main menuItems={SIDEBAR_LINKS}>
                <Container>
                    <br /><br />
                    <Header size='large'>Registrar tesis</Header>
                    
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
                            </Message.List>
                        </Message.Content>
                    </Message>
                    
                    <Divider />

                    <Form>
                        <Form.Field>
                            <Input iconPosition='left' placeholder='Título de tesis'>
                                <Icon name='info' />
                                <input name='title' />
                            </Input>
                        </Form.Field>
                        
                        <Form.Field>
                            <Form.Select fluid labeled={false} options={THESIS_INQUIRIES} placeholder='Línea de investigación' />
                        </Form.Field>

                        <Form.Field>
                            <UploadButton label='Adjuntar propuesta de tesis' uid='register-thesis-upload-file' />
                        </Form.Field>
                    </Form>
                </Container>
            </Main>
        )
    }
}