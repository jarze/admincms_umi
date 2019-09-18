import { getListData, deleteListItems, getItemInfo, editItem, actionItems } from './service';

export const NS = 'list';

const defaultPagination = {
	current: 1,
	pageSize: 20,
	total: 0,
};

export default {
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
	},
	subscriptions: {
		setup({ dispatch, history, ...props }) {
			history.listen(location => {
			});
		},
	},

	effects: {
		*fetchData({ payload }, { call, put }) {
			const { data, pageNum: current, pageSize, total, pages } = yield call(
				getListData,
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
						pages
					},
				},
			});
		},
		*fetchItemInfo({ payload }, { call, put }) {
			const data = yield call(
				getItemInfo,
				payload,
			);
			yield put({
				type: 'save',
				payload: {
					itemInfo: data || {}
				},
			});
		},
		*editItem({ payload, editId, callback }, { call, put, select }) {
			const res = yield call(
				editItem,
				payload,
			);

			if (res !== undefined) {
				const { filterParams } = yield select(state => state[NS]);
				callback && callback();
				// 区分添加编辑， 添加刷新搜索参数|编辑只刷新当前页
				if (editId === 'add' || editId === undefined) {
					console.log('添加成功');
					yield put({
						type: 'restPageFilter',
						payload: {
							editId: null
						},
					});
				} else {
					console.log('编辑成功');
					yield put({
						type: 'save',
						payload: {
							editId: null,
							filterParams: { ...filterParams }
						},
					});
				}
			}
		},
		*deleteItem({ payload }, { call, put }) {
			const res = yield call(
				deleteListItems,
				payload,
			);
			if (res !== undefined) {
				yield put({
					type: 'restPageFilter'
				});
			}
		},
		*actionItem({ payload, action }, { call, put }) {
			const res = yield call(
				actionItems,
				payload,
				action
			);
			if (res !== undefined) {
				yield put({
					type: 'restPageFilter'
				});
			}
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
	},
};
