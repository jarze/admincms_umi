import { Button, Divider, AutoComplete } from 'antd';

export const tableConfig = {
	columns: [
		// 	{
		// 	title: 'id',
		// 	dataIndex: 'id',
		// },
		{
			title: '名称',
			dataIndex: 'displayName',
		},
		{
			title: 'url',
			dataIndex: 'url',
		}, {
			title: 'icon',
			dataIndex: 'icon',
		},
		{
			title: '操作',
			key: 'operation',
			dataIndex: 'operation',
			width: 200,
			render: (_, record) => (
				<>
					<Button type='link'>编辑</Button>
					<Divider type="vertical" />
					<Button type='link'>删除</Button>
				</>
			)
		}],
	pagination: false,
	rowKey: 'url',
	// childrenColumnNames: ['children', 'children', 'children', 'backendUrls']
	// expandedRowRender: (record, index, indent, expanded) => {
	// 	console.log(record, index, indent, expanded);
	// 	return null;
	// 	return "---"
	// }
}

// export const actions = (onItemAction, props) => {
// 	console.log(props)
// 	return (<span>actions --- a</span>);
// }

export const NS = 'otherModel';