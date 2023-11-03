/**
 * Routes:
 *   - ./src/routes/auth.js
 */

import { Fragment } from 'react'
import { BasicLayout as ProLayoutComponents, PageHeaderWrapper } from '@ant-design/pro-layout'
import User from './_components/User'
import logo from '@/assets/logo.svg'
import Link from 'umi/link'
import { connect } from 'dva'
import { isDirectory } from '@/utils/menuHandle'

const BasicLayout = ({ children, menuRoute, user, route, ...restProps }) => {
  if (restProps.location.pathname === '/login') return children
  const rightContent = <User user={user} style={{ float: 'right', margin: '0 2em' }} />
  const { breadcrumb } = restProps.location.query
  const isMenuTop = (menuRoute.routes || [])
    .map(item => item.path)
    .includes(restProps.location.pathname)
  const Wrapper = isMenuTop ? Fragment : PageHeaderWrapper
  return (
    <ProLayoutComponents
      title={route._title || ''}
      logo={logo}
      fixSiderbar={true}
      footerRender={() => null}
      menuItemRender={(menuItemProps, defaultDom) => (
        <Link to={menuItemProps.path.toLowerCase()}>{defaultDom}</Link>
      )}
      rightContentRender={() => rightContent}
      breadcrumbRender={(routers = []) =>
        breadcrumb ? [...routers, { breadcrumbName: breadcrumb }] : routers
      }
      itemRender={({ path, breadcrumbName }) =>
        !path || isDirectory(menuRoute.routes, path) ? (
          breadcrumbName
        ) : (
          <Link to={path}>{breadcrumbName}</Link>
        )
      }
      pageTitleRender={false}
      {...restProps}
      route={menuRoute}
    >
      <Wrapper title={false}>{children}</Wrapper>
    </ProLayoutComponents>
  )
}

export default connect(({ global }) => ({
  ...global
}))(BasicLayout)
