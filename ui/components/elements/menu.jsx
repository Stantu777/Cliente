import React from 'react'
import { Route, Link } from 'react-router-dom'
import { Menu, Dropdown } from 'semantic-ui-react'
import { matchToBoolean } from '../../helpers'

export const MenuItem = ({ to, activeWhenExact, label, ...otherProps }) => (
    <Route path={to} exact={activeWhenExact} children={({ match }) => (
        <Menu.Item name={label} active={matchToBoolean(match)} as={Link} to={to} {...otherProps} />
    )} />
)

export const DropdownItem = ({ to, activeWhenExact, label, ...otherProps }) => (
    <Route path={to} exact={activeWhenExact} children={({ match }) => (
        <Dropdown.Item active={matchToBoolean(match)} as={Link} to={to} {...otherProps}>{label}</Dropdown.Item>
    )} />
)