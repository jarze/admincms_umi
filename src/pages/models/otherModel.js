import extendsListModel from '@/pages/_list/_models/list'
// import { editItem } from '@/services/global'
export const NS = 'otherModel'

export default extendsListModel(
  {
    namespace: NS,
    state: {
      filterParams: { name: 'aaa' },
    },
    // subscriptions: {
    // 	setup({ dispatch, history, ...props }) { },
    // },
    effects: {
      // *editItem({ payload, editId, callback }, { call, put, select }) {
      //   const { matchParams, ...params } = payload
      //   const res = yield call(editItem, params, matchParams, editId)
      //   if (res !== undefined) {
      //     const { filterParams } = yield select(state => state[NS])
      //     callback && callback(res)
      //     // 区分添加编辑， 添加刷新搜索参数|编辑只刷新当前页
      //     if (editId === 'add' || editId === undefined) {
      //       yield put({
      //         type: 'restPageFilter',
      //         payload: {
      //           editId: null,
      //           preEditId: null,
      //         },
      //       })
      //     } else {
      //       yield put({
      //         type: 'save',
      //         payload: {
      //           editId: null,
      //           preEditId: editId,
      //           filterParams: { ...filterParams },
      //         },
      //       })
      //     }
      //   }
      // },
    },
    // reducers: {},
  },
  // service,
)
