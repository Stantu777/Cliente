import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import APP_CONFIG from '../config'
import genesis from '../service'

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => genesis.ready ? (
        <Component {...props} />
    ) : (
        <Redirect to={{
            pathname: APP_CONFIG.PRIVATE_ROUTE_REDIRECT_TO,
            state: { from: props.location }
        }} />
    )} />
)

export const GuestOnlyRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => !genesis.ready ? (
        <Component {...props} />
    ) : (
        <Redirect to={{
            pathname: APP_CONFIG.AFTER_LOGIN_REDIRECT_TO,
            state: { from: props.location }
        }} />
    )} />
)

export const matchToBoolean = match => match ? true : false