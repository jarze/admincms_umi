import { Input, Form } from 'antd';
const FormItem = Form.Item;

export default props => {
  const {
    children,
    editable,
    record,
    rowKey,
    index,
    form,
    disableEdit,
    dataIndex,
    editRender,
    render,
    options,
    defaultValue,
    ...restProps
  } = props;

  return (
    <td {...restProps}>
      {disableEdit || !editable ? (
        children
      ) : dataIndex ? (
        <FormItem>
          {form.getFieldDecorator(`${dataIndex}-${record[rowKey]}`, {
            initialValue: (record && record[`${dataIndex}`]) || defaultValue,
            ...options,
          })(
            editRender ? (
              editRender(record && record[dataIndex], record, record[rowKey])
            ) : (
              <Input />
            ),
          )}
        </FormItem>
      ) : (
        editRender && editRender(null, record, record[rowKey])
      )}
    </td>
  );
};
