import { getListData } from './service';

export const NS = 'list';

const defaultPagination = {
	current: 1,
	pageSize: 10,
	total: 0,
};

export default {
	namespace: NS,
	state: {
		text: NS,
		filterParams: {},
		dataSource: [],
		pagination: { ...defaultPagination },
	},
	subscriptions: {
		setup({ dispatch, history, ...props }) {
			// dispatch({
			// 	type: 'fetchData',
			// 	payload: {}
			// });
		},
	},

	effects: {
		*fetchData({ payload }, { call, put }) {
			yield put({
				type: 'save',
				payload: {
					dataSource: yield call(getListData, payload),
				},
			});
		}
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
				pagination: { ...defaultPagination },
				...payload,
			};
		},
	},
};
