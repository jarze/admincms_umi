import React from 'react'
import { Button } from 'antd'
import { SearchList } from '@antd-xx/comp'
import { ListPageConfig } from '@antd-xx/comp/dist/SearchList/type'
import request from '@/utils/request'
// import { Button, Divider } from 'antd'

const config: ListPageConfig<{
  /** ID */
  id: string
  /** 名称 */
  name: string
  /** 标题 */
  title: string
  /** 备注 */
  desc: string
}> = {
  // 列表
  tableConfig: {
    // columns: (props, onItemAction) => [
    columns: [
      { title: '名称', dataIndex: 'name' },
      { title: '标题', dataIndex: 'title' },
      { title: 'c', dataIndex: 'c', render: (text, record, index) => '自定义column显示' }
      // {
      //   key: 'operation',
      //   title: '操作',
      //   align: 'center',
      //   width: 150,
      //   render: (_, record) => (
      //     <>
      //       <Button type='link' onClick={() => onItemAction('detail', record)} icon='eye' />
      //       <Divider type='vertical' />
      //       <Button type='link' onClick={() => onItemAction('edit', record)} icon='edit' />
      //       <Divider type='vertical' />
      //       <Button type='link' onClick={() => onItemAction('delete', record)} icon='delete' />
      //     </>
      //   ),
      // },
    ],
    rowKey: 'id'

    // 列表选择Alert显示
    // rowSelection: true,
    // selectAlert: (selectedRowKeys, props) => '自定义内容显示',
  },

  // 搜索项
  formConfig: {
    // items: (props, onItemAction) => [
    items: [
      { label: 'a', key: 'a', render: (form, data) => <div>自定义表单组件</div> },
      { label: 'b', key: 'b' }
      // { render: (form, data) => <div>自定义内容显示</div> }
    ]

    // 搜索输入刷新
    // onValuesChange: true,
    // onSubmit: null,
    // onReset: null,
  },

  // 操作项
  actions: (onItemAction, props) => {
    return (
      <Button icon="plus" type="primary" onClick={() => onItemAction('add')}>
        添加
      </Button>
    )
    // return null
  },

  // export const isPush = true;

  // 添加编辑表单
  editConfig: {
    // items: (props, onItemAction) => [
    items: [
      { label: 'a', key: 'a', render: (form, data) => <div>自定义表单组件</div> },
      { label: 'b', key: 'b', options: { rules: [{ required: true }] } },
      { render: (form, data) => <div>自定义内容显示</div> }
    ]
  },
  S: {
    getList(params) {
      return request('/list/comp', { params })
    },
    editItem(params, current) {
      return request('/edit/comp', {
        method: current?.id ? 'PUT' : 'POST',
        body: current?.id ? { ...params, id: current?.id } : params
      })
    }
  }
}

export default function Comp(params) {
  return <SearchList {...config} />
}
