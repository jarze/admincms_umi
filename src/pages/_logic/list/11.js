import { Button, Divider, AutoComplete } from 'antd';
import Link from 'umi/link';

const rowKey = 'id';

const columns = [
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
		dataIndex: 'title',
	},
	{
		title: '操作',
		key: 'operation',
		dataIndex: 'operation',
		render: (_, record) => (
			<>
				<Link to={`./list/page/${record.id}?breadcrumb=${record.name}`}>查看详情</Link>
				<Divider type="vertical" />
				<Link to={`./list/edit/${record.id}?breadcrumb=${record.name}`}>编辑</Link>
				<Divider type="vertical" />
				<Button type='link'>删除</Button>
			</>
		)
	}
];

export const tableConfig = {
	rowKey,
	columns,
	selectionShowKey: 'name',
	rowSelection: null
};

const filterItems = [
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
	},
	{
		label: 'c',
		key: 'c',
	},
	{
		label: 'd',
		key: 'd',
	},
	{
		label: 'ee',
		key: 'e',
	},
];


export const formConfig = {
	items: filterItems,
};

// 	查看页面
export const items = [
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
	},
	{
		label: '内容',
		key: 'content',
		span: 3
	}
];

// 添加编辑页面
export const editItems = [
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
]; 
