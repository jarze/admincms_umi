import { Button, Divider } from 'antd'
import ModelTable from './components/Table'

const FULL_COL = { xxl: 24, lg: 24, md: 24, xs: 24 };

export const tableConfig = {
	columns: onItemAction => [{
		dataIndex: 'id',
		title: 'ID',
		width: 100
	}, {
		dataIndex: 'name',
		title: '模型名'
	}, {
		dataIndex: 'desc',
		title: '描述'
	}, {
		key: 'operation',
		title: '操作',
		align: 'center',
		width: 150,
		render: (_, record) => (
			<>
				<Button type='link' onClick={() => onItemAction('detail', record)} icon='eye' />
				<Divider type="vertical" />
				<Button type='link' onClick={() => onItemAction('edit', record)} icon='edit' />
				<Divider type="vertical" />
				<Button type='link' onClick={() => onItemAction('delete', record)} icon='delete' />
			</>
		)
	}],
	rowKey: 'id'
};

export const isPush = true;

const db_table_config = {
	columns: [{
		dataIndex: 'rowKey',
		title: <span className="ant-form-item-required">字段名</span>,
	}, {
		dataIndex: 'type',
		title: '字段类型'
	}, {
		dataIndex: 'desc',
		title: '备注'
	}, {
		dataIndex: 'auth',
		title: '操作权限'
	},]
}

export const editConfig = {
	items: [{
		key: 'name',
		label: '模型名'
	}, {
		key: 'desc',
		label: '描述'
	}, {
		render: () => <h3>模型表</h3>,
		cols: FULL_COL
	}, {
		key: 'tb_name',
		label: '表名'
	}, {
		render: (form) => (<ModelTable form={form} {...db_table_config} />),
		cols: FULL_COL
	}, {
		render: () => <br />
	}],
	layout: 'vertical'
}