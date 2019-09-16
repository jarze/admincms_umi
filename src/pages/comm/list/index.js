/**
 * title: 示例页面
 * Routes:
 *   - ./src/routes/list.js
 */
import { Fragment } from 'react';
import { connect } from 'dva';
import { TableSelect, Form, ModalForm } from '@components/comm';
import { Button } from 'antd';
import useSearchTable from '@/pages/_hooks/useSearchTable';
import { NS } from '../model';
import router from 'umi/router';

const Page = ({
	loading,
	tableConfig,// table定义
	formConfig,
	otherFilterParams = {},
	children,
	...props
}) => {
	const [tbProps, fmProps] = useSearchTable(props, NS, tableConfig, formConfig, loading, otherFilterParams);

	const { computedMatch: { params: matchParams } } = props;
	const editId = matchParams.id;
	const modalProps = {
		title: editId !== 'add' ? '编辑' : '添加',
		visible: editId ? true : false,
		items: props.editItems
	}
	return (
		<>
			<Form {...fmProps} />
			<div>
				<Button icon='plus' type='primary' onClick={() => { router.push('./list/add') }}>添加</Button>
			</div>
			<br />
			<TableSelect
				{...tbProps}
				renderAlertSelectExtraContent={(keys = []) => {
					return (
						<Fragment >
							<Button type='primary' disabled={keys.length === 0} size='small' style={{ float: 'right' }}>删除</Button>
						</Fragment>
					);
				}}
			/>
			<ModalForm {...modalProps} />
		</>
	);
};

export default connect(sto => ({
	...sto[NS],
	loading: sto.loading.effects
}))(Page);
