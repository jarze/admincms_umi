export const tableConfig = {
	columns: [{
		title: 'a',
		dataIndex: 'a'
	}]
}

export const formConfig = {
	items: [{
		label: 'a',
		key: 'a'
	}],
	onValuesChange: true,
	onSubmit: false,
	onReset: false
}

export const actions = (onItemAction, props) => {
	return (<span>actions --- a</span>);
}

export const NS = 'otherModel';