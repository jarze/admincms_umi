import { useEffect } from 'react';
import router from 'umi/router';
import debounce from 'lodash.debounce';

export default (props, NS, editConfig = {}, loadingEffects) => {
	const {
		dispatch,
		itemInfo,
		computedMatch: { params: matchParams },
	} = props;

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
	}, [NS, dispatch, id, matchParams]);

	if (typeof editConfig.items === 'function') {
		editConfig.items = editConfig.items(props);
	}

	const onValuesChange = editConfig.onValuesChange && debounce((changedValues, allValues) => editConfig.onValuesChange(changedValues, allValues, props), 0.8e3);

	const formProps = {
		type: 'center',
		labelCol: { span: 6 },
		wrapperCol: { span: 16 },
		layout: 'horizontal',
		...editConfig,
		onValuesChange,
		onSubmit: (values) => {
			dispatch({
				type: `${NS}/editItem`,
				payload: {
					matchParams,
					...values
				},
				editId: id,
				callback: () => {
					router.goBack();
				}
			})
		},
		data: id && itemInfo,
		loading: loadingEffects[`${NS}/editItem`]
	}
	return [formProps];
};

