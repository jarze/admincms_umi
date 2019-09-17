/* eslint-disable react-hooks/exhaustive-deps */
/**
 * title: 示例页面
 * Routes:
 *   - ./src/routes/list.js
 */
import { Fragment } from 'react';
import { connect } from 'dva';
import { TableSelect, Form, ModalForm, } from '@components/comm';
import { Button } from 'antd';
import useSearchTable from '@/pages/_hooks/useSearchTable';
import useModalForm from '@/pages/_hooks/useModalForm';
import router from 'umi/router';

import { NS } from '../model';

const Page = ({
	loading,
	tableConfig,// table定义
	formConfig,
	editItems,
	otherFilterParams,
	children,
	...props
}) => {
	const [tbProps, fmProps] = useSearchTable(props, NS, tableConfig, formConfig, loading, otherFilterParams);

	const [modalProps, setEditId] = useModalForm(props, NS, editItems, loading);

	return (
		<>
			{formConfig && <Form {...fmProps} />}
			<div>
				<Button icon='plus' type='primary' onClick={() => setEditId('add')}>添加</Button>
				<Button icon='plus' type='primary' onClick={() => router.push('./list/edit?breadcrumb=添加')}>添加</Button>
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
