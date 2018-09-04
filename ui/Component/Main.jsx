import React, { PureComponent } from 'react'
import Sidebar from './Sidebar'

/**
 * Need to reduce whole page rerendering
 * 
 * Plan:
 * - Wrap Link with Route, Route will rerender when the path matches
 *   which is why the whole Main component is being constantly rerendered
 *   need to abstract that away.
 * - Maybe rename Main to Root and Mail should only be <div className="Main" />
 */
export default class Main extends PureComponent {
    render() {
        const { children, menuItems } = this.props

        return (
            <React.Fragment>
                <Sidebar menuItems={menuItems} />
                <div className="main">
                    {children}
                </div>
            </React.Fragment>
        )
    }
}