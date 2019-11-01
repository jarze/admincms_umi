import { useState, Fragment } from 'react';
import { Modal } from 'antd';

export default ({ children, content, onOk, onCancel, ...props }) => {
  const [visible, setVisible] = useState(false);

  const onOkCallBack = e => {
    if (e) e.stopPropagation();
    onOk && onOk(handleVisible);
  };

  const handleVisible = vs => {
    setVisible(vs);
    onCancel && onCancel();
  };

  return (
    <Fragment>
      {children && <span onClick={() => setVisible(!visible)}>{children}</span>}
      <Modal
        visible={visible}
        destroyOnClose={true}
        maskClosable={false}
        onOk={onOkCallBack}
        onCancel={() => handleVisible(false)}
        {...props}
      >
        {content}
      </Modal>
    </Fragment>
  );
};
