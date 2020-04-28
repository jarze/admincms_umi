/**
 * Routes:
 *   - ./src/routes/auth.js
 */

import { BasicLayout as ProLayoutComponents, PageHeaderWrapper } from '@ant-design/pro-layout'
import User from './_components/User'
import logo from '@/assets/logo.svg'
import Link from 'umi/link'
import { connect } from 'dva'

const isDirectory = (data = [], currentPath) => {
  let find = false
  for (let item of data) {
    let { path, children, hideChildrenInMenu } = item
    if (path === currentPath) {
      if (hideChildrenInMenu) {
        find = !hideChildrenInMenu
        break
      }
      find = !!children
      break
    } else if (currentPath.startsWith(path) && children) {
      if (hideChildrenInMenu) {
        find = !hideChildrenInMenu
        break
      }
      find = isDirectory(children, currentPath)
    }
  }
  return find
}

const BasicLayout = ({ children, menuRoute, user, route, ...restProps }) => {
  if (restProps.location.pathname === '/login') {
    return children
  }
  const rightContent = <User user={user} style={{ float: 'right', margin: '0 2em' }} />
  const { breadcrumb } = restProps.location.query
  return (
    <ProLayoutComponents
      title={route._title || ''}
      logo={logo}
      fixSiderbar={true}
      footerRender={() => null}
      menuItemRender={(menuItemProps, defaultDom) => {
        return <Link to={menuItemProps.path.toLowerCase()}>{defaultDom}</Link>
      }}
      rightContentRender={() => rightContent}
      breadcrumbRender={(routers = []) => (breadcrumb ? [...routers, { breadcrumbName: breadcrumb }] : routers)}
      itemRender={route =>
        !route.path || isDirectory(menuRoute.routes, route.path) ? route.breadcrumbName : <Link to={route.path}>{route.breadcrumbName}</Link>
      }
      {...restProps}
      route={menuRoute}
    >
      <PageHeaderWrapper title={false} onBack={() => window.history.back()}>
        {children}
      </PageHeaderWrapper>
    </ProLayoutComponents>
  )
}

export default connect(({ global }) => ({
  ...global,
}))(BasicLayout)
