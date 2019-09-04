import { fetchMenu } from '@services/global';

export const NS = 'global';

export default {
	namespace: NS,
	state: {
		text: NS,
		user: {
			userId: '122432',
			name: 'jarze'
		},
		menu: []
	},

	effects: {
		*fetch(_, { call, put }) {
			yield put({
				type: 'save',
				payload: {
					menu: yield call(fetchMenu),
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
