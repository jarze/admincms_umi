import PointSelect from './PointSelect';
import { Button, Popconfirm, Input, Select, AutoComplete, Icon, InputNumber } from 'antd';
import ModalInput from './ModalInput';

const { TextArea } = Input;
const { Option } = Select;

const UNITS = ['A', 'V', 'kV', 'W', 'Ω'];

// 量程范围
const rangeConfig = {
  title: '量程范围',
  items: [
    {
      key: 'rangeFloor',
      label: '下限',
      render: () => <InputNumber autoFocus placeholder={`输入下限`} precision={4} />,
    },
    {
      key: 'rangeCeil',
      label: '上限',
      options: { rules: [{ type: 'number' }] },
      render: () => <InputNumber placeholder={`输入上限`} precision={4} />,
    },
    {
      render: () => (
        <div>
          <Icon type="info-circle" theme="twoTone" /> 表计可测量的上下限值。可输入小数点后四位。
        </div>
      ),
      cols: {
        xxl: 24,
        lg: 24,
        md: 24,
        xs: 24,
      },
    },
  ],
};

// 系数
const xsConfig = {
  title: '系数',
  items: [
    {
      key: 'base',
      label: '基数',
      render: () => <InputNumber autoFocus placeholder={`输入基数`} precision={6} />,
    },
    {
      key: 'factor',
      label: '倍率',
      render: () => <InputNumber placeholder={`输入倍率`} precision={6} />,
    },
    {
      render: () => (
        <div>
          <Icon type="info-circle" theme="twoTone" /> 工程值=基数+倍率*源码值。可输入小数点后六位。
        </div>
      ),
      cols: {
        xxl: 24,
        lg: 24,
        md: 24,
        xs: 24,
      },
    },
  ],
};

export const columnsFn = (
  handlePointSelect,
  handleDelete,
  { ctpt, permissions, rowKey },
  operation,
) => [
  {
    title: <span className="ant-form-item-required">点位名称</span>,
    dataIndex: 'point',
    width: 120,
    editRender: (t, record, indexKey) => (
      <PointSelect
        style={{ width: 90 }}
        onChange={(va, points) => handlePointSelect(points, indexKey)}
      />
    ),
    options: {
      rules: [{ required: true }],
    },
  },
  {
    title: '描述',
    dataIndex: 'desc',
    editRender: t => <TextArea autosize={{ maxRows: 3 }} />,
    options: { rules: [{ max: 30 }] },
  },
  {
    title: '单位',
    dataIndex: 'unit',
    width: 80,
    editRender: t => <AutoComplete dataSource={UNITS} filterOption={true} />,
    options: { rules: [{ max: 30 }] },
  },
  {
    title: 'CT&PT',
    dataIndex: 'calculateType',
    width: 100,
    defaultValue: 0,
    editRender: () => (
      <Select style={{ width: 90 }}>
        {ctpt.map(item => (
          <Option key={item.value} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    ),
    render: t => (ctpt[t] || {}).label || '-',
  },
  {
    title: '系数',
    dataIndex: 'base&factor',
    width: '10%',
    editRender: (t, record, indexKey) => (
      <ModalInput
        formProps={xsConfig}
        render={(va = {}) => `${va.base || '0'} + V * ${va.factor || '1'}`}
      />
    ),
    render: (t = {}) => `${t.base || 0} + V * ${t.factor || 1}`,
  },
  {
    title: '量程范围',
    dataIndex: 'rangeFloor&rangeCeil',
    width: '10%',
    editRender: (t, record, indexKey) => (
      <ModalInput
        formProps={rangeConfig}
        render={(va = {}) => `${va.rangeFloor || '-'} ~ ${va.rangeCeil || '-'}`}
      />
    ),
    render: (t = {}) => `${t.rangeFloor || '-'} ~ ${t.rangeCeil || '-'}`,
  },
  {
    title: '数据权限',
    dataIndex: 'rwAuth',
    width: 90,
    defaultValue: 0,
    editRender: () => (
      <Select style={{ width: 70 }}>
        {permissions.map(item => (
          <Option key={item.value} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    ),
    render: t => (permissions[t] || {}).label || '-',
  },
  {
    title: '操作',
    dataIndex: 'op',
    disableEdit: true,
    align: 'center',
    width: 80,
    colSpan: operation ? 1 : 0,
    render: (_, record) =>
      operation ? (
        <Popconfirm title="确定删除？" onConfirm={() => handleDelete([record[rowKey]])}>
          <Button type="link">删除</Button>
        </Popconfirm>
      ) : null,
  },
];
