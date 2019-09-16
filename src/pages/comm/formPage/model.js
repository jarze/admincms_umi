import { getPageData } from './service';

export const NS = 'page';

export default {
	namespace: NS,
	state: {
		text: NS,
		data: {}
	},

	effects: {
		*fetchData({ payload }, { call, put }) {
			yield put({
				type: 'save',
				payload: {
					data: yield call(getPageData, payload),
				},
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
	},
};
