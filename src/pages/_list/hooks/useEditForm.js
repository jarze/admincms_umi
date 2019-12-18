import { useEffect, useCallback } from 'react';
import router from 'umi/router';
import debounce from 'lodash.debounce';

export default ({ NS, formConfig = {}, loadingEffects = {}, ...props }) => {
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
					matchParams,
				},
			});
		}
	}, [NS, dispatch, id, matchParams]);

	const handleValuesChange = useCallback(
		formConfig.onValuesChange &&
		debounce(
			(changedValues, allValues) => formConfig.onValuesChange(changedValues, allValues, props),
			0.8e3,
		),
		[],
	);

	const onValuesChange = formConfig.onValuesChange && handleValuesChange;

	const { handleFormValues, items, ...fmProps } = formConfig;

	const formProps = {
		layout: 'horizontal',
		...fmProps,
		items: typeof items === 'function' ? items(props) : items,
		onValuesChange,
		onSubmit: values => {
			let va = handleFormValues ? handleFormValues(values) : values;
			if (va === null) return;
			dispatch({
				type: `${NS}/editItem`,
				payload: {
					matchParams,
					...va,
				},
				editId: id,
				callback: () => {
					router.goBack();
				},
			});
		},
		data: id && itemInfo,
		loading: !!loadingEffects[`${NS}/editItem`],
		fetchLoading: !!loadingEffects[`${NS}/fetchItemInfo`],
		submitCol: 24,
	};
	return [formProps];
};
