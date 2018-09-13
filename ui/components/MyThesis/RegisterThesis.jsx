import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Form, Input, Icon, Button, Divider, Message } from 'semantic-ui-react'
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
    constructor(props) {
        super(props)

        this.state = {
            single: true
        }

        this.handleSingle = this.handleSingle.bind(this)
    }

    handleSingle(_, { checked }) {
        this.setState({
            single: checked
        })
    }
    
    render() {
        const { single } = this.state

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
                                <Message.Item>
                                    Solo se puede desarrollar la tesis en equipos de 2 o solo.
                                </Message.Item>
                            </Message.List>
                        </Message.Content>
                    </Message>

                    <Form>
                        <Form.Field>
                            <Form.Checkbox checked={single} onChange={this.handleSingle} label='Desarrollo individual de tesis' />
                        </Form.Field>

                        <Form.Field>
                            <Form.Input disabled={single} type='text' 
                                icon='users' 
                                iconPosition='left'
                                placeholder='Buscar compañero de tesis' />
                        </Form.Field>

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

                        <Form.Field>
                            <Form.TextArea rows={4} placeholder='Describe tu tesis' />
                        </Form.Field>

                        <Divider />

                        <Button primary type='submit'>Registrar</Button>
                        <Button as={Link} to='/dashboard'>Cancelar</Button>
                    </Form>
                </Container>
            </Main>
        )
    }
}