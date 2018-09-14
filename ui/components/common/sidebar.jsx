import has from 'lodash/has'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import toUpper from 'lodash/toUpper'
import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { Menu, Divider, Header } from 'semantic-ui-react'
import genesis from '../../client'
import { GUEST_SIDEBAR } from '../guest'
import { PRIVATE_SIDEBAR } from '../private'
import { matchToBoolean } from '../../helpers'

export default class Sidebar extends Component {
    loginListenerId = null
    logoutListenerId = null

    state = {
        connected: false,
        routes: [ GUEST_SIDEBAR, PRIVATE_SIDEBAR ]
    }

    componentDidMount() {
        this.loginListenerId = genesis.addOnReady(this.afterLogin)
        this.logoutListenerId = genesis.addOnDisconnect(this.afterLogout)
    }

    componentWillUnmount() {
        genesis.removeOnReady(this.loginListenerId)
        genesis.removeOnDisconnect(this.logoutListenerId)
    }

    afterLogin = () => {
        this.setState({
            connected: true
        })
    }

    afterLogout = () => {
        this.setState({
            connected: false
        })
    }

    _mapLink = (route, index) => {
        const { type, label = null, path = null } = route

        switch(type) {
            case 2:
                return <Route path={path} key={`sidebar-route-${index}`} exact children={({ match }) => (
                    <Menu.Item name={label} as={Link} active={matchToBoolean(match)} to={path} />
                )} />
            case 1:
                return <Divider key={`sidebar-route-${index}`} />
            case 0:
                return <div className='header' key={index}>{toUpper(label)}</div>
        }

        return <Menu.Item name={label} key={`sidebar-route-${index}`} />
    }

    _mapRoutes = routes => map(routes, (route, index) => this._mapLink({
        type: +has(route, 'path') << 1 | isEmpty(route),
        ...route
    }, index))

    render() {
        const { connected, routes } = this.state
        const [ guestRoutes, privateRoutes ] = routes

        return (
            <div className='sidebar'>
                <Menu secondary pointing fluid vertical>
                {!connected ? (
                    isEmpty(guestRoutes) ? <Header size='small'>No se encontraron enlaces</Header> : (
                        this._mapRoutes(guestRoutes)
                    )
                ) : (
                    isEmpty(privateRoutes) ? <Header size='small'>No se encontraron enlaces</Header> : (
                        this._mapRoutes(privateRoutes)
                    )
                )}
                </Menu>
            </div>
        )
    }
}