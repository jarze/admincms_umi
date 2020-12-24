import { useMemo, cloneElement, useState, useEffect } from 'react'
import Forbidden from '@/pages/403.js'
import Loading from '@/components/PageLoading'
import pathToRegexp from 'path-to-regexp'

/**
 * @description: 引入对应配置项，需有路由参数menuId进行识别, 不能为空
 */
export default props => {
  const {
    match: { params },
  } = props

  const [logicParams, setLogicParams] = useState()
  useEffect(() => {
    try {
      // 配置异步加载打包分离
      import(
        /* webpackChunkName: "list-[request]" */
        /* webpackMode: "lazy" */
        `@/pages/_list/logic/${params.menuId}.js`
      ).then(setLogicParams)
    } catch (error) {
      setLogicParams(null)
    }
    return () => {}
  }, [params.menuId])

  // 配置权限校验
  const auth = useMemo(() => checkListPageAuth(logicParams, params, props), [logicParams])
  if (logicParams === undefined) return <Loading />
  return auth ? cloneElement(props.children, logicParams) : <Forbidden>请检查相关权限配置！</Forbidden>
}

var reg = pathToRegexp('/*/:menuId/list/:type?/:id?')

// 页面配置参数分配权限校验
const checkListPageAuth = (config = {}, params, { location }) => {
  if (!config) return false
  const configKeys = Object.keys({ ...config }).filter(key => key.toLowerCase().includes('config') && !!config[key])
  if (!configKeys.length) return false
  const matched = reg.exec(location.pathname) || []
  const routeParams = { menuId: matched[2], type: matched[3], id: matched[4] }
  if (params.menuId !== routeParams.menuId) return false
  //editConfig|pageConfig|tableConfig
  const configKey = ['edit', 'page'].includes(routeParams.type) ? routeParams.type : 'table'
  return configKeys.includes(`${configKey}Config`)
}
