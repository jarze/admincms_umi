import { fetchMenu, fetchUserInfo } from '@/services/global'
import { menuToRouteHandle } from '@/utils/menuHandle'

export const NS = 'global'

export default {
  namespace: NS,
  state: {
    text: NS,
    user: {
      userId: '122432',
      userName: 'jarze',
    },
    menu: [],
    menuRoute: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type: 'fetchUserInfo',
      })
      // dispatch({
      //   type: 'fetchPrivileges',
      // });
      dispatch({
        type: 'fetchMenu',
      })
    },
  },

  effects: {
    *fetchMenu(_, { call, put }) {
      const data = yield call(fetchMenu)
      const menuRoute = menuToRouteHandle(data)
      yield put({
        type: 'save',
        payload: { menu: data || [], menuRoute },
      })
    },
    *fetchUserInfo(_, { put, call }) {
      yield put({
        type: 'save',
        payload: { user: yield call(fetchUserInfo) },
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
  },
}
