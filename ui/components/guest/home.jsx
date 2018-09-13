import React, { Component } from 'react'
import { Header, Icon } from 'semantic-ui-react'
import { PrivateSegment } from '../elements'

const LoggedInHeader = ({ me }) => (
    <Header as='h2'>
        <Icon name='user' circular />
        <Header.Content>
            Bienvenido,
            <Header.Subheader>
            {me.person.firstName} {me.person.lastName}
            </Header.Subheader>
        </Header.Content>
    </Header>
)

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <PrivateSegment children={<LoggedInHeader />} />
                Landing page...
            </React.Fragment>
        )
    }
}