import { Button, Divider, Input, Popconfirm, Icon, Select } from 'antd';
import { ModalForm } from '@components/comm';
import TemplatePoint from '@/pages/_components/TemplatePoint';
import router from 'umi/router';
import { EditableTable } from '@components/comm';

const { Option } = Select;

export const tableConfig = {
	columns: onItemAction => [
		{
			title: '数据模版名称',
			dataIndex: 'name',
		},
		{
			title: '采集方式',
			dataIndex: 'collectTypeName',
		},
		{
			title: '点位个数',
			dataIndex: 'totalPoints',
		},
		{
			title: '操作人',
			dataIndex: 'updateBy',
		},
		{
			title: '更新时间',
			dataIndex: 'updateTime',
			align: 'right',
			width: 190,
		},
		{
			title: '操作',
			dataIndex: 'operation',
			width: 270,
			align: 'center',
			render: (_, record) => {
				return (
					<>
						<ModalForm
							{...renameConfig}
							data={record}
							onOk={(values, callBack) => {
								onItemAction('rename', { id: record.id, ...values });
								callBack();
							}}
						>
							<Button type="link">重命名</Button>
						</ModalForm>
						<Divider type="vertical" />
						<Button type="link" onClick={() => onItemAction('edit', record)}>
							编辑
            </Button>
						<Divider type="vertical" />
						<Popconfirm
							title="确定删除？"
							onConfirm={() => onItemAction('delete', { ids: [record.id] })}
						>
							<Button type="link">删除</Button>
						</Popconfirm>
					</>
				);
			},
		},
	],
	rowSelection: true,
	selectAlert: {
		extraContent: (selectedRowKeys, { onItemAction }) => {
			return (
				<Popconfirm
					disabled={!(selectedRowKeys && selectedRowKeys.length > 0)}
					title="确定删除？"
					onConfirm={() => onItemAction('delete', { ids: selectedRowKeys })}
				>
					<Button type="link" disabled={!(selectedRowKeys && selectedRowKeys.length > 0)}>
						删除
          </Button>
				</Popconfirm>
			);
		},
	},
	rowKey: 'id',
	isPush: true,
};

export const actions = (onItemAction, props) => {
	return (
		<Button icon="plus" type="primary" onClick={() => onItemAction('add', undefined, '添加模版')}>
			添加
    </Button>
	);
};

const renameConfig = {
	items: [
		{
			key: 'name',
			options: {
				rules: [{ required: true }],
			},
		},
	],
	title: '重命名',
};

export const formConfig = {
	items: [
		{
			key: 'keyword',
			placeholder: '输入关键词',
			render: () => (
				<Input placeholder="输入关键词" allowClear={true} addonAfter={<Icon type="search" />} />
			),
		},
	],
	type: 'follow',
	onValuesChange: true,
	onSubmit: null,
	onReset: null,
	style: { float: 'right' },
};

export const editConfig = {
	items: ({ constant = {}, itemInfo = {} }) => [
		{
			label: '模版名称',
			key: 'name',
			disabled: !!itemInfo.name,
			options: {
				rules: [{ required: true }, { max: 30 }],
			},
		},
		{
			label: '采集方式',
			key: 'collectType',
			options: {
				rules: [{ required: true }],
			},
			render: () => (
				<Select>
					{(constant.collectTypes || []).map(item => (
						<Option key={item.type} value={item.type}>
							{item.value}
						</Option>
					))}
				</Select>
			),
		},
		{
			render: (form, data = {}) => (
				<TemplatePoint form={form} data={data['pointList'] || []} constant={constant} />
			),
			cols: {
				xxl: 24,
				lg: 24,
				md: 24,
				xs: 24,
			},
		},
	],
	type: 'col',
	// onValuesChange: (changedValues, allValues, props) => {
	//   console.log(allValues, '333');
	// },
	handleFormValues: values => {
		return EditableTable.handleTableFormValues(values, 'pointList');
	},
	cancelText: '取消',
	onReset: () => router.goBack(),
};


// 	查看页面
export const pageConfig = {
	items: [
		{
			label: '模型名',
			key: 'modelName',
		},
		{
			label: '操作权限',
			key: 'name',
		},
		{
			label: '备注',
			key: 'title'
		},
		{
			label: '内容',
			key: 'content',
			span: 3
		}
	],
	bordered: true,
	layout: 'horizontal'
};