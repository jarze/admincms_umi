import { useEffect, useCallback } from 'react'
import { debounce } from 'lodash'
import router from 'umi/router'
import { BaseListHooksProps, ActionType, ActionFunction, BaseTableProps, BaseFormProps } from '../list-types'

function useSearchList<T extends object = any>({
  tableConfig = {},
  formConfig = {},
  loadingEffects = {},
  otherFilterParams,
  isPush,
  ...props
}: BaseListHooksProps): [BaseTableProps<T>, BaseFormProps, ActionFunction] {
  const { NS, dispatch, dataSource = [], filterParams, pagination = {}, selectedRowKeys, computedMatch, preEditId, menuId } = props
  const { params: matchParams } = computedMatch || {}
  const fetchUrl = `${NS}/fetchData`
  const { pathname } = props.location || {}
  // 列表复用，menu数据还没更新
  const isPreData = menuId && menuId !== (matchParams! as { menuId: string }).menuId
  // 请求列表数据
  useEffect(() => {
    if (isPreData) return
    tableConfig && fetchData()
  }, [filterParams, otherFilterParams])
  // 切换匹配路由 不同目录重置参数
  useEffect(() => {
    dispatch({ type: `${NS}/updateMatchParams`, matchParams })
    return () => {
      if (!window.location.pathname.includes((props.location || {}).pathname)) {
        // 若切换栏目，重置列表参数
        dispatch({ type: `${NS}/restPageFilter` })
      }
    }
  }, [matchParams])

  const fetchData = (payload?: {}) => {
    let params = {
      ...filterParams,
      pageNo: pagination.current || 1,
      pageSize: pagination.pageSize,
      matchParams,
      ...payload,
      ...otherFilterParams,
    }
    if (tableConfig.pagination === false) {
      delete params.pageNo
      delete params.pageSize
    }
    dispatch({ type: fetchUrl, payload: { ...params } })
  }

  const updateFilterParams = (payload?: any) => {
    dispatch({ type: `${NS}/save`, payload: { filterParams: payload, pagination: { ...pagination, current: 1 }, selectedRowKeys: [] } })
  }

  const handlePageChange = (pageNo: number, pageSize?: number): void => {
    fetchData({ pageNo, pageSize })
  }

  const stringRowKey = typeof tableConfig.rowKey === 'string' ? tableConfig.rowKey : null

  const onItemAction: ActionFunction = function(
    type: ActionType | string,
    payload = {},
    params?: { breadcrumb?: string | null; callback?: Function; id?: string },
  ) {
    const { breadcrumb, callback, id = stringRowKey && payload[stringRowKey] } = params || {}
    switch (type) {
      case 'detail':
        router.push(`${pathname || '.'}/page/${id}`)
        break
      case 'add':
        if (isPush) {
          router.push(`${pathname || '.'}/edit?breadcrumb=${breadcrumb || '添加'}`)
        } else {
          dispatch({ type: `${NS}/save`, payload: { editId: 'add' } })
        }
        break
      case 'edit':
        if (isPush) {
          router.push(`${pathname || '.'}/edit/${id}?breadcrumb=${breadcrumb || '编辑'}`)
        } else {
          dispatch({ type: `${NS}/save`, payload: { editId: id, itemInfo: payload } })
        }
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
        dispatch({ type: `${NS}/save`, payload: { ...payload } })
        break
      default:
        // 自定义操作
        dispatch({ type: `${NS}/actionItem`, payload: { ...payload, matchParams }, action: type, callback })
        break
    }
  }

  if (tableConfig.rowSelection) {
    tableConfig.rowSelection = {
      ...tableConfig.rowSelection,
      selectedRowKeys: selectedRowKeys,
      onChange: rowKeys => {
        dispatch({ type: `${NS}/save`, payload: { selectedRowKeys: rowKeys } })
      },
    }
  }

  const tbProps =
    tableConfig &&
    ({
      dataSource: isPreData ? [] : dataSource,
      loading: loadingEffects[fetchUrl],
      pagination: { ...pagination, onChange: handlePageChange },
      rowClassName: record => (stringRowKey && preEditId && String(preEditId) === String(record[stringRowKey]) ? 'table-row-visited' : ''),
      onItemAction,
      ...tableConfig,
      selectAlert:
        typeof tableConfig.selectAlert === 'function'
          ? () => tableConfig.selectAlert(selectedRowKeys, { onItemAction, ...props })
          : tableConfig.selectAlert,
      columns: typeof tableConfig.columns === 'function' ? tableConfig.columns(onItemAction, props) : tableConfig.columns,
    } as BaseTableProps<T>)

  const handleValuesChange = useCallback(
    debounce((_: any, allValues: any) => {
      updateFilterParams(allValues)
    }, 0.8e3),
    [],
  )

  // 配置参数处理转换
  const handleProps: { [k: string]: any } = {}
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
    (({
      data: filterParams,
      onSubmit: updateFilterParams,
      onReset: updateFilterParams,
      ...formConfig,
      ...handleProps,
    } as unknown) as BaseFormProps)

  return [tbProps, fmProps, onItemAction]
}

export default useSearchList
