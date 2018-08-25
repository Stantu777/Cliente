import React, { PureComponent } from 'react';
import Header from './Header';
import Login from './Login';

export default class Application extends PureComponent {
    render() {
        return (
            <React.Fragment>
                <Header />
                <Login />
            </React.Fragment>
        );
    }
}