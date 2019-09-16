/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

export default ({ dispatch, editId, itemInfo, computedMatch: { params: matchParams } }, NS, editItems, loadingEffects) => {

	const setEditId = (id) => {
		dispatch({
			type: `${NS}/save`,
			payload: { editId: id }
		})
	}

	useEffect(() => {
		if (editId && editId !== 'add') {
			dispatch({
				type: `${NS}/fetchItemInfo`,
				payload: {
					matchParams,
					id: editId
				}
			});
		}
	}, [editId]);

	const modalProps = {
		title: editId !== 'add' ? '编辑' : '添加',
		visible: editId ? true : false,
		items: editItems,
		data: itemInfo,
		onOk: (values, cb) => {
			dispatch({
				type: `${NS}/editItem`,
				payload: {
					matchParams,
					id: editId !== 'add' ? editId : null,
					...values
				}
			});
			setEditId(null);
			cb();
		},
		onCancel: () => {
			setEditId(null);
		},
		confirmLoading: loadingEffects[`${NS}/editItem`]
	}
	return [modalProps, setEditId];
}
