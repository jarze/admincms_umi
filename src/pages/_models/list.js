/*
 * @Autor: jarze
 * @Date: 2019-11-22 15:24:46
 * @Desc: 基础列表model 封装
 */

export const NS = 'list';

const defaultPagination = {
	current: 1,
	pageSize: 50,
	total: 0,
};

const listCommonModel = (service) => ({
	namespace: NS,
	state: {
		text: NS,

		menuId: null,

		// list
		filterParams: {},
		dataSource: [],
		pagination: { ...defaultPagination },
		selectedRowKeys: [],

		// item
		itemInfo: {},
		editId: null, // null | add / undefined :添加 | record.id:编辑

		preEditId: null,

		cached: {}, // 缓存数据
		others: {}, // 列表其他数据
	},
	subscriptions: {
		setup({ dispatch, history, ...props }) {
			history.listen(location => {
				// console.log(history);
				window.scrollTo(0, 0);
			});
		},
	},

	effects: {
		*fetchData({ payload }, { call, put }) {
			const { data, pageNum: current, pageSize, total, pages, ...others } = yield call(
				service.getListData,
				payload,
			);
			yield put({
				type: 'save',
				payload: {
					dataSource: data,
					pagination: {
						current,
						pageSize,
						total,
						pages,
					},
					others,
				},
			});
		},
		*fetchItemInfo({ payload }, { call, put }) {
			const data = yield call(service.getItemInfo, payload);
			yield put({
				type: 'save',
				payload: { itemInfo: data || {} },
			});
		},
		*editItem({ payload, editId, callback }, { call, put, select }) {
			const res = yield call(service.editItem, payload);
			if (res !== undefined) {
				const { filterParams } = yield select(state => state[NS]);
				callback && callback();
				// 区分添加编辑， 添加刷新搜索参数|编辑只刷新当前页
				if (editId === 'add' || editId === undefined) {
					yield put({
						type: 'restPageFilter',
						payload: {
							editId: null,
							preEditId: null,
						},
					});
				} else {
					yield put({
						type: 'save',
						payload: {
							editId: null,
							preEditId: editId,
							filterParams: { ...filterParams },
						},
					});
				}
			}
		},
		*deleteItem({ payload }, { call, put }) {
			const res = yield call(service.deleteListItems, payload);
			if (res !== undefined) {
				yield put({
					type: 'restPageFilter',
				});
			}
		},
		*actionItem({ payload, action }, { call, put, select }) {
			const { isResetPage, ...params } = payload;
			const res = yield call(service.actionItems, params, action);
			if (res !== undefined) {
				// 是否重置页面参数
				if (isResetPage) {
					yield put({
						type: 'restPageFilter',
					});
				} else {
					const { filterParams } = yield select(state => state[NS]);
					yield put({
						type: 'save',
						payload: {
							filterParams: { ...filterParams },
						},
					});
				}
			}
		},
		*exportData({ payload, callback }, { call, put }) {
			const res = yield call(service.exportData, payload, callback);
			if (res) {
				yield put({
					type: 'save',
					payload: { selectedRowKeys: [] },
				});
			}
		},
		*updateMatchParams({ matchParams = {} }, { call, put, select }) {
			if (!matchParams.menuId) return;
			const state = yield select(state => state[NS]);
			const { menuId } = state;
			if (menuId === matchParams.menuId) return;
			if (menuId === null) {
				yield put({
					type: 'save',
					payload: { menuId: matchParams.menuId },
				});
				return;
			}
			const { cached } = state;
			menuId && (cached[menuId] = { ...state, cached: {} });
			const data = cached[matchParams.menuId];

			yield put({
				type: 'restPageFilter',
				payload: { dataSource: [], ...data, menuId: matchParams.menuId, cached: { ...cached } },
			});
		},
	},

	reducers: {
		save(state, { payload }) {
			return {
				...state,
				...payload,
			};
		},
		/* 切换页面重置选择条件 */
		restPageFilter(state, { payload }) {
			return {
				...state,
				filterParams: {},
				selectedRowKeys: [],
				pagination: { ...defaultPagination },
				editId: null,
				itemInfo: {},
				...payload,
			};
		},
	}
});

/**
 * @description: 继承基础list model封装
 * @param {model} umi_model:object
 * @param {server} {deleteListItems, getItemInfo, editItem, actionItems, exportData,}:object
 * @return: model
 */
export default (model, service) => {
	let newModel = { ...model };
	let listModel = listCommonModel(service);
	Object.keys(listModel).forEach(key => {
		let va = listModel[key];
		if (typeof va === 'object') {
			newModel[key] = {
				...va,
				...model[key],
			};
		}
	});
	return listModel;
};
