/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useMemo } from 'react';
import { Form, Input, Button, Divider, Row, Col } from 'antd';
import style from './index.less';

const FormItem = Form.Item;

/* 获取排列方式 */
const getColsHandle = (count) => {
	const cols = {
		xxl: 6,
		lg: 8,
		md: 12,
		xs: 24,
	}
	const handleColumns = (col) => {
		let columns = (24 / col)
		return (columns - (count % columns)) * col;
	}
	const submitCols = {};
	Object.keys(cols).forEach((key) => {
		submitCols[key] = handleColumns(cols[key]);
	});
	return { cols, submitCols };
}

const getColWap = (type, count, col) => {
	switch (type) {
		default: {
			const { cols = { span: 8 }, submitCols = { span: 24 } } = col ? { cols: { span: col }, submitCols: { span: col } } : getColsHandle(count);
			const FormContentWap = (props) => (type === 'col' ? <Row gutter={16} {...props} /> : <Fragment {...props} />);
			const FormItemWap = (props) => (type === 'col' ? <Col {...cols} {...props} /> : <Fragment {...props} />);
			const ForSubmitItemWap = (props) => (type === 'col' ? <Col {...submitCols} {...props} /> : <Fragment {...props} />);
			return [FormContentWap, FormItemWap, ForSubmitItemWap];
		}
	}
}

const CForm = ({
	form: { getFieldDecorator, validateFields, resetFields, getFieldsValue },
	items = [], // [{key, label, ...}]
	data = {},
	onSubmit, // 确定按钮
	onReset, // 取消按钮
	loading,
	okText = '确定',
	cancelText = '清除',
	type = 'col',// 'follow' | 'col',
	onValuesChange,
	col, // 固定排版 24 8
	...formProps
}) => {
	useEffect(() => {
		resetFields();
	}, [data]);

	const [FormContentWap, FormItemWap, ForSubmitItemWap] = useMemo(() => getColWap(type, items.length, col), [items]);

	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				onSubmit && onSubmit(values);
			}
		});
	};

	const handleClear = (e) => {
		e.preventDefault();
		resetFields();
		onReset && onReset({});
	};

	const formContent = items.map(({ key, label, options, render, ...itemProps }) => {
		if (render === null) return null;
		return (
			<FormItemWap key={key}>
				<FormItem label={label} key={key} {...itemProps}>
					{getFieldDecorator(key, {
						initialValue: data[key],
						...options,
					})(render ? render() : <Input type="text" />)}
				</FormItem>
			</FormItemWap>
		);
	});

	const formSubmit = (
		(onSubmit || onReset) &&
		<ForSubmitItemWap>
			<FormItem style={{ float: 'right', marginRight: 0 }}>
				{onSubmit &&
					<Button type="primary" htmlType="submit" loading={loading}>
						{okText}
					</Button>
				}
				{onReset &&
					<>
						{onSubmit && <Divider type="vertical" />}
						<Button type="cancel" onClick={handleClear}>
							{cancelText}
						</Button>
					</>
				}
			</FormItem>
		</ForSubmitItemWap>
	);

	return (
		<Form
			className={style[type === 'col' ? "ant-advanced-search-form" : '']}
			layout='inline'
			style={{ overflow: 'hidden', margin: '1em 0' }}
			onSubmit={handleSubmit}
			{...formProps}
		>
			<FormContentWap>
				{formContent}
				{formSubmit}
			</FormContentWap>
		</Form>
	);
};

export default Form.create({
	onValuesChange: ({ onValuesChange, ...props }, changedValues, allValues) => {
		onValuesChange && onValuesChange(changedValues, allValues);
	}
})(CForm);
