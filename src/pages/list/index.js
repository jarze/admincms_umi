/**
 * title: 示例页面
 * Routes:
 *   - ./src/routes/list.js
 */
import { Fragment } from 'react';
import { connect } from 'dva';
import { Table, Form } from '@components/comm';
import { Button } from 'antd';
import useSearchTable from '@utils/hooks/useSearchTable';
import { NS } from './model';

const Page = ({
	loading,
	columns,
	filterItems,
	...props
}) => {
	const [tbProps, fmProps] = useSearchTable(props, NS, columns, filterItems, loading);
	return (
		<>
			<Form {...fmProps} />
			<Table
				{...tbProps}
				rowKey='id'
				selectionShowKey='name'
				renderAlertSelectExtraContent={(keys = []) => {
					return (
						<Fragment >
							<Button type='primary' disabled={keys.length === 0}>导出</Button>
						</Fragment>
					);
				}}
			/>
		</>
	);
};

export default connect(sto => ({
	...sto[NS],
	loading: sto.loading.effects
}))(Page);
