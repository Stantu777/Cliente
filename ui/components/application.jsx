import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { PrivateRoute, GuestOnlyRoute } from '../helpers'
import { Header, Sidebar } from './common'
import { DEFAULT_SIDEBAR, Home, Login } from './guest'
import { Container } from 'semantic-ui-react'
import { Logout } from './private'
/*import { Register } from './Default'
import { Dashboard } from './Dashboard'
import { RegisterThesis, TrackThesisProposal, ThesisProposals } from './MyThesis'*/
const sidebarMenu = [ DEFAULT_SIDEBAR ]

export default class Application extends Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Header />
                    <Sidebar routes={sidebarMenu} />
                    <div className="main">
                        <Container>
                            <Route exact path='/' component={Home} />
                            <GuestOnlyRoute exact path='/login' component={Login} />
                            <PrivateRoute exact path='/logout' component={Logout} />
                        </Container>
                    </div>
                </React.Fragment>
            </Router>
        )
    }
}
/*
<Route exact path='/' component={Home} />

                    <GuestOnlyRoute exact path='/login' component={Login} />
                    <GuestOnlyRoute exact path='/register' component={Register} />
                    <PrivateRoute exact path='/logout' component={Logout} />

                    <PrivateRoute exact path='/dashboard' component={Dashboard} />
                    <PrivateRoute exact path='/thesis/register' component={RegisterThesis} />
                    <PrivateRoute exact path='/thesis/track' component={TrackThesisProposal} />
                    <PrivateRoute exact path='/thesis/proposals' component={ThesisProposals} />
                    */