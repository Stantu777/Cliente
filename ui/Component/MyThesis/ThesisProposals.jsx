import 'lodash'
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Icon, Table, Popup, Label, Button, Menu } from 'semantic-ui-react'
import { SIDEBAR_LINKS } from '../Dashboard'
import Main from '../Main'

export default class ThesisProposals extends PureComponent {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <Main menuItems={SIDEBAR_LINKS}>
                <Container>
                    <br /><br />
                    <Header as='h2'>
                        <Icon name='file alternate outline' />
                        <Header.Content>
                            Propuestas de tesis
                            <Header.Subheader>Debajo se listan las propuestas de tesis que han sido registradas</Header.Subheader>
                        </Header.Content>
                    </Header>
                    <br />

                    <Table compact celled definition>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell />
                                <Table.HeaderCell singleLine>
                                    Estado
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Título
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Autor(es)
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Última actualización
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {_.map(new Array(20), () => {
                                return <TestRow />
                            })}
                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan={4}>
                                    <Menu floated='right' pagination>
                                        <Menu.Item as='a' icon>
                                            <Icon name='chevron left' />
                                        </Menu.Item>
                                        <Menu.Item as='a'>1</Menu.Item>
                                        <Menu.Item as='a'>2</Menu.Item>
                                        <Menu.Item as='a'>3</Menu.Item>
                                        <Menu.Item as='a'>4</Menu.Item>
                                        <Menu.Item as='a'>5</Menu.Item>
                                        <Menu.Item as='a' icon>
                                            <Icon name='chevron right' />
                                        </Menu.Item>
                                    </Menu>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                    <br /><br />
                </Container>
            </Main>
        )
    }
}

const TestRow = () => {
    return (
        <Table.Row>
            <Table.Cell collapsing>
                <Button size='tiny' as={Link} to='/thesis/track' icon='eye' />
            </Table.Cell>
            <Table.Cell singleLine textAlign='center'>
                <Popup trigger={<Icon size='large' color='yellow' name='wait' />} content='Pendiente' />
            </Table.Cell>
            <Table.Cell width={6}>
                Sistema de información para el proceso de control de tesis de la Oficina de Grados y Títulos... <Button size='mini' compact>Leer más</Button>
            </Table.Cell>
            <Table.Cell>
                <Label.Group size='mini'>
                    <Label image>
                        <img src='https://react.semantic-ui.com/images/avatar/small/nan.jpg' />
                        Vladimir Ibazeta
                    </Label>
                    <Label image>
                        <img src='https://react.semantic-ui.com/images/avatar/small/zoe.jpg' />
                        Stefanny Solari
                    </Label>
                </Label.Group>
            </Table.Cell>
            <Table.Cell>
                Hace 10 días, por <Link to='/users/profile/5555555'>Ruben Cuadros Ricra</Link>
            </Table.Cell>
        </Table.Row>
    )
}