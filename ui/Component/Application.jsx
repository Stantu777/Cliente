import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Header'
import { Home, Login } from './Default'
import Connection from '../Service/Connection'

export default class Application extends PureComponent {
    _connection = new Connection()

    render() {
        return (
            <Router>
                <React.Fragment>
                    <Header />
                    <Route exact path='/' component={Home} />
                    <Route path='/login' component={Login} />
                </React.Fragment>
            </Router>
        )
    }
}