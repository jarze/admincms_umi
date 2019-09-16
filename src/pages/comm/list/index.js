/**
 * title: 示例页面
 * Routes:
 *   - ./src/routes/list.js
 */
import { Fragment } from 'react';
import { connect } from 'dva';
import { Table, Form } from '@components/comm';
import { Button } from 'antd';
import useSearchTable from '@/pages/_hooks/useSearchTable';
import { NS } from '../model';

const Page = ({
	loading,
	tableConfig,// table定义
	formConfig,
	otherFilterParams = {},
	children,
	...props
}) => {
	const [tbProps, fmProps] = useSearchTable(props, NS, tableConfig, formConfig, loading, otherFilterParams);
	return (
		<>
			<Form {...fmProps} />
			<div>
				<Button icon='plus' type="primary">添加</Button>
			</div>
			<br />
			<Table
				{...tbProps}
				renderAlertSelectExtraContent={(keys = []) => {
					return (
						<Fragment >
							<Button type='primary' disabled={keys.length === 0} size='small' style={{ float: 'right' }}>删除</Button>
						</Fragment>
					);
				}}
			/>
			{children}
		</>
	);
};

export default connect(sto => ({
	...sto[NS],
	loading: sto.loading.effects
}))(Page);
