import { connect } from 'dva'
import { NS as NormalListModel } from './model'

export const connectList = connect((sto, { NS = NormalListModel, otherModels = [] }) => ({
  ...sto[NS],
  NS,
  loadingEffects: sto.loading.effects,
  ...(otherModels || []).reduce((res, item) => ({ ...res, [item]: sto[item] }), {}),
}))
