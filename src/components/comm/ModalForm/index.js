import { useState, Fragment, useRef } from 'react';
import { Modal } from 'antd';
import { Form } from '@components/comm';

export default ({ items, children, onOk, ...props }) => {
	const [visible, setVisible] = useState(false);
	const [formData, setFormData] = useState({});
	const t = useRef(null);

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
	}

	const onValuesChange = (_, allValues) => {
		setFormData(allValues);
	}

	const fmProps = {
		items,
		layout: 'horizontal',
		labelCol: { span: 4 },
		wrapperCol: { span: 20 },
		col: 24,
		data: formData,
		onValuesChange,
	};

	return (
		<Fragment>
			<span onClick={() => handleVisible(true)}>{children}</span>
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
