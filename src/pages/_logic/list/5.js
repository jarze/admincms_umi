import { Button, Divider, AutoComplete } from 'antd';

const arrayColumns = [
	{
		title: 'id',
		dataIndex: 'id',
	},
	{
		title: '用户名称',
		dataIndex: 'name',
	},
	{
		title: '标题',
		dataIndex: 'content',
	},
	{
		title: '标题',
		dataIndex: 'title',
	},
];

const functionColumns = (onItemAction) => (
	[
		{
			title: 'id',
			dataIndex: 'id',
			align: 'center'
		},
		{
			title: '用户名称',
			dataIndex: 'name',
		},
		{
			title: '标题',
			dataIndex: 'title',
		},
		{
			title: '操作',
			key: 'operation',
			dataIndex: 'operation',
			render: (_, record) => (
				<>
					<Button type='link' onClick={() => onItemAction('detail', record)}>查看详情</Button>
					<Divider type="vertical" />
					<Button type='link' onClick={() => onItemAction('edit', record)}>编辑</Button>
					<Divider type="vertical" />
					<Button type='link' onClick={() => onItemAction('delete', record)}>删除</Button>
				</>
			)
		}
	]
);

export const tableConfig = {
	rowKey: 'id',
	columns: functionColumns,
	selectAlert: {
		selectionShowKey: 'name',
		extraContent: (selectedRowKeys, { onItemAction }) => {
			return (
				<>
					<Button type='link' onClick={() => onItemAction('detail', 1)}>查看详情</Button>
					<Divider type="vertical" />
					<Button type='link' onClick={() => onItemAction('edit', 1)}>编辑</Button>
					<Divider type="vertical" />
					<Button type='link' onClick={() => onItemAction('delete', 1)}>删除</Button>
				</>
			);
		}
	},
	rowSelection: true,
	// isPush: true
};

export const formConfig = {
	items: [
		{
			label: 'id',
			key: 'id',
		},
		{
			label: '用户名称',
			key: 'name',
		},
		{
			label: '标题',
			key: 'title',
		},
		{
			label: 'a',
			key: 'a',
		},
		{
			label: 'b',
			key: 'b',
		}
	],
	// onValuesChange: true,
	// onSubmit: false
};

// 	查看页面
export const pageConfig = {
	items: [
		{
			label: '模型名',
			key: 'modelName',
		},
		{
			label: '操作权限',
			key: 'name',
		},
		{
			label: '备注',
			key: 'title',
			render: (text, record, data) => <b>{JSON.stringify(data)}</b>
		},
		{
			label: '内容',
			key: 'content',
			span: 3
		}
	]
};

// 添加编辑页面
export const editConfig = {
	items: [
		{
			label: '模型名',
			key: 'modelName'
		},
		{
			label: '操作权限',
			key: 'name',
			render: () => (
				<AutoComplete dataSource={['查看', '编辑', '删除']} />
			)
		},
		{
			label: '表名',
			key: 'tableName',
		},
		{
			label: '备注',
			key: 'content',
		},
	],
	// 根据tableConfig的isPush参数决定参数是哪个
	width: 800,
	onValuesChange: (changedValues, allValues, props) => {
		console.log(changedValues, allValues, props);
	}
}

export const actions = (onItemAction, props) => {
	return (
		<>
			<Button icon='plus' type='primary' onClick={() => onItemAction('add')}>添加</Button>
			<Divider type="vertical" />
			<Button type='danger' disabled={props.selectedRowKeys.length === 0} onClick={() => onItemAction('delete', { ids: props.selectedRowKeys })}>批量删除</Button>
			<Divider type="vertical" />
			<Button disabled={props.selectedRowKeys.length === 0} onClick={() => onItemAction('action', { ids: props.selectedRowKeys })}>禁用</Button>
		</>
	);
}