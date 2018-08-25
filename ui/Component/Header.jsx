import React, { PureComponent } from 'react';
import { Menu } from 'semantic-ui-react';

export default class Header extends PureComponent {
    state = { activeItem: 'conectarse' };
    
    handleItemClick = (_, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;

        return (
            <Menu inverted attached>
                <Menu.Item name='inicio' active={activeItem === 'inicio'} onClick={this.handleItemClick} />
                <Menu.Menu position='right'>
                    <Menu.Item name='inscribirse' active={activeItem === 'inscribirse'} onClick={this.handleItemClick} />
                    <Menu.Item name='conectarse' active={activeItem === 'conectarse'} onClick={this.handleItemClick} />
                </Menu.Menu>
            </Menu>
        );
    }
}