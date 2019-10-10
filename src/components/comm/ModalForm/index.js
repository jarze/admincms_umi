import { useState, Fragment, useRef, useEffect } from 'react';
import { Modal } from 'antd';
import { Form } from '@components/comm';

export default ({ items, children, onOk, onCancel, data, onValuesChange, ...props }) => {
	// 有children时可以通过children点击自我控制visible显示
	const [visible, setVisible] = useState(false);

	const [formData, setFormData] = useState(data || {});

	const t = useRef(null);

	useEffect(() => {
		if (data) {
			setFormData(data);
		}
	}, [data]);

	const onOkCallBack = (e) => {
		if (e) e.stopPropagation();
		const { current: form } = t;
		form.validateFields((err, values) => {
			if (!err) {
				onOk && onOk(values, handleVisible);
			}
		});
	}

	const handleVisible = (vs) => {
		setVisible(vs);
		if (!vs) {
			setFormData({});
		}
		onCancel && onCancel();
	}

	const handleValuesChange = (changedValues, allValues) => {
		setFormData(allValues);
		onValuesChange && onValuesChange(changedValues, allValues);
	}

	const fmProps = {
		items,
		layout: 'horizontal',
		labelCol: { span: 4 },
		wrapperCol: { span: 20 },
		col: 24,
		data: formData,
		onValuesChange: handleValuesChange,
	};

	return (
		<Fragment>
			{children && <span onClick={() => handleVisible(true)}>{children}</span>}
			<Modal
				visible={visible}
				maskClosable={false}
				onOk={onOkCallBack}
				onCancel={() => handleVisible(false)}
				{...props}
			>
				<Form ref={t} {...fmProps} />
			</Modal>
		</Fragment>
	);
}
