import { Fragment } from 'react';
import { Affix, Alert, Button, Icon, Popover, Tag, Divider, Checkbox } from 'antd';

/* table rowSelection,  参数 */
export default ({ onRowSelect, onRowSelectChange, renderAlertSelectExtraContent, rowSelection = {}, dataSource = [], rowKey, selectionShowKey }) => {
	const { selectedRowKeys = [], onChange } = rowSelection;
	const count = selectedRowKeys.length;

	const handleRowSelectChange = (checked) => {
		onRowSelectChange && onRowSelectChange(checked);
		!checked && onChange && onChange([]);
	}

	const selectedData = selectionShowKey && dataSource.filter((item) => selectedRowKeys.includes(item[rowKey])).map(item => {
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
		selectionShowKey && count > 0 ?
			<Popover
				placement="bottom"
				content={<div style={{ maxWidth: 250 }}>{selectedData}</div>}
			>
				<Button type='link' size='small'>{count}</Button>
			</Popover>
			:
			<Button type='link' size='small'>{count}</Button>
	);

	const alert = (
		<div>
			<Fragment>
				{onRowSelectChange ?
					<Checkbox checked={onRowSelect} onChange={e => handleRowSelectChange(e.target.checked)} />
					:
					<Icon type="info-circle" theme="twoTone" />
				}
				<span>&nbsp;&nbsp;已选择 {selected} 项</span>
				<Divider type="vertical" />
				<Button type='link' size='small' onClick={() => clearSelect([])} disabled={!count}>清空</Button>
			</Fragment>
			{renderAlertSelectExtraContent && renderAlertSelectExtraContent(selectedRowKeys)}
		</div>
	);

	const clearSelect = (keys) => {
		onChange && keys && onChange(keys);
	}

	return (
		<Affix offsetTop={8}>
			<Alert
				type='info'
				message={alert}
				style={{ marginBottom: '1em', overflow: 'hidden' }}
			/>
		</Affix>
	);
}
