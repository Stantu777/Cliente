
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { TEMP_AUTH } from './TempAuth'

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => TEMP_AUTH.token !== null && TEMP_AUTH.user !== null ? (
        <Component {...props} />
    ) : (
        <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} />
    )} />
);