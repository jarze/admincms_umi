/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import router from 'umi/router';

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

export default (props, NS, tableConfig = {}, formConfig = {}, loadingEffects, otherFilterParams) => {

	const {
		dispatch,
		dataSource,
		filterParams,
		pagination,
		selectedRowKeys,
		computedMatch: { params: matchParams }
	} = props;

	const fetchUrl = `${NS}/fetchData`;

	const { isPush } = tableConfig;

	// 请求列表数据
	useEffect(() => {
		fetchData();
	}, [filterParams, otherFilterParams]);

	// 切换匹配路由 不同目录重置参数
	useEffect(() => {
		if (props.menuId === matchParams.menuId) return;
		dispatch({
			type: `${NS}/restPageFilter`,
			payload: { menuId: matchParams.menuId }
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

		const onItemAction = (type, payload = {}) => {
			let id = payload[tableConfig.rowKey];
			switch (type) {
				case 'detail':
					router.push(`./list/page/${id}`);
					break;
				case 'add':
					if (isPush) {
						router.push(`./list/edit`);
					} else {
						dispatch({
							type: `${NS}/save`,
							payload: { editId: 'add', matchParams }
						})
					}
					break;
				case 'edit':
					if (isPush) {
						router.push(`./list/edit/${id}`);
					} else {
						dispatch({
							type: `${NS}/save`,
							payload: { editId: id, itemInfo: payload, matchParams }
						})
					}
					break;
				case 'delete':
					dispatch({
						type: `${NS}/deleteItem`,
						payload: { ...payload, matchParams }
					})
					break;
				default:
					dispatch({
						type: `${NS}/actionItem`,
						payload: { ...payload, matchParams },
						action: type
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
		tableConfig.columns = tableConfig.columns(onItemAction, props);
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

	return [tbProps, fmProps, onItemAction];
}
