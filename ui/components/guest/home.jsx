import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import genesis from '../../service'

const PrivateSegment = ({ me }) => (
    <Route path='/' exact children={() => (
        <Header as='h2'>
            <Icon name='user' circular />
            <Header.Content>
                Bienvenido,
                <Header.Subheader>
                {me.person.firstName} {me.person.lastName}
                </Header.Subheader>
            </Header.Content>
        </Header>
    )} />
)

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <PrivateSegment me={genesis} />
                Landing page...
            </React.Fragment>
        )
    }
}