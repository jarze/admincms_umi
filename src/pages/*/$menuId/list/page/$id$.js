/**
 * Routes:
 *   - ./src/routes/list.js
 */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'dva';
import { SinglePage } from '@components/comm';
import { NS as NormalListModel } from '../model';

const Page = ({
	dispatch,
	computedMatch: { params: matchParams },
	pageConfig,
	NS,
	...props
}) => {
	useEffect(() => {
		dispatch({
			type: `${NS}/fetchItemInfo`,
			payload: {
				matchParams
			}
		});
	}, []);

	if (pageConfig && (typeof pageConfig.items === 'function')) {
		pageConfig.items = pageConfig.items(props);
	}
	return <SinglePage {...props} {...pageConfig} />;
};

export default connect((sto, { NS = NormalListModel }) => ({
	...sto[NS],
	NS,
	loading: sto.loading.effects,
}))(Page);