import { useEffect, useCallback } from 'react'
import { debounce } from 'lodash'
import router from 'umi/router'

// 匹配所有的 :menuId/list,取出menuId
const reg = /(?<=\/).((?!\/).)*?(?=\/list\/)/gi
const handlePopPath = (from, to) => {
  const f = `${from}/`.match(reg)
  const t = `${to}/`.match(reg)
  return (f || []).filter(id => !(t || []).includes(id))
}

type UST_HOOK = SearchListHooks<any>
type UST_RETURN = ReturnType<UST_HOOK>

const useSearchList: UST_HOOK = ({
  tableConfig = {},
  formConfig = {},
  loadingEffects = {},
  otherFilterParams,
  isPush,
  ...props
}) => {
  const {
    NS,
    dispatch,
    dataSource = [],
    filterParams,
    pagination = {},
    selectedRowKeys,
    computedMatch,
    preEditId,
    menuId
  } = props
  const { params: matchParams } = computedMatch || {}
  const fetchUrl = `${NS}/fetchData`
  const { pathname } = props.location || {}
  // 列表复用，menu数据还没更新
  const isPreData = menuId && menuId !== matchParams.menuId

  // 切换匹配路由 缓存参数
  useEffect(() => {
    dispatch({ type: `${NS}/updateMatchParams`, matchParams })
  }, [matchParams])

  // 请求列表数据
  useEffect(() => {
    if (isPreData) return
    tableConfig && fetchData()
  }, [filterParams, otherFilterParams])

  // 切换匹配路由 不同目录重置参数缓存
  useEffect(() => {
    return () => {
      const to = window.location.pathname
      const from = (props.location || {}).pathname
      if (!to.includes(from)) {
        // 回退页面，清空缓存
        const clearedCached = handlePopPath(from, to).reduce(
          (res, menu) => ({ ...res, [menu]: {} }),
          props.cached
        )
        // 若切换栏目，重置列表参数
        dispatch({
          type: `${NS}/restPageFilter`,
          payload: { cached: clearedCached }
        })
      }
    }
  }, [matchParams, props.cached])

  const fetchData = (payload?: {}) => {
    let params = {
      ...filterParams,
      pageNo: pagination.current || 1,
      pageSize: pagination.pageSize,
      matchParams,
      ...payload,
      ...otherFilterParams
    }
    if (tableConfig.pagination === false) {
      delete params.pageNo
      delete params.pageSize
    }
    dispatch({ type: fetchUrl, payload: { ...params } })
  }

  const updateFilterParams = (payload?: any) => {
    dispatch({
      type: `${NS}/save`,
      payload: {
        filterParams: payload,
        pagination: { ...pagination, current: 1 },
        selectedRowKeys: []
      }
    })
  }

  const saveData = payload => {
    dispatch({ type: `${NS}/save`, payload })
  }

  const stringRowKey = typeof tableConfig.rowKey === 'string' ? tableConfig.rowKey : null

  const onItemAction: ActionFunction = function(
    type: ActionType | string,
    payload = {},
    params?: { breadcrumb?: string | null; callback?: Function; id?: string }
  ) {
    const { breadcrumb, callback, id = stringRowKey && payload[stringRowKey] } = params || {}
    const path = pathname || '.'
    // 面包屑
    const searchBreadcrumb = breadcrumb ? `?breadcrumb=${breadcrumb}` : ''
    switch (type) {
      case 'detail':
        saveData({ editId: id, itemInfo: payload })
        router.push(`${path}/page/${id}${searchBreadcrumb}`)
        break
      case 'add':
        saveData({ editId: 'add', itemInfo: {} })
        isPush && router.push(`${path}/edit${searchBreadcrumb}`)
        break
      case 'edit':
        saveData({ editId: id, itemInfo: payload })
        isPush && router.push(`${path}/edit/${id}${searchBreadcrumb}`)
        break
      case 'delete':
        dispatch({ type: `${NS}/deleteItem`, payload: { ...payload, matchParams }, callback })
        break
      case 'export':
        dispatch({ type: `${NS}/exportData`, payload: { ...payload, matchParams }, callback })
        break
      // 更新搜索条件为参数，自动触发列表请求更新
      case 'search':
        updateFilterParams(payload)
        break
      // 刷新当前搜索下列表请求， 参数覆盖当前请求参数【搜索，分页】
      case 'refresh':
        fetchData(payload)
        break
      // 更新列表state
      case 'update':
        saveData({ ...payload })
        break
      default:
        // 自定义操作
        dispatch({
          type: `${NS}/actionItem`,
          payload: { ...payload, matchParams },
          action: type,
          callback
        })
        break
    }
  }

  if (tableConfig.rowSelection) {
    tableConfig.rowSelection = {
      ...tableConfig.rowSelection,
      selectedRowKeys: selectedRowKeys,
      onChange: rowKeys => {
        dispatch({ type: `${NS}/save`, payload: { selectedRowKeys: rowKeys } })
      }
    }
  }

  const tbProps =
    tableConfig &&
    ({
      dataSource: isPreData ? [] : dataSource,
      loading: loadingEffects[fetchUrl],
      pagination,
      rowClassName: record =>
        stringRowKey && preEditId && String(preEditId) === String(record[stringRowKey])
          ? 'table-row-visited'
          : '',
      onItemAction,
      onChange: ({ current, pageSize }, filters, { order, field }, extra) => {
        dispatch({
          type: `${NS}/save`,
          payload: {
            filterParams: { ...filterParams, order, field: order ? field : undefined },
            pagination: { ...pagination, current, pageSize }
          }
        })
      },
      ...tableConfig,
      selectAlert:
        typeof tableConfig.selectAlert === 'function'
          ? () => tableConfig.selectAlert(selectedRowKeys, { onItemAction, ...props })
          : tableConfig.selectAlert,
      columns:
        typeof tableConfig.columns === 'function'
          ? tableConfig.columns(props, onItemAction)
          : tableConfig.columns
    } as UST_RETURN[0])

  const handleValuesChange = useCallback(
    debounce((_: any, allValues: any) => {
      updateFilterParams(allValues)
    }, 0.8e3),
    []
  )

  // 配置参数处理转换
  const handleProps: UST_RETURN[1] = {}
  if (typeof formConfig.onSubmit === 'function') {
    handleProps.onSubmit = (values: any) => formConfig.onSubmit!(values, props, onItemAction)
  }
  if (typeof formConfig.onReset === 'function') {
    handleProps.onReset = (values: any) => formConfig.onReset!(values, props, onItemAction)
  }
  if (formConfig.onValuesChange) {
    handleProps.onValuesChange = handleValuesChange
  }
  if (typeof formConfig.items === 'function') {
    handleProps.items = formConfig.items(props, onItemAction)
  }

  const fmProps =
    formConfig &&
    ({
      data: filterParams,
      onSubmit: updateFilterParams,
      onReset: updateFilterParams,
      ...formConfig,
      ...handleProps
    } as UST_RETURN[1])

  return [tbProps, fmProps, onItemAction] as UST_RETURN
}

export default useSearchList
