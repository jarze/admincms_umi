import { Button, Divider } from 'antd'
import ModelTable from '@/components/comm/EditableTable/Edit'

const FULL_COL = { xxl: 24, lg: 24, md: 24, xs: 24 }

// 列表
export const tableConfig = {
  columns: (props, onItemAction) => [
    // columns: [
    { title: 'model', dataIndex: 'a' },
    { dataIndex: 'id', title: 'ID', width: 100 },
    { dataIndex: 'name', title: '模型名' },
    { dataIndex: 'desc', title: '描述' },
    // { title: 'c', dataIndex: 'c', render: (text, record, index) => '自定义column显示' },
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
    {
      key: 'operation',
      title: '操作',
      align: 'center',
      width: 150,
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => onItemAction('detail', record)} icon="eye" />
          <Divider type="vertical" />
          <Button type="link" onClick={() => onItemAction('edit', record)} icon="edit" />
          <Divider type="vertical" />
          <Button type="link" onClick={() => onItemAction('delete', record)} icon="delete" />
        </>
      )
    }
  ],
  rowKey: 'id'

  // 列表选择Alert显示
  // rowSelection: true,
  // selectAlert: (selectedRowKeys, props) => '自定义内容显示',
}

// 搜索项
export const formConfig = {
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
}

// 操作项
export const actions = (onItemAction, props) => {
  // return (
  //   <Button icon="plus" type="primary" onClick={() => onItemAction('add')}>
  //     添加
  //   </Button>
  // )
  return null
}

const db_table_config = {
  columns: [
    { dataIndex: 'index', title: '字段类型', disableEdit: true, width: 80 },
    {
      dataIndex: 'rowKey',
      title: <span className="ant-form-item-required">字段名</span>,
      options: {
        rules: [{ required: true }]
      }
    },
    { dataIndex: 'type', title: '字段类型' },
    {
      title: '字段长度',
      children: [
        { title: 'a', dataIndex: 'len' },
        { title: 'b', dataIndex: 'len1', disableEdit: true }
      ]
    },
    { dataIndex: 'desc', title: '备注' },
    { dataIndex: 'auth', title: '操作权限' }
  ]
}

// 添加编辑表单
export const editConfig = {
  items: [
    { key: 'name', label: '模型名', options: { rules: [{ required: true }] } },
    { key: 'desc', label: '描述' },
    {
      render: () => (
        <>
          <Divider dashed />
          <h3>模型表</h3>
        </>
      ),
      cols: FULL_COL
    },
    { key: 'tb_name', label: '表名' },
    {
      key: 'model_tb',
      options: { rules: [{ required: true }, { type: 'array', min: 3 }] },
      render: form => <ModelTable form={form} {...db_table_config} formKey="model_tb" />,
      cols: FULL_COL
    },
    {
      render: () => <br />
    }
  ],
  layout: 'vertical'
}

// 详情展示
export const pageConfig = {
  // items: props => [
  items: [
    { label: 'a', key: 'a' },
    { label: 'b', key: 'b', render: (text, data) => <div>自定义item组件</div> }
  ]
}

// ------------ 其他配置项 无特殊需求不用更改配置 ------
// 绑定后Model， 默认为list
// export const NS = 'list'

// 新增编辑是否跳转新页面
export const isPush = true

// 是否需获取其他model数据 （默认只获取绑定model的数据）
// export const otherModels = []
