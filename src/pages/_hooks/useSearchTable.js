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
				pageNo: pagination.current || 1,
				pageSize: pagination.pageSize,
				matchParams,
				...payload,
				...otherFilterParams
			}
		});
	}

	const [updateFilterParams, handlePageChange, onValuesChange] = useMemo(() => {
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

		return [updateFilterParams, handlePageChange, onValuesChange];
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
