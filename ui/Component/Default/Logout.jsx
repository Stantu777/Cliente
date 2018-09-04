import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { TEMP_AUTH } from '../../Common/TempAuth';

export default class Logout extends Component {
    componentDidMount() {
        TEMP_AUTH.logout()
    }
    
    render() {
        return <Redirect to='/' />
    }
}