/*
 * @Autor: jarze
 * @Date: 2019-11-22 15:24:46
 * @Desc: 基础列表model 封装
 */

import normalService, { combineServices } from './service'

// 定义service时方法名
//获取列表
export const SERVICE_FETCH_LIST = 'getListData'
//获取单个item数据
export const SERVICE_FETCH_ITEM_INFO = 'getItemInfo'
//添加编辑item
export const SERVICE_EDIT_ITEM = 'editItem'
//删除item
export const SERVICE_DELETE_LIST_ITEMS = 'deleteListItems'
//其他操作
export const SERVICE_ACTION_ITEMS = 'actionItems'
//导出item
export const SERVICE_EXPORT_DATA = 'exportData'

const defaultPagination = {
	current: 1,
	pageSize: 50,
	total: 0,
}

const listCommonModel = (service, NS = 'list') => ({
	namespace: NS,
	state: {
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
				window.scrollTo(0, 0)
			})
		},
	},

	effects: {
		*fetchData({ payload }, { call, put }) {
			const { data, pageNum: current, pageSize, total, pages, ...others } = yield call(
				service,
				SERVICE_FETCH_LIST,
				payload
			)
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
			})
		},
		*fetchItemInfo({ payload }, { call, put }) {
			const data = yield call(service, SERVICE_FETCH_ITEM_INFO, payload)
			yield put({
				type: 'save',
				payload: { itemInfo: data || {} },
			})
		},
		*editItem({ payload, editId, callback }, { call, put, select }) {
			const res = yield call(service, SERVICE_EDIT_ITEM, payload, editId)
			if (res !== undefined) {
				const { filterParams } = yield select(state => state[NS])
				callback && callback()
				// 区分添加编辑， 添加刷新搜索参数|编辑只刷新当前页
				if (editId === 'add' || editId === undefined) {
					yield put({
						type: 'restPageFilter',
						payload: {
							editId: null,
							preEditId: null,
						},
					})
				} else {
					yield put({
						type: 'save',
						payload: {
							editId: null,
							preEditId: editId,
							filterParams: { ...filterParams },
						},
					})
				}
			}
		},
		*deleteItem({ payload }, { call, put }) {
			const res = yield call(service, SERVICE_DELETE_LIST_ITEMS, payload)
			if (res !== undefined) {
				yield put({
					type: 'restPageFilter',
				})
			}
		},
		*actionItem({ payload, action, callback }, { call, put, select }) {
			const { isResetPage, ...params } = payload
			const res = yield call(service, SERVICE_ACTION_ITEMS, params, action)
			if (res !== undefined) {
				callback && callback(res)
				// 是否重置页面参数
				if (isResetPage) {
					yield put({
						type: 'restPageFilter',
					})
				} else {
					const { filterParams } = yield select(state => state[NS])
					yield put({
						type: 'save',
						payload: {
							// 清空选中
							selectedRowKeys: [],
							filterParams: { ...filterParams },
						},
					})
				}
			}
		},
		*exportData({ payload, callback }, { call, put }) {
			const res = yield call(service, SERVICE_EXPORT_DATA, payload)
			if (res) {
				callback && callback()
				yield put({
					type: 'save',
					payload: { selectedRowKeys: [] },
				})
			}
		},
		*updateMatchParams({ matchParams = {} }, { call, put, select }) {
			if (!matchParams.menuId) return
			const state = yield select(state => state[NS])
			const { menuId } = state
			if (menuId === matchParams.menuId) return
			if (menuId === null) {
				yield put({
					type: 'save',
					payload: { menuId: matchParams.menuId },
				})
				return
			}
			let { cached = {} } = state
			menuId && (cached = { dataSource: [], ...cached, [menuId]: { ...state, cached: {} } })
			const data = cached[matchParams.menuId]
			yield put({
				type: 'restPageFilter',
				payload: {
					dataSource: [],
					itemInfo: {},
					...data,
					menuId: matchParams.menuId,
					cached: { ...cached },
				},
			})
		},
	},

	reducers: {
		save(state, { payload }) {
			return {
				...state,
				...payload,
			}
		},
		/* 切换页面重置选择条件 */
		restPageFilter(state, { payload }) {
			return {
				...state,
				filterParams: {},
				selectedRowKeys: [],
				pagination: { ...defaultPagination },
				editId: null,
				// itemInfo: {},
				...payload,
			}
		},
	},
})

/**
 * @description: 继承基础list model封装
 * @param {model} umi_model:object
 * @param {server} {deleteListItems, getItemInfo, editItem, actionItems, exportData,}:object
 * @return: model
 */
export default (model, service = normalService) => {
	let newModel = { ...model }
	let listModel
	if (typeof service === 'object') {
		listModel = listCommonModel(combineServices(service), newModel.namespace)
	} else {
		listModel = listCommonModel(service, newModel.namespace)
	}
	Object.keys(listModel).forEach(key => {
		let va = listModel[key]
		if (typeof va === 'object') {
			newModel[key] = {
				...va,
				...model[key],
			}
		}
	})
	return listModel
}
