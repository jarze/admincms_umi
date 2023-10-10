import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

import { dispatchUpdate } from '../../index';

const defaultBackgroundStyle =
  'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAABqADAAQAAAABAAAABgAAAABrkD2lAAAAN0lEQVQIHWP4//+/FAMSAPFBmBFJjAFZEVwCRZCR8RlYAl0QZAojNkGQBBOIAAFGoHYIiwFsFwBvphxjZS2X0AAAAABJRU5ErkJggg==") scroll round';

function ScreenBasicModal(props) {
  const { form, json } = props;

  const [visible, setVisible] = useState(false);

  const handleOk = () => {
    form.validateFields((err, values) => {
      if (err) return;
      const { width, height, ...rest } = values;
      json.width = width && width + 'px';
      json.height = height && height + 'px';

      if (!json.data) json.data = {};
      json.data = { ...json.data, ...rest };
      dispatchUpdate();
      setVisible(false);
    });
  };

  useEffect(() => {
    const { width, height, data } = json;
    form.setFieldsValue({
      width: width?.slice?.(0, -2),
      height: height?.slice?.(0, -2),
      background: data?.background || defaultBackgroundStyle,
      paddingHorizontal: data?.paddingHorizontal || '24',
      paddingVertical: data?.paddingVertical || '16',
    });
  }, [visible]);

  const rules = [
    { required: true, message: '请输入有效数字' },
    { pattern: /^\d+(\.\d+)?$/, message: '请输入有效数字' },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        基础配置
      </Button>

      <Modal
        visible={visible || !json.data}
        title="大屏基础配置"
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <Form>
          <Form.Item label="大屏宽度">
            {form.getFieldDecorator('width', { rules: [{ whitespace: true }] })(
              <Input autoFocus={true} suffix="px" />,
            )}
          </Form.Item>
          <Form.Item label="大屏高度">
            {form.getFieldDecorator('height', { rules: [{ whitespace: true }] })(
              <Input suffix="px" />,
            )}
          </Form.Item>
          <Form.Item label="大屏背景">{form.getFieldDecorator('background')(<Input />)}</Form.Item>
          <Form.Item label="水平边距">
            {form.getFieldDecorator('paddingHorizontal', { rules })(<Input suffix="px" />)}
          </Form.Item>
          <Form.Item label="垂直边距">
            {form.getFieldDecorator('paddingVertical', { rules })(<Input suffix="px" />)}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

type PropsType = { json: any } & FormComponentProps;

export default Form.create<PropsType>()(ScreenBasicModal);
