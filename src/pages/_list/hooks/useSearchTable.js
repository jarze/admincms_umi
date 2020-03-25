/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback } from 'react'
import debounce from 'lodash.debounce'
import router from 'umi/router'

/**
 * @description: 带搜索项Table页面
 * @param 0 model【list】sto + dispatch
 * @param 1 model name | string
 * @param 2 table columns | []
 * @param 3 search items | []
 * @param 4 umi loading.effects
 * @param 5 {} 	其他列表参数
 * @return: [tbProps: table props, fmProps: searchForm props]
 */

export default ({
  NS,
  tableConfig = {},
  formConfig = {},
  loadingEffects = {},
  otherFilterParams,
  isPush,
  ...props
}) => {
  const {
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
  const isPreData = menuId && menuId !== matchParams.menuId;

  // 请求列表数据
  useEffect(() => {
    if (isPreData) return;
    tableConfig && fetchData()
  }, [filterParams, otherFilterParams])

  // 切换匹配路由 不同目录重置参数
  useEffect(() => {
    dispatch({
      type: `${NS}/updateMatchParams`,
      matchParams,
    })
    return () => {
      if (!window.location.pathname.includes((props.location || {}).pathname)) {
        // 若切换栏目，重置列表参数
        dispatch({
          type: `${NS}/restPageFilter`,
        })
      }
    }
  }, [matchParams])

  const fetchData = payload => {
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
    dispatch({
      type: fetchUrl,
      payload: { ...params },
    })
  }

  const updateFilterParams = payload => {
    dispatch({
      type: `${NS}/save`,
      payload: {
        filterParams: payload,
        pagination: {
          ...pagination,
          current: 1,
        },
      },
    })
  }

  const handlePageChange = (pageNo, pageSize) => {
    fetchData({ pageNo, pageSize })
  }

  const onItemAction = (type, payload = {}, breadcrumb, callback) => {
    let id = payload[tableConfig.rowKey]
    switch (type) {
      case 'detail':
        router.push(`${pathname || '.'}/page/${id}`)
        break
      case 'add':
        if (isPush) {
          router.push(`${pathname || '.'}/edit?breadcrumb=${breadcrumb || '添加'}`)
        } else {
          dispatch({
            type: `${NS}/save`,
            payload: { editId: 'add' },
          })
        }
        break
      case 'edit':
        if (isPush) {
          router.push(`${pathname || '.'}/edit/${id}?breadcrumb=${breadcrumb || '编辑'}`)
        } else {
          dispatch({
            type: `${NS}/save`,
            payload: { editId: id, itemInfo: payload },
          })
        }
        break
      case 'delete':
        dispatch({
          type: `${NS}/deleteItem`,
          payload: { ...payload, matchParams },
        })
        break
      case 'export':
        dispatch({
          type: `${NS}/exportData`,
          payload: { ...payload, matchParams },
          callback,
        })
        break
      case 'search':
        updateFilterParams(payload)
        break
      case 'refresh':
        fetchData(payload)
        break
      case 'update':
        dispatch({
          type: `${NS}/save`,
          payload: { ...payload },
        });
        break;
      default:
        dispatch({
          type: `${NS}/actionItem`,
          payload: { ...payload, matchParams },
          action: type,
          callback,
        })
        break
    }
  }

  if (tableConfig.rowSelection) {
    tableConfig.rowSelection = {
      ...tableConfig.rowSelection,
      selectedRowKeys: selectedRowKeys,
      onChange: rowKeys => {
        dispatch({
          type: `${NS}/save`,
          payload: {
            selectedRowKeys: rowKeys,
          },
        })
      },
    }
  }

  const tbProps = tableConfig && {
    dataSource: isPreData ? [] : dataSource,
    loading: loadingEffects[fetchUrl],
    pagination: {
      ...pagination,
      onChange: handlePageChange,
    },
    rowClassName: (record, index) =>
      preEditId && String(preEditId) === String(record[tableConfig.rowKey])
        ? 'table-row-visited'
        : '',
    onItemAction,
    ...tableConfig,
    columns:
      typeof tableConfig.columns === 'function'
        ? tableConfig.columns(onItemAction, props)
        : tableConfig.columns,
  }

  const handleValuesChange = useCallback(
    debounce((changedValues, allValues) => {
      updateFilterParams(allValues)
    }, 0.8e3),
    []
  )

  if (formConfig.onValuesChange === true) {
    formConfig.onValuesChange = handleValuesChange
  }

  const fmProps = formConfig && {
    data: filterParams,
    onSubmit: updateFilterParams,
    onReset: updateFilterParams,
    ...formConfig,
    items: typeof formConfig.items === 'function' ? formConfig.items(props) : formConfig.items,
  }

  return [tbProps, fmProps, onItemAction]
}
