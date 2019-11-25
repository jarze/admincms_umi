/**
 * Routes:
 *   - ./src/routes/list.js
 */

/* eslint-disable react-hooks/exhaustive-deps */

import { Fragment } from 'react';
import { connect } from 'dva';
import { SearchList } from '@components/comm';
import ModalEdit from './_components/ModalEdit';
import useSearchTable from '@/pages/_list/hooks/useSearchTable';
import { NS } from './model';


const Page = ({
	loading,
	tableConfig, // table定义
	formConfig, // search定义
	editConfig,
	otherFilterParams,
	children,
	actions,
	...props
}) => {
	const { isPush } = tableConfig || {};

	const [tbProps, fmProps, onItemAction] = useSearchTable(
		props,
		NS,
		tableConfig,
		formConfig,
		loading,
		otherFilterParams,
	);

	return (
		<Fragment>
			<SearchList fmProps={fmProps} tbProps={tbProps}>
				{actions && (
					<Fragment>
						<div>{actions(onItemAction, props)}</div>
						<br />
					</Fragment>
				)}
			</SearchList>
			{!isPush && editConfig && <ModalEdit {...{ NS, editConfig, loading, ...props }} />}
		</Fragment>
	);
};

export default connect(sto => ({
	...sto[NS],
	loading: sto.loading.effects,
}))(Page);

