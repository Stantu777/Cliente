import map from 'lodash/map'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dimmer, Loader, Header, Icon, Table, Popup, Label, Button, Segment, Tab } from 'semantic-ui-react'
import { Thesis } from '../../../../lib'

export default class ListProposals extends Component {
    state = {
        theses: [],
        finishedLoading: false
    }

    componentDidMount() {
        Thesis.all().then(theses => {
            this.setState({
                theses: theses,
                finishedLoading: true
            })
        }).catch(error => {
            console.log(error)

            this.setState({
                finishedLoading: true
            })
        })
    }
    
    render() {
        const { finishedLoading, theses } = this.state

        return (
            <React.Fragment>
                <Header as='h2'>
                    <Icon name='file alternate outline' />
                    <Header.Content>
                        Propuestas de tesis
                        <Header.Subheader>Debajo se listan las propuestas de tesis que han sido registradas</Header.Subheader>
                    </Header.Content>
                </Header>

                <br />

                {!finishedLoading ? (
                    <Segment>
                        <Loader active inline='centered'>Cargando...</Loader>
                    </Segment>
                ) : (
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
                                    Línea de investigación
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Autor(es)
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {map(theses, (thesis, i) => {
                                return <ThesisProposal thesis={thesis} key={`proposal-entry-${i}`} />
                            })}
                        </Table.Body>
                    </Table>
                )}
            </React.Fragment>
        )
    }
}

const ThesisProposal = ({ thesis }) => {
    const { id, topic, author, lineOfInvestigation } = thesis

    return (
        <Table.Row>
            <Table.Cell collapsing>
                <Button size='tiny' as={Link} to={`/theses/${id}`} icon='eye' />
            </Table.Cell>
            <Table.Cell singleLine textAlign='center'>
                <Popup trigger={<Icon size='large' color='yellow' name='wait' />} content='Pendiente' />
            </Table.Cell>
            <Table.Cell width={6}>
                {topic}
            </Table.Cell>
            <Table.Cell>
                {lineOfInvestigation.description}
            </Table.Cell>
            <Table.Cell>
                <Label.Group size='mini'>
                    <Label image>
                        <img src={author.sex === 1 ? 'https://react.semantic-ui.com/images/avatar/small/nan.jpg' : 'https://react.semantic-ui.com/images/avatar/small/zoe.jpg'} />
                        {`${author.firstName} ${author.lastName}`}
                    </Label>
                </Label.Group>
            </Table.Cell>
        </Table.Row>
    )
}