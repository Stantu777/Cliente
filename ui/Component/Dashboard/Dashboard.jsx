import React, { PureComponent } from 'react'
import Main from '../Main'
import { SIDEBAR_LINKS } from './DashboardSidebarLinks'
import { Header, Container } from 'semantic-ui-react'
import { TEMP_AUTH } from '../../Common/TempAuth'

export default class Dashboard extends PureComponent {
    render() {
        return (
            <Main menuItems={SIDEBAR_LINKS}>
                <Container>
                    <Header size='large'>Dashboard</Header>
                    Bienvenido {`${TEMP_AUTH.user.firstName} ${TEMP_AUTH.user.lastName}`}
                </Container>
            </Main>
        )
    }
}