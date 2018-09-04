import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Header'
import { Home, Login, Register } from './Default'
import { Dashboard } from './Dashboard'
import Connection from '../Service/Connection'
import { PrivateRoute } from '../Common/PrivateRoute';
import { RegisterThesis } from './MyThesis';


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

                    <PrivateRoute exact path='/dashboard' component={Dashboard} />
                    <PrivateRoute exact path='/thesis/register' component={RegisterThesis} />
                </React.Fragment>
            </Router>
        )
    }
}