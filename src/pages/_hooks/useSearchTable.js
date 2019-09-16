/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

/**
 * @description: 带搜索项Table页面
 * @param 0 model【list】sto + dispatch
 * @param 1 model name | string
 * @param 2 table columns | []
 * @param 3 search items | []
 * @param 4 umi loading.effects
 * @param 5 {} 	其他列表参数
 * @return: [tbProps: table props, fmProps: searchForm props]
 */

export default ({
	dispatch,
	dataSource,
	filterParams,
	pagination,
	selectedRowKeys,
	computedMatch: { params: matchParams },
	...props
}, NS, tableConfig = {}, formConfig = {}, loadingEffects, otherFilterParams) => {

	const fetchUrl = `${NS}/fetchData`;

	useEffect(() => {
		fetchData();
	}, [filterParams, otherFilterParams]);

	// TODO: 切换匹配路由重置参数
	// useEffect(() => {
	// 	dispatch({
	// 		type: `${NS}/restPageFilter`
	// 	});
	// 	console.log('restPageFilter', '---------------', matchParams)
	// }, [matchParams]);

	const fetchData = (payload) => {
		dispatch({
			type: fetchUrl,
			payload: {
				...filterParams,
				pageNo: pagination.current || 1,
				pageSize: pagination.pageSize,
				matchParams,
				...payload,
				...otherFilterParams
			}
		});
	}

	const [updateFilterParams, handlePageChange, onValuesChange, onItemAction] = useMemo(() => {
		const updateFilterParams = (payload) => {
			dispatch({
				type: `${NS}/save`,
				payload: {
					filterParams: payload,
					pagination: {
						...pagination,
						current: 1
					}
				},
			})
		}

		const handlePageChange = (pageNo, pageSize) => {
			fetchData({ pageNo, pageSize });
		};

		const onValuesChange = debounce((changedValues, allValues) => {
			updateFilterParams(allValues);
		}, 0.8e3);

		const onItemAction = (type, payload) => {
			switch (type) {
				case 'edit':
					dispatch({
						type: `${NS}/save`,
						payload: { editId: payload[tableConfig.rowKey], itemInfo: payload }
					})

					break;
				case 'delete':
					dispatch({
						type: `${NS}/deleteItem`,
						payload: { editId: payload[tableConfig.rowKey] }
					})
					break;
				default:
					dispatch({
						type: `${NS}/${type}Item`,
						payload: payload
					})
					break;
			}
		}
		return [updateFilterParams, handlePageChange, onValuesChange, onItemAction];
	}, [NS]);

	if (formConfig.onValuesChange === true) {
		formConfig.onValuesChange = onValuesChange;
	}

	const rowSelection = {
		selectedRowKeys: selectedRowKeys,
		onChange: rowKeys => {
			dispatch({
				type: `${NS}/save`,
				payload: {
					selectedRowKeys: rowKeys
				},
			})
		},
	}

	if (typeof tableConfig.columns === 'function') {
		tableConfig.columns = tableConfig.columns(onItemAction);
	}

	const tbProps = {
		rowSelection,
		dataSource,
		loading: loadingEffects[fetchUrl],
		pagination: {
			...pagination,
			onChange: handlePageChange,
		},
		...tableConfig
	}

	const fmProps = {
		data: filterParams,
		onSubmit: updateFilterParams,
		onReset: updateFilterParams,
		...formConfig
	}
	return [tbProps, fmProps];
}
