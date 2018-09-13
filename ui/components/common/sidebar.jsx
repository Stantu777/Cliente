import has from 'lodash/has'
import map from 'lodash/map'
import join from 'lodash/join'
import merge from 'lodash/merge'
import isEmpty from 'lodash/isEmpty'
import toUpper from 'lodash/toUpper'
import cloneDeep from 'lodash/cloneDeep'
import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { Menu, Divider, Header } from 'semantic-ui-react'
import { matchToBoolean } from '../../helpers'

export default class Sidebar extends Component {
    _mapLink = (link, index) => {
        const { type, label = null, path = null } = link

        switch(type) {
            case 2:
                return <Route path={path} key={`sidebar-link-${index}`} exact children={({ match }) => (
                    <Menu.Item name={label} as={Link} active={matchToBoolean(match)} to={path} />
                )} />
            case 1:
                return <Divider key={`sidebar-link-${index}`} />
            case 0:
                return <div className='header' key={index}>{toUpper(label)}</div>
        }

        return <Menu.Item name={label} key={`sidebar-link-${index}`} />
    }

    _mapRoutes = ({ path, links }, index) => (
        <Route path={path} exact={false} key={`sidebar-menu-${index}`} children={() => (
            map(map(cloneDeep(links), link => {
                const linkAttrs = {
                    type: +has(link, 'path') << 1 | isEmpty(link)
                }

                if (linkAttrs.type & 2) {
                    linkAttrs.path = join([path, link.path], '/')
                }

                return merge(link, linkAttrs)
            }), this._mapLink)
        )} />
    )

    render() {
        const { routes } = this.props

        return (
            <div className='sidebar'>
                <Menu secondary pointing fluid vertical>
                {isEmpty(routes) ? <Header size='small'>No se encontraron enlaces</Header> : (
                    map(routes, this._mapRoutes)
                )}
                </Menu>
            </div>
        )
    }
}