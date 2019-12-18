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
import { NS as NormalListModel } from './model';


const Page = (props) => {
	const {
		editConfig,
		actions,
		isPush = false
	} = props;

	const [tbProps, fmProps, onItemAction] = useSearchTable(props);

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
			{!isPush && editConfig && <ModalEdit {...props} />}
		</Fragment>
	);
};

export default connect((sto, { NS = NormalListModel, otherModels = [] }) => ({
	...sto[NS],
	NS,
	loadingEffects: sto.loading.effects,
	...(otherModels || []).reduce((res, item) => ({ ...res, [item]: sto[item] }), {}),
}))(Page)

