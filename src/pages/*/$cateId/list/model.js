import { getListData, deleteListItems, getItemInfo, editItem } from './service';
// import router from 'umi/router';

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

		// list
		filterParams: {},
		dataSource: [],
		pagination: { ...defaultPagination },
		selectedRowKeys: [],

		// item
		itemInfo: {},
		editId: null, // null | add | record.id
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
		*editItem({ payload }, { call, put, select }) {
			const res = yield call(
				editItem,
				payload,
			);

			if (res !== undefined) {
				const { filterParams, editId } = yield select(state => state[NS]);
				// router.goBack();
				// 区分添加编辑， 添加刷新搜索参数|编辑只刷新当前页
				if (editId) {
					yield put({
						type: 'save',
						payload: {
							editId: null,
							filterParams: { ...filterParams }
						},
					});
				} else {
					yield put({
						type: 'restPageFilter',
						payload: {
							editId: null
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
