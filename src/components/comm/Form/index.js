/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useMemo } from 'react'
import { Form, Input, Button, Divider, Row, Col } from 'antd'
import style from './index.less'

const FormItem = Form.Item

/* 获取排列方式 */
const getColsHandle = count => {
	const cols = { xxl: 6, lg: 8, md: 12, xs: 24 }
	const handleColumns = col => {
		let columns = 24 / col
		return (columns - (count % columns)) * col
	}
	const submitCols = {}
	Object.keys(cols).forEach(key => {
		submitCols[key] = handleColumns(cols[key])
	})
	return { cols, submitCols };
}

const getColWap = (type, count, col, submitCol) => {
	switch (type) {
		case 'col': {
			let { cols = { span: 8 }, submitCols = { span: 24 } } = col ? { cols: { span: col }, submitCols: { span: col } } : getColsHandle(count);
			if (submitCol) submitCols = { span: submitCol };
			const FormContentWap = props => <Row gutter={16} {...props} />;
			const FormItemWap = props => <Col {...cols} {...props} />;
			const ForSubmitItemWap = props => <Col {...submitCols} {...props} />;
			return [FormContentWap, FormItemWap, ForSubmitItemWap];
		};
		default: {
			return [Fragment, Fragment, Fragment];
		}
	}
}

export const CForm = ({
	form,
	items = [], // [{key, label, ...}]
	data,
	onSubmit, // 确定按钮
	onReset, // 取消按钮
	loading,
	okText = '确定',
	cancelText = '取消',
	type = 'col', // 'follow' | 'col' | 'center',
	col, // 固定排版 24 8,type = 'col'时有效
	submitCol,// 提交按钮固定排版, type = 'col'时有效
	onValuesChange,
	...formProps
}) => {
	const { getFieldDecorator, validateFields, resetFields } = form;
	useEffect(() => {
		if (data) resetFields();
	}, [data])

	const [FormContentWap, FormItemWap, ForSubmitItemWap] = useMemo(() => getColWap(type, items.length, col, submitCol), [items.length, type])

	const handleSubmit = e => {
		e.preventDefault()
		validateFields((err, values) => {
			if (!err) {
				onSubmit && onSubmit(values)
			}
		})
	}

	const handleClear = e => {
		e.preventDefault()
		resetFields()
		onReset && onReset({})
	}

	const formContent = items.map(({
		cols,
		key,
		label,
		placeholder,
		options,
		render,
		defaultValue,
		disabled = false,
		...itemProps
	}, index) => {
		if (render === null || (render && render(form, data) === null)) return null
		return (
			<FormItemWap key={key || index} {...cols}>
				{key ? (
					<FormItem label={label} key={key} {...itemProps}>
						{getFieldDecorator(key, {
							initialValue: data && data[key] !== undefined ? data[key] : defaultValue,
							...options,
						})(
							render ? render(form) : <Input type="text" disabled={disabled} placeholder={placeholder || (label ? `输入${label}` : '')} />
						)}
					</FormItem>
				) : (render && render(form, data)) // 不指定key， 直接渲染render内容
				}
			</FormItemWap>
		)
	}
	)

	const formSubmit = (onSubmit || onReset) && (
		<ForSubmitItemWap>
			<FormItem
				style={type === 'center' ? { textAlign: 'center' } : { float: 'right', marginRight: 0 }}
				wrapperCol={
					type === 'center'
						? { offset: (formProps.labelCol || {}).span, ...formProps.wrapperCol }
						: {}
				}
			>
				{onSubmit && <Button type="primary" htmlType="submit" loading={loading}>{okText}</Button>}
				{onReset && (
					<>
						{onSubmit && <Divider type="vertical" />}
						<Button type="cancel" onClick={handleClear}>{cancelText}</Button>
					</>
				)}
			</FormItem>
		</ForSubmitItemWap>
	)

	if (items.length === 0) return <Fragment />

	return (
		<Form
			className={style[type === 'col' ? 'ant-advanced-search-form' : '']}
			layout="inline"
			style={{ overflow: 'hidden', marginBottom: '1em' }}
			onSubmit={handleSubmit}
			{...formProps}
		>
			<FormContentWap>
				{formContent}
				{formSubmit}
			</FormContentWap>
		</Form>
	)
}

export const validateMessages = {
	required: () => '必填',
	string: {
		max: (a, b) => `不超过${b}个字符`,
	},
}

export default Form.create({
	onValuesChange: ({ onValuesChange, ...props }, changedValues, allValues) => {
		onValuesChange && onValuesChange(changedValues, allValues)
	},
	validateMessages,
})(CForm)
