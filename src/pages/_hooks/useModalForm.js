/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import debounce from 'lodash.debounce';

export default (props, NS, editConfig = {}, loadingEffects) => {
	const {
		dispatch,
		editId,
		itemInfo,
		computedMatch: { params: matchParams }
	} = props;

	useEffect(() => {
		if (editId && editId !== 'add') {
			dispatch({
				type: `${NS}/fetchItemInfo`,
				payload: {
					matchParams,
					id: editId
				}
			});
		} else {
			dispatch({
				type: `${NS}/save`,
				payload: {
					itemInfo: {}
				}
			});
		}
	}, [editId]);

	const onValuesChange = editConfig.onValuesChange && debounce((changedValues, allValues) => editConfig.onValuesChange(changedValues, allValues, props), 0.8e3);

	const modalProps = {
		title: editId !== 'add' ? '编辑' : '添加',
		visible: editId ? true : false,
		...editConfig,
		data: itemInfo,
		onValuesChange,
		onOk: (values) => {
			dispatch({
				type: `${NS}/editItem`,
				payload: {
					matchParams,
					id: editId !== 'add' ? editId : null,
					...values
				},
				editId
			});
		},
		onCancel: () => {
			dispatch({
				type: `${NS}/save`,
				payload: { editId: null }
			})
		},
		confirmLoading: loadingEffects[`${NS}/editItem`]
	}
	return [modalProps];
}
