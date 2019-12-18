import { useMemo, useCallback, useEffect } from 'react';
import { Table } from 'antd';
import EditableCell from './EditableCell';

// 需要传入form
const EditableTable = props => {
	const { editable, form, columns, dataSource, rowKey = 'index', ...restProps } = props;

	const handleColumn = useCallback((data = []) => {
		return data.map(({ children, ...col }) => ({
			onCell: (record, index) => ({
				editable,
				record,
				index,
				form,
				rowKey,
				...col,
			}),
			children: children && handleColumn(children),
			...col,
		}));
	});

	const tbColumns = useMemo(() => {
		return handleColumn(columns);
	}, [columns, handleColumn]);

	const columnKeys = useMemo(
		() => columns.filter(item => !item.disableEdit).map(item => `${item.dataIndex}`),
		[columns],
	);

	// 设置标记唯一
	const datas = useMemo(() => {
		const values = form.getFieldsValue();
		// 重置form数据，保存当前form输入内容到table数据
		return handleTableDataByFormValue(columnKeys, dataSource, values, rowKey);
	}, [columnKeys, dataSource, form, rowKey]);

	useEffect(() => {
		let keys = datas.reduce((res, unit) => {
			let index = unit[rowKey];
			return [...columnKeys.map(item => `${item}-${index}`), ...res];
		}, []);
		// 刷新更新table表单数据
		form.resetFields(keys);
	}, [columnKeys, datas, form, rowKey]);

	const components = {
		body: {
			cell: EditableCell,
		},
	};

	return (
		<Table
			components={components}
			columns={tbColumns}
			dataSource={datas}
			rowKey={(record, index) => record[rowKey] || index}
			pagination={false}
			{...restProps}
		/>
	);
};

export default EditableTable;

// 将表单数据处理传到table数组数据上
const handleTableDataByFormValue = (columnKeys, dataSource, values, rowKey) => {
	return dataSource.map((item, index) => {
		if (item[rowKey] === undefined) {
			//不存在标记，说明是新增进表格, 内容以dataSource
			item[rowKey] = index > 0 ? Number(dataSource[index - 1][rowKey]) + 1 : 0;
		} else {
			let rk = item[rowKey];
			columnKeys.forEach(cl => {
				let va = values[`${cl}-${rk}`];
				va && (item[cl] = va);
			});
		}
		return { ...item };
	});
};

// 将table表单数据转换为数组数据
EditableTable.handleTableFormValues = (values, name) => {
	let newValue = {};
	let keys = Object.keys(values);

	let key, index;
	let columnKeys = [],
		indexKeys = [];

	keys.forEach(item => {
		let [k, i] = item.split('-');

		if (item.includes('-')) {
			if (!key) {
				key = k;
				index = i;
			}
		} else {
			newValue[item] = values[item];
		}
		if (key) {
			if (item.endsWith(`-${index}`)) {
				columnKeys.push(k);
			}
			if (item.startsWith(`${key}-`)) {
				indexKeys.push(i);
			}
		}
	});

	const data = indexKeys.map(index => {
		return columnKeys.reduce((res, column) => {
			let indexKey = `${column}-${index}`;
			let params = {};
			let value = values[indexKey];
			if (typeof value === 'object') {
				params = { ...value };
			} else {
				params[column] = value;
			}
			return { ...res, ...params };
		}, {});
	});
	newValue[name] = data;
	return newValue;
};
