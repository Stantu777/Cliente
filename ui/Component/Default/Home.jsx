import React, { PureComponent } from 'react'
import Main from '../Main'
import { SIDEBAR_LINKS } from './SidebarLinks'

export default class Home extends PureComponent {
    render() {
        return (
            <Main menuItems={SIDEBAR_LINKS}>
            </Main>
        )
    }
}