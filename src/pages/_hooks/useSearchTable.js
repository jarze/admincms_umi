/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';

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
}, NS, tableConfig, filterItems, loadingEffects, otherFilterParams) => {
	const fetchUrl = `${NS}/fetchData`;

	useEffect(() => {
		fetchData();
	}, [filterParams]);

	// 切换匹配路由重置参数
	useEffect(() => {
		dispatch({
			type: `${NS}/restPageFilter`
		});
	}, [matchParams]);

	const fetchData = (payload) => {
		dispatch({
			type: fetchUrl,
			payload: {
				...filterParams,
				pageNo: pagination.current,
				pageSize: pagination.pageSize,
				matchParams,
				...payload,
				...otherFilterParams
			}
		});
	}

	const [updateFilterParams, handlePageChange] = useMemo(() => {
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
		return [updateFilterParams, handlePageChange];
	}, [NS]);

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
		...tableConfig,
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
