import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Table, Form } from '@components/comm';
import { columns, filterItems } from './_logic.js';
import Link from 'umi/link';
import { NS } from './model';

const Page = ({ loading, dispatch, text, dataSource, filterParams, ...props }) => {
	useEffect(() => {
		dispatch({
			type: `${NS}/fetchData`,
			payload: filterParams
		});
	}, [dispatch, filterParams]);

	const updateFilterParams = (params) => {
		dispatch({
			type: `${NS}/save`,
			payload: { filterParams: params }
		})
	}

	const tbProps = {
		columns,
		dataSource,
	}

	const fmProps = {
		items: filterItems,
		data: filterParams,
		onSubmit: updateFilterParams,
		onReset: updateFilterParams,
	}
	return (
		<>
			<Form {...fmProps} />
			<Table {...tbProps} />
		</>
	);
};

export default connect(sto => ({
	...sto[NS],
	loading: sto.loading.global
}))(Page);
