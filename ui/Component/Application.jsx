import React, { PureComponent } from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';
import Login from './Login';
import Sidebar from './Sidebar';

export default class Application extends PureComponent {
    render() {
        return (
            <React.Fragment>
                <Header />
                <Sidebar />
                <Container fluid>
                    <Login />
                </Container>
            </React.Fragment>
        );
    }
}