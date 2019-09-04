import { fetchMenu } from '@services/global';
import { menuToRouteHandle } from "@utils/menuHandle";

export const NS = 'global';

export default {
	namespace: NS,
	state: {
		text: NS,
		user: {
			userId: '122432',
			name: 'jarze'
		},
		menu: [],
		menuRoute: {}
	},
	subscriptions: {
		setup({ dispatch, history }) {
			// dispatch({
			//   type: 'fetchUserInfo',
			// });
			// dispatch({
			//   type: 'fetchPrivileges',
			// });
			dispatch({
				type: 'fetchMenu',
			});
		},
	},

	effects: {
		*fetchMenu(_, { call, put }) {
			const data = yield call(fetchMenu);
			const menuRoute = menuToRouteHandle(data);
			console.log(menuRoute);
			yield put({
				type: 'save',
				payload: { menu: data || [], menuRoute },
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
