export const tableConfig = {
	columns: [{
		title: 'a-1',
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

export const getTabs = (tabKey) => {
	return (
		<div style={{ background: 'yellow' }}>
			<span style={tabKey === '1' ? { color: 'red' } : {}}> tab1</span>
			<span style={tabKey === '2' ? { color: 'red' } : {}}>  tab2</span>
		</div>
	);
}