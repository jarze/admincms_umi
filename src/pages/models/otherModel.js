import extendsListModel from '@/pages/_list/_models/list'
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
    // effects: {},
    // reducers: {},
  },
  // service,
)
