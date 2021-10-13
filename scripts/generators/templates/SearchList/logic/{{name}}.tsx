import React from 'react'
// import { Button, Divider } from 'antd'

const config: ListPageConfig = {
  // 列表
  tableConfig: {
    // columns: (props, onItemAction) => [
    columns: [
      { title: '{{name}}', dataIndex: 'a' },
      { title: 'b', dataIndex: 'b' },
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
      { label: 'b', key: 'b' },
      { render: (form, data) => <div>自定义内容显示</div> }
    ]
    // 搜索输入刷新
    // onValuesChange: true,
    // onSubmit: null,
    // onReset: null,
  },

  // 操作项
  actions: (onItemAction, props) => {
    // return (
    //   <Button icon='plus' type='primary' onClick={() => onItemAction('add')}>
    //     添加
    //   </Button>
    // )
    return null
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

  // 详情展示
  pageConfig: {
    // items: props => [
    items: [
      { label: 'a', key: 'a' },
      { label: 'b', key: 'b', render: (text, data) => <div>自定义item组件</div> }
    ]
  }
  // 添加编辑是否跳转新页面
  // isPush: true

  // ------------ 其他配置项 无特殊需求不用更改配置 ------
  // 绑定后Model， 默认为list
  // NS: 'list'

  // 新增编辑是否跳转新页面
  // export const isPush = false

  // 是否需获取其他model数据 （默认只获取绑定model的数据）
  // otherModels: []
}

export default config
