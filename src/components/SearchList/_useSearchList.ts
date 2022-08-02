import { useState, useMemo, useCallback } from 'react'
import { debounce } from 'lodash'
import useRequest from '@/pages/_hooks/useRequest'
import { ListPageConfig, ActionFunction, SearchListHooksReturn } from './type'
import useModalForm from './_useModalForm'

const defaultPagination = { pageSize: 10, pageNo: 1 }

const defaultTableProps = {
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: total => `共${total}条记录`
}

function useSearchList<T extends Record<string, any>>({
  S,
  tableConfig = {},
  editConfig = {},
  formConfig = {}
}: ListPageConfig<T>): SearchListHooksReturn<T> {
  const { pagination: p, columns, title, ...table } = tableConfig

  const defaultFilter = useMemo<any>(() => (p === false || p === null ? {} : defaultPagination), [
    p
  ])
  const rowKey = useMemo<string>(
    () => (typeof tableConfig.rowKey === 'string' ? tableConfig.rowKey : 'id'),
    [tableConfig?.rowKey]
  )

  const [filter, setFilter] = useState<any>(defaultFilter)

  const { data, setData, loading } = useRequest<any>({
    fetchData: S?.getList,
    params: filter,
    handlerData: res => {
      // 无分页处理
      if (p === false) {
        return { dataSource: res, pagination: p }
      } else if (p === null) {
        return { dataSource: res, pagination: { ...defaultTableProps } }
      } else {
        const { data, pageNum: current, pageSize, total, pages, ...others } = res
        return {
          dataSource: data,
          pagination: {
            ...defaultTableProps,
            ...p,
            current,
            pageSize: pageSize || defaultFilter?.pageSize,
            total,
            pages
          },
          ...others
        }
      }
    }
  })

  const { current, setCurrent, modalFormProps: modal } = useModalForm<T>({ editConfig, S, rowKey })

  const onItemAction = useCallback<ActionFunction>((type, payload?: any) => {
    switch (type) {
      case 'add':
        setCurrent({})
        break
      case 'refresh':
        setFilter({ ...defaultFilter, ...payload })
        break
      case 'reload':
        setFilter(pre => ({ ...pre, ...payload }))
        break
      case 'edit':
        setCurrent(payload)
        break
      default:
        break
    }
  }, [])

  const tableProps: SearchListHooksReturn<T>['tableProps'] = {
    ...data,
    loading,
    onChange:
      p === false || p === null
        ? undefined
        : ({ current, pageSize }) => {
            setFilter(pre => ({ ...pre, pageNo: current, pageSize }))
          },
    title: title && ((...t) => title({ onItemAction, props: { filter, data, current } }, ...t)),
    columns:
      typeof columns === 'function' ? columns({ filter, data, current }, onItemAction) : columns,
    ...table
  }

  const modalFormProps: SearchListHooksReturn<T>['modalFormProps'] = {
    ...modal,
    items:
      typeof editConfig?.items === 'function'
        ? editConfig?.items({ current, filter, data }, onItemAction)
        : editConfig?.items,
    onOk: () => {
      onItemAction(current?.[rowKey] ? 'reload' : 'refresh')
      setCurrent(null)
    }
  }

  const handleValuesChange = useCallback(
    debounce((_: any, allValues: any) => {
      onItemAction('refresh', allValues)
    }, 0.8e3),
    []
  )

  const formProps: SearchListHooksReturn<T>['formProps'] = {
    layout: 'inline',
    data: filter,
    okText: '搜索',
    onSubmit: v => onItemAction('refresh', v),
    // onReset: () => onItemAction('refresh'),
    ...formConfig,
    items:
      typeof formConfig?.items === 'function'
        ? formConfig?.items({ current, filter, data }, onItemAction)
        : formConfig?.items,
    onValuesChange: formConfig?.onValuesChange && handleValuesChange
  }
  return {
    modalFormProps,
    tableProps,
    formProps,
    onItemAction,
    other: { filter, current, data, setData }
  }
}

export default useSearchList
