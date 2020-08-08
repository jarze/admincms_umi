import { Button, Divider } from 'antd'

export const tableConfig = {
  // columns: [
  //   { title: 'a', dataIndex: 'a' },
  //   { title: 'b', dataIndex: 'b' },
  //   { title: 'c', dataIndex: 'c', render: (text, record, index) => '自定义column显示' },
  //   { title: 'd', dataIndex: 'd', render: (text, record, index) => '自定义column显示' },
  // ],
  columns: onItemAction => [
    {
      dataIndex: 'id',
      title: 'ID',
      width: 100,
    },
    {
      dataIndex: 'name',
      title: '模型名',
    },
    {
      dataIndex: 'desc',
      title: '描述',
    },
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
      ),
    },
  ],
  rowKey: 'id',
  //selectAlert: (selectedRowKeys, props) => null
}
export const formConfig = {
  items: [
    { label: '', key: '', render: (form, data) => <div>自定义表单组件</div> },
    { label: '', key: 'a' },
    { render: (form, data) => <div>自定义内容显示</div> },
  ],
}

export const action = (onItemAction, props) => {
  return null
}

export const editConfig = {
  items: [
    { label: '', key: '', render: (form, data) => <div>自定义表单组件</div> },
    { label: '', key: '' },
    { render: (form, data) => <div>自定义内容显示</div> },
  ],
}

export const pageConfig = {
  items: [
    { label: '', key: '' },
    { label: '', key: '', render: (text, data) => <div>自定义item组件</div> },
  ],
}
