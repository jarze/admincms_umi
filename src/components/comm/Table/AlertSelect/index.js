import { Fragment } from 'react';
import { Alert, Button, Icon, Popover, Tag } from 'antd';

/* table rowSelection 参数 */
export default ({ selectedRowKeys = [], onChange, dataSource = [], rowKey, selectionShowKey }) => {
	const count = selectedRowKeys.length;

	if (count === 0) return <Fragment />;

	const selectedData = dataSource.filter((item) => selectedRowKeys.includes(item[rowKey])).map(item => {
		const key = item[rowKey];
		return (
			<Tag
				key={key}
				trigger="hover"
				closable
				onClose={e => {
					e.preventDefault();
					const newSelect = [...selectedRowKeys];
					newSelect.splice(selectedRowKeys.indexOf(key), 1);
					clearSelect(newSelect);
				}}
			>
				{item[selectionShowKey]}
			</Tag>
		);
	});

	const selected = (
		selectionShowKey ?
			<Popover
				placement="bottom"
				content={<div style={{ maxWidth: 250 }}>{selectedData}</div>}
			>
				<Button type='link'>{count}</Button>
			</Popover>
			:
			<Button type='link'>{count}</Button>
	);

	const alert = (
		<div>
			&nbsp;&nbsp;&nbsp;&nbsp;
			<span>已选择 {selected} 项</span>
			<Button type='link' onClick={() => clearSelect([])}>清空</Button>
		</div>
	);

	const clearSelect = (keys) => {
		onChange && keys && onChange(keys);
	}

	return (
		<Alert
			type='info'
			showIcon
			icon={<Icon type="info-circle" style={{ fontSize: '24px' }} />}
			message={alert}
		/>
	);
}
