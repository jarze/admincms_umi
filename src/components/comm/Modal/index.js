import { useState, Fragment } from 'react';
import { Modal } from 'antd';

export default ({ children, content, onOk, ...props }) => {
	const [visible, setVisible] = useState(false);

	const onOkCallBack = (e) => {
		if (e) e.stopPropagation();
		setVisible(false);
		onOk && onOk();
	}

	return (
		<Fragment>
			<Fragment onClick={() => setVisible(!visible)}>{children}</Fragment>
			<Modal
				visible={visible}
				destroyOnClose={true}
				maskClosable={false}
				onOk={onOkCallBack}
				{...props}
			>
				{content}
			</Modal>
		</Fragment>
	);
}
