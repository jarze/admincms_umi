import React, { useEffect } from 'react';
import { Form, Input, Button, Divider } from 'antd';
const FormItem = Form.Item;

const CForm = ({
	form: { getFieldDecorator, validateFields, resetFields, getFieldsValue },
	items = [], // [{key, label, ...}]
	data = {},
	onSubmit, // 确定按钮
	onReset, // 取消按钮
	loading,
	okText = '确定',
	cancelText = '清除',
	...formProps
}) => {
	useEffect(() => {
		resetFields();
	}, [data, resetFields]);

	const formContent = items.map(({ key, label, options, render, ...itemProps }) => {
		if (render === null) return null;
		return (
			<FormItem label={label} key={key} {...itemProps}>
				{getFieldDecorator(key, {
					initialValue: data[key],
					...options,
				})(render ? render() : <Input type="text" />)}
			</FormItem>
		);
	});

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

	return (
		<Form layout='inline' onSubmit={handleSubmit} {...formProps}>
			{formContent}
			{
				onSubmit &&
				<FormItem style={{ float: 'right', marginRight: 0 }}>
					<Button type="primary" htmlType="submit" loading={loading}>
						{okText}
					</Button>
					{onReset &&
						<>
							<Divider type="vertical" />
							<Button type="cancel" onClick={handleClear}>
								{cancelText}
							</Button>
						</>
					}
				</FormItem>
			}
		</Form>
	);
};

export default Form.create()(CForm);
