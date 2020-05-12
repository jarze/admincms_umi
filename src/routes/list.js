import { useMemo, cloneElement } from 'react'
import Forbidden from '@/pages/403.js'
import pathToRegexp from 'path-to-regexp'

/**
 * @description: 引入对应配置项，需有路由参数menuId进行识别, 不能为空
 */
export default props => {
  const {
    match: { params },
  } = props
  const logicParams = useMemo(() => {
    try {
      return require(`@/pages/_list/logic/${params.menuId}.js`)
    } catch (err) {
      //alert(err, '\n 请配置相关文件') // 可执行
    }
  }, [params.menuId])
  // 配置权限校验
  const auth = useMemo(() => checkListPageAuth(logicParams, params, props), [logicParams])
  return auth ? cloneElement(props.children, logicParams) : <Forbidden>请检查相关权限配置！</Forbidden>
}

var reg = pathToRegexp('/*/:menuId/list/:type?/:id?')

// 页面配置参数分配权限校验
const checkListPageAuth = (config = {}, params, { location }) => {
  const configKeys = Object.keys({ ...config }).filter(key => key.toLowerCase().includes('config') && !!config[key])
  if (!configKeys.length) return false
  const matched = reg.exec(location.pathname) || []
  const routeParams = { menuId: matched[2], type: matched[3], id: matched[4] }
  if (params.menuId !== routeParams.menuId) return false
  switch (routeParams.type) {
    case 'edit':
      return configKeys.includes('editConfig')
    case 'page':
      return configKeys.includes('pageConfig')
    default:
      return configKeys.includes('tableConfig')
  }
}
