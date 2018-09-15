import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Container, Header, Icon, Image, Label, List, Segment } from 'semantic-ui-react'

export default class TrackProposal extends Component {
    render() {
        return (
            <React.Fragment>
                <Header as='h2'>
                    <Icon name='info' />
                    <Header.Content>
                        Resumen de propuesta de tesis
                        <Header.Subheader>Detalles registrados en el sistema (Lo que ve la Oficina de Grados y Títulos)</Header.Subheader>
                    </Header.Content>
                </Header>
                <Segment>
                    <Segment vertical>
                        <Header as='h4'>Título de tesis</Header>
                        <div>
                            Sistema de información para el proceso de control de tesis 
                            de la Oficina de Grados y Títulos de la Facultad de Ingeniería 
                            y Arquitectura de la Universidad de San Martín de Porres en 
                            Lima, Perú
                        </div>
                    </Segment>
                    <Segment vertical>
                        <Header as='h4'>Línea de investigación</Header>
                        <div>
                            Ingeniería de Software
                        </div>
                    </Segment>
                    <Segment vertical>
                        <Header as='h4'>Desarrollado por</Header>
                        <div>
                            <Label image>
                                <img src='https://react.semantic-ui.com/images/avatar/small/nan.jpg' />
                                Vladimir Ibazeta
                            </Label>
                            <Label image>
                                <img src='https://react.semantic-ui.com/images/avatar/small/zoe.jpg' />
                                Stefanny Solari
                            </Label>
                        </div>
                    </Segment>
                    <Segment vertical>
                        <Header as='h4'>Descripción</Header>
                        <div>
                            El propósito del proyecto es el de implementar un sistema
                            de información que brinde un servicio eficiente y sin 
                            problemas para los estudiantes que optan por elaborar una
                            tesis.
                        </div>
                    </Segment>
                    <Segment vertical>
                        <Header as='h4'>Propuesta de tesis</Header>
                        <div>
                            <Button icon color='green' labelPosition='left'>
                                <Icon name='cloud download' />
                                Descargar
                            </Button>
                        </div>
                    </Segment>
                </Segment>

                <Header as='h2'>
                    <Icon name='check circle outline' />
                    <Header.Content>
                        Estado
                        <Header.Subheader>Estado actual de la propuesta</Header.Subheader>
                    </Header.Content>
                </Header>
                <Segment>
                    <List divided relaxed>
                        <List.Item>
                            <List.Content>
                                <List.Header>Revisado por Secretaria</List.Header>
                                Pendiente
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>Notificado a Instituto de Investigación</List.Header>
                                Pendiente
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>Aprobado por Instituto de Investigación</List.Header>
                                Pendiente
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>Asignado asesor por Director de Escuela</List.Header>
                                Pendiente
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>Propuesta aprobada</List.Header>
                                Pendiente
                            </List.Content>
                        </List.Item>
                    </List>
                </Segment>

                <Header as='h2'>
                    <Icon name='settings' />
                    <Header.Content>
                        Actividades
                        <Header.Subheader>Seguimiento de actividades realizadas sobre tu propuesta</Header.Subheader>
                    </Header.Content>
                </Header>
                <Card.Group itemsPerRow={1}>
                    <Card>
                        <Card.Content>
                            <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
                            <Card.Header>Jorge Martín Figueroa</Card.Header>
                            <Card.Meta>Asesor de tesis</Card.Meta>
                            <Card.Description>
                                Ha sido asignado como Asesor de Tesis
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
                            <Card.Header>Ruben Garbía Farje</Card.Header>
                            <Card.Meta>Director de EPICS</Card.Meta>
                            <Card.Description>
                                Asignó a <Link to='/users/profile/555555'>Jorge Martín Figueroa</Link> como Asesor de Tesis
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
                            <Card.Header>Ruben Cuadros Ricra</Card.Header>
                            <Card.Meta>Instituto de investigación</Card.Meta>
                            <Card.Description>
                                Aprueba propuesta de tesis
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
                            <Card.Header>María Mariluz Ruíz</Card.Header>
                            <Card.Meta>Secretaria de Oficina de Grados y Títulos</Card.Meta>
                            <Card.Description>
                                Notificó a Instituto de Investigación
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Card.Group>
                <Container fluid textAlign='center'>
                    <Button>Cargar más</Button>
                </Container>
            </React.Fragment>
        )
    }
}