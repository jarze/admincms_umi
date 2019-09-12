import { Button, Divider } from 'antd';
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
				<Link to={`?id=${record.id}`}>编辑</Link>
				<Link to={`./list/page/${record.id}?breadcrumb=${record.name}`}>查看详情</Link>
				<Button type='link'>编辑</Button>
				<Divider type="vertical" />
				<Button type='link'>删除</Button>
			</>
		)
	}
];

export const tableConfig = { rowKey, columns, selectionShowKey: 'name' };

export const filterItems = [
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

export const items = [
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
		label: '内容',
		key: 'content',
		span: 3
	}
]; 
