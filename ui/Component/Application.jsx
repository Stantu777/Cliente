import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Header'
import { Home, Login, Logout, Register } from './Default'
import { Dashboard } from './Dashboard'
import Connection from '../Service/Connection'
import { PrivateRoute } from '../Common/PrivateRoute'
import { RegisterThesis, TrackThesisProposal, ThesisProposals } from './MyThesis'


export default class Application extends PureComponent {
    _connection = new Connection()

    render() {
        return (
            <Router>
                <React.Fragment>
                    <Header />
                    
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <PrivateRoute exact path='/logout' component={Logout} />

                    <PrivateRoute exact path='/dashboard' component={Dashboard} />
                    <PrivateRoute exact path='/thesis/register' component={RegisterThesis} />
                    <PrivateRoute exact path='/thesis/track' component={TrackThesisProposal} />
                    <PrivateRoute exact path='/thesis/proposals' component={ThesisProposals} />
                </React.Fragment>
            </Router>
        )
    }
}