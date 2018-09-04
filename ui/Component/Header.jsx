import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Dropdown } from 'semantic-ui-react'
import { TEMP_AUTH } from '../Common/TempAuth'

class Header extends Component {
    render() {
        return (
            <Menu inverted fixed='top'>
                {TEMP_AUTH.token === null && TEMP_AUTH.user === null ? (
                    <React.Fragment>
                        <Menu.Item name='inicio' as={Link} to='/' />
                        <Menu.Menu position='right'>
                            <Menu.Item name='Registrate' as={Link} to='/register' />
                            <Menu.Item name='Conectate' as={Link} to='/login' />
                        </Menu.Menu>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Menu.Item name='Inicio' as={Link} to='/dashboard' />

                        <Menu.Menu position='right'>
                            <Menu.Item name='Registrar tesis' as={Link} to='/thesis/register' />

                            <Dropdown item text={`${TEMP_AUTH.user.firstName} ${TEMP_AUTH.user.lastName}`}>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to='/@me'>Mi perfil</Dropdown.Item>
                                    <Dropdown.Item as={Link} to='/account/settings'>Actualizar perfil</Dropdown.Item>
                                    <Dropdown.Item as={Link} to='/logout'>Desconectarme</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    </React.Fragment>
                )}
            </Menu>
        );
    }
}

export default withRouter(Header)