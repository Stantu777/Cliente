import React, { Component } from 'react'
import { Dropdown, Icon, Menu } from 'semantic-ui-react'
import genesis from '../../client'
import { MenuItem, DropdownItem } from '../elements'

const GuestMenu = () => (
    <React.Fragment>
        <MenuItem label='Inicio' to='/' activeWhenExact />
        <Menu.Menu position='right'>
            <MenuItem label='Registrate' to='/register' activeWhenExact />
            <MenuItem label='Conectate' to='/login' activeWhenExact />
        </Menu.Menu>
    </React.Fragment>
)

const PrivateMenu = ({ me }) => (
    <React.Fragment>
        <MenuItem label='Inicio' to='/' activeWhenExact />
        <Menu.Menu position='right'>
            <MenuItem to='/notifications' activeWhenExact>
                <Icon name='bell' fitted />
            </MenuItem>
            <Dropdown item text={`${me.person.firstName} ${me.person.lastName}`}>
                <Dropdown.Menu>
                    <DropdownItem label='Mi perfil' to='/@me' activeWhenExact />
                    <DropdownItem label='Configuración' to='/settings' activeWhenExact />
                    <DropdownItem label='Salir' to='/logout' activeWhenExact={false} />
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
    </React.Fragment>
)

export default class Header extends Component {
    loginListenerId = null
    logoutListenerId = null

    state = {
        connected: genesis.ready,
        me: genesis.me
    }

    componentDidMount() {
        this.loginListenerId = genesis.addOnReady(this.afterLogin)
        this.logoutListenerId = genesis.addOnDisconnect(this.afterLogout)
    }

    componentWillUnmount() {
        genesis.removeOnReady(this.loginListenerId)
        genesis.removeOnDisconnect(this.logoutListenerId)
    }

    afterLogin = (me, error) => {
        if (error !== null) {
            return
        }

        this.setState({
            me: me,
            connected: true
        })
    }

    afterLogout = () => {
        this.setState({
            me: null,
            connected: false
        })
    }

    render() {
        const { me, connected } = this.state

        return (
            <Menu inverted fixed='top'>
                {!connected ? <GuestMenu /> : <PrivateMenu me={me} />}
            </Menu>
        );
    }
}