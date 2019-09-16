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
		dataIndex: 'content',
	},
	{
		title: '标题',
		dataIndex: 'title',
	},
];

export const tableConfig = { rowKey: 'id', columns, selectionShowKey: 'name' };


const filterItems = [
	{
		label: 'id',
		key: 'id',
	},
	{
		label: '用户名称',
		key: 'name',
	}
];


export const formConfig = {
	items: filterItems,
	onValuesChange: true,
	onSubmit: false
}
