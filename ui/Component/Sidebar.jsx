import React, { PureComponent } from 'react';
import { Menu, Divider } from 'semantic-ui-react';

export default class Sidebar extends PureComponent {
    state = { activeItem: 'Actualizar perfil' };
    
    handleItemClick = (_, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;

        return (
            <div className='sidebar'>
                <Menu secondary pointing fluid vertical>
                    <div className='header'>CONFIGURACIÓN</div>

                    <Menu.Item name='Actualizar perfil' active={activeItem === 'Actualizar perfil'} onClick={this.handleItemClick} />
                    <Menu.Item name='Cambiar avatar' active={activeItem === 'Cambiar avatar'} onClick={this.handleItemClick} />
                    <Menu.Item name='Cambiar contraseña' active={activeItem === 'Cambiar contraseña'} onClick={this.handleItemClick} />
                    <Menu.Item name='Cambiar correo electrónico' active={activeItem === 'Cambiar correo electrónico'} onClick={this.handleItemClick} />

                    <Divider />

                    <Menu.Item name='Mi perfil' active={activeItem === 'Mi perfil'} onClick={this.handleItemClick} />
                    <Menu.Item name='Notificaciones' active={activeItem === 'Notificaciones'} onClick={this.handleItemClick} />
                </Menu>
            </div>
        );
    }
}