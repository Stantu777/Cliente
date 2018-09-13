import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import genesis from '../../client'

export default class Logout extends Component {
    componentDidMount() {
        genesis.disconnect()
    }

    render() {
        return <Redirect to='/' exact />
    }
}