import React, { Component } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
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
        <MenuItem label='Propuestas' to='/thesis/proposals' activeWhenExact />
        <Menu.Menu position='right'>
            <Dropdown item text='Mi tesis'>
                <Dropdown.Menu>
                    <DropdownItem label='Inscribir propuesta' to='/thesis/register' activeWhenExact />
                    <DropdownItem label='Estado de propuesta' to='/thesis/track' activeWhenExact />
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown item text={`${me.person.firstName} ${me.person.lastName}`}>
                <Dropdown.Menu>
                    <DropdownItem label='Mi perfil' to='/@me' activeWhenExact />
                    <DropdownItem label='Configuración' to='/account/settings' activeWhenExact />
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
        connected: false,
        me: null
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