import { ModalForm } from '../comm';
import { useState } from 'react';

export default ({ children, onOkHandler, onOk, ...props }) => {
  const [modalLoading, setModalLoading] = useState(false);
  const modalProps = {
    onOk: (values, cb) => {
      if (onOkHandler) {
        setModalLoading(true);
        onOkHandler(values)
          .then(res => {
            if (res && res.code === 1001) {
              onOk && onOk(res);
              cb();
            }
          })
          .finally(() => setModalLoading(false));
      } else {
        onOk && onOk(values, cb);
      }
    },
    ...props,
    confirmLoading: modalLoading,
  };
  return <ModalForm {...modalProps}>{children}</ModalForm>;
};
