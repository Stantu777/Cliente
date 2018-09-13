import React, { Component } from 'react'
import genesis from '../../client'

export default class PrivateSegment extends Component {
    loginListenerId = null
    logoutListenerId = null

    state = {
        connected: genesis.ready,
        me: genesis.me
    }

    componentDidMount() {
        this.loginListenerId = genesis.addOnReady(this.afterLogin)
        this.logoutListenerId = genesis.addOnDisconnect(this.afterLogout)
    }

    componentWillUnmount() {
        genesis.removeOnReady(this.loginListenerId)
        genesis.removeOnDisconnect(this.logoutListenerId)
    }

    afterLogin = me => {
        this.setState({
            connected: true,
            me: me
        })
    }

    afterLogout = () => {
        this.setState({
            connected: false,
            me: null
        })
    }

    render() {
        const { children } = this.props
        const { connected, me } = this.state
        console.log(this.state)

        if (!connected) {
            return null
        }

        return React.cloneElement(children, { me: me })
    }
}