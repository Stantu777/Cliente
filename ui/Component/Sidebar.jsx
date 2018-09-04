import 'lodash'
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Divider, Header } from 'semantic-ui-react'

export default class Sidebar extends PureComponent {
    render() {
        const { menuItems } = this.props

        return (
            <div className='sidebar'>
                <Menu secondary pointing fluid vertical>
                    {menuItems.length ? (
                        menuItems.map((menuItem, index) => {
                            const itemType = _.has(menuItem, 'to') << 1 | _.isEmpty(menuItem)

                            switch (itemType) {
                                case 2:
                                    // Item is a link
                                    return <Menu.Item name={menuItem.name} as={Link} to={menuItem.to} key={index} />
                                case 1:
                                    // Item is a divider
                                    return <Divider key={index} />
                                case 0:
                                    // Item is a header
                                    return <div className='header' key={index}>{_.toUpper(menuItem.name)}</div>
                            }

                            return <Menu.Item name={menuItem.name} key={index} />
                        })
                    ) : (
                        <Header size='small'>No se encontraron enlaces</Header>
                    )}
                </Menu>
            </div>
        )
    }
}
/*
<div className='header'>CONFIGURACIÓN</div>
<Menu.Item name='Actualizar perfil' active={activeItem === 'Actualizar perfil'} onClick={this.handleItemClick} />
<Menu.Item name='Cambiar avatar' active={activeItem === 'Cambiar avatar'} onClick={this.handleItemClick} />
<Menu.Item name='Cambiar contraseña' active={activeItem === 'Cambiar contraseña'} onClick={this.handleItemClick} />
<Menu.Item name='Cambiar correo electrónico' active={activeItem === 'Cambiar correo electrónico'} onClick={this.handleItemClick} />
<Divider />
<Menu.Item name='Mi perfil' active={activeItem === 'Mi perfil'} onClick={this.handleItemClick} />
<Menu.Item name='Notificaciones' active={activeItem === 'Notificaciones'} onClick={this.handleItemClick} />
*/