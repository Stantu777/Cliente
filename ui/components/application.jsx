import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Header, Sidebar } from './common'
import { Home, Login, Register } from './guest'
import { PrivateRoute, GuestOnlyRoute } from '../helpers'
import { Logout, MakeProposal, TrackProposal, ListProposals } from './private'

export default class Application extends Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Header />
                    <Sidebar />
                    <div className="main">
                        <Container>
                            <Switch>
                                <Route exact path='/' component={Home} />

                                <GuestOnlyRoute exact path='/login' component={Login} />
                                <GuestOnlyRoute exact path='/register' component={Register} />
                                <PrivateRoute exact path='/logout' component={Logout} />

                                <PrivateRoute exact path='/thesis/new' component={MakeProposal} />
                                <PrivateRoute exact path='/thesis/proposal' component={TrackProposal} />
                                <PrivateRoute exact path='/management/proposals' component={ListProposals} />
                            </Switch>
                        </Container>
                    </div>
                </React.Fragment>
            </Router>
        )
    }
}