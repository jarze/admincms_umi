import { getText } from './service';

export const NS = 'example';

export default {
  namespace: NS,
  state: {
    text: NS,
  },

  effects: {
    *fetch(_, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          text: yield call(getText),
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
