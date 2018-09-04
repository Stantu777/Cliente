import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default class Header extends PureComponent {
    state = { activeItem: 'conectarse' };
    
    handleItemClick = (_, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;

        return (
            <Menu inverted fixed='top'>
                <Menu.Item name='inicio' as={Link} to='/' />
                <Menu.Menu position='right'>
                    <Menu.Item name='Registrate' as={Link} to='/register' />
                    <Menu.Item name='Conectate' as={Link} to='/login' />
                </Menu.Menu>
            </Menu>
        );
    }
}