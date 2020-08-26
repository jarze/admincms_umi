import React from 'react'
import { ListPageConfig } from '../list-types'
// import { Button, Divider } from 'antd'

const config: ListPageConfig = {
  // 列表
  tableConfig: {
    // columns: (onItemAction, props) => [
    columns: [
      { title: 'ts', dataIndex: 'a' },
      { title: 'b', dataIndex: 'b' },
      { title: 'c', dataIndex: 'c', render: (text, record, index) => '自定义column显示' },
      // {
      //   key: 'operation',
      //   title: '操作',
      //   align: 'center',
      //   width: 150,
      //   render: (_, record) => (
      //     <>
      //       <Button type="link" onClick={() => onItemAction('detail', record)} icon="eye" />
      //       <Divider type="vertical" />
      //       <Button type="link" onClick={() => onItemAction('edit', record)} icon="edit" />
      //       <Divider type="vertical" />
      //       <Button type="link" onClick={() => onItemAction('delete', record)} icon="delete" />
      //     </>
      //   ),
      // },
    ],
    rowKey: 'id',

    // 列表选择Alert显示
    // rowSelection: true,
    // selectAlert: (selectedRowKeys, props) => '自定义内容显示',
  },
  // 搜索项
  formConfig: {
    // items: (props, onItemAction) => [
    items: [
      { label: 'a', key: 'a', render: (form, data) => <div>自定义表单组件</div> },
      { label: 'b', key: 'b' },
      { render: (form, data) => <div>自定义内容显示</div> },
    ],

    // 搜索输入刷新
    // onValuesChange: true,
    // onSubmit: null,
    // onReset: null,
  },
  // 操作项
  actions: (onItemAction, props) => {
    // return (
    //   <Button icon="plus" type="primary" onClick={() => onItemAction('add')}>
    //     添加
    //   </Button>
    // )
    return null
  },
  // 添加编辑表单
  editConfig: {
    // items: (props, onItemAction) => [
    items: [
      { label: 'a', key: 'a', render: (form, data) => <div>自定义表单组件</div> },
      { label: 'b', key: 'b' },
      { render: (form, data) => <div>自定义内容显示</div> },
    ],
  },

  // 详情展示
  pageConfig: {
    // items: props => [
    items: [
      { label: 'a', key: 'a' },
      { label: 'b', key: 'b', render: (text, data) => <div>自定义item组件</div> },
    ],
  },
}

export default config
