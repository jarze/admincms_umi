/**
 * title: 示例页面
 * Routes:
 *   - ./src/routes/list.js
 */

import { connect } from 'dva';
import { Table, Form } from '@components/comm';
import { columns, filterItems } from './_logic.js';
import useSearchTable from '@utils/useSearchTable';
import { NS } from './model';

const Page = ({ 
	 loading,
	 computedMatch: {
	     params
	   },
	   ...props
 }) => {
	const [tbProps, fmProps] = useSearchTable(props, NS, columns, filterItems, loading);
	return (
		<>
			<Form {...fmProps} />
			<Table {...tbProps} rowKey='id' selectionShowKey='name' />
		</>
	);
};

export default connect(sto => ({
	...sto[NS],
	loading: sto.loading.effects
}))(Page);
