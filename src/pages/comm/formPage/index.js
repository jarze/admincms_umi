/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'dva';
import { NS } from '../model';
import { Form } from '@components/comm';

const Page = ({
	dispatch,
	itemInfo,
	computedMatch: { params: matchParams },
	editItems,
	...props
}) => {
	const { id } = matchParams;
	useEffect(() => {
		if (id) {
			dispatch({
				type: `${NS}/fetchItemInfo`,
				payload: {
					matchParams
				}
			});
		}
	}, [id]);

	const formProps = {
		type: 'normal',
		col: 24,
		labelCol: { span: 6 },
		wrapperCol: { span: 16 },
		layout: 'horizontal',
		items: editItems,
		onSubmit: (values) => {
			console.log(values);
			dispatch({
				type: `${NS}/editItem`,
				payload: {
					matchParams,
					...values
				}
			})
		},
		data: id && itemInfo
	}
	return <Form {...formProps} />;
};

export default connect(sto => ({
	...sto[NS],
	loading: sto.loading.global
}))(Page);
