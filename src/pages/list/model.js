import { getListData } from './service';

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
		filterParams: {},
		dataSource: [],
		pagination: { ...defaultPagination },
		selectedRowKeys: []
	},
	subscriptions: {
		// setup({ dispatch, history, ...props }) {

		// 	history.listen(location => {
		// 		// 处理网管注销跳转/logout代理问题
		// 		console.log(location, '------list')

		// 	});
		// },
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
				selectedRowKeys: [],
				pagination: { ...defaultPagination },
				// dataSource: null,
				...payload,
			};
		},
	},
};
