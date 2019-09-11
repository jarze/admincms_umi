import { Button, Divider } from 'antd';
import Link from 'umi/link';

export const columns = [
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
				<Button type='link'>编辑</Button>
				<Divider type="vertical" />
				<Button type='link'>删除</Button>
			</>
		)
	}
];

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
