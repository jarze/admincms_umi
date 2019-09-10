/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

/**
 * @description: 带搜索项Table页面
 * @param 0 model【list】sto + dispatch
 * @param 1 model name
 * @param 2 table columns
 * @param 3 search items
 * @param 4 umi loading.effects
 * @return: [tbProps: table props, fmProps: searchForm props]
 */
export default ({
	dispatch,
	dataSource,
	filterParams,
	pagination,
	selectedRowKeys,
	...props
}, NS, columns, filterItems, loadingEffects) => {
	const fetchUrl = `${NS}/fetchData`;

	useEffect(() => {
		dispatch({
			type: fetchUrl,
			payload: {
				...filterParams,
				pageNo: pagination.current,
				pageSize: pagination.pageSize,
			}
		});
	}, [filterParams]);

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
		dispatch({
			type: fetchUrl,
			payload: {
				...filterParams,
				pageNo,
				pageSize
			},
		});
	};

	// const onValuesChange=(changedValues, allValues) => {
	// 	console.log(changedValues, allValues, '----onValuesChange');
	// }

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

	const tbProps = {
		columns,
		dataSource,
		loading: loadingEffects[fetchUrl],
		pagination: {
			...pagination,
			onChange: handlePageChange,
		},
		rowSelection
	}

	const fmProps = {
		items: filterItems,
		data: filterParams,
		onSubmit: updateFilterParams,
		onReset: updateFilterParams,
		// onValuesChange
	}
	return [tbProps, fmProps];
}
