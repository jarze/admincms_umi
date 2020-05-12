import { ListModel, ListService } from '../list-types'
import normalService, { combineServices } from './service.js'

const defaultPagination = {
  current: 1,
  pageSize: 50,
  total: 0,
}

function listCommonModel(service: ListService, NS = 'list'): ListModel {
  return {
    namespace: NS,
    state: {
      menuId: null,
      // list
      filterParams: {},
      dataSource: [],
      pagination: { ...defaultPagination },
      selectedRowKeys: [],
      // item
      itemInfo: {},
      editId: null, // null | add / undefined :添加 | record.id:编辑

      preEditId: null,

      cached: {}, // 缓存数据
      others: {}, // 列表其他数据
    },
    subscriptions: {
      setup({ history }) {
        history.listen(_ => {
          window.scrollTo(0, 0)
        })
      },
    },

    effects: {
      *fetchData({ payload }, { call, put, select }) {
        const { data, pageNum: current, pageSize, total, pages, ...others } = yield call(service, 'getListData', payload)
        // 列表复用model，更新数据前先校验menuId
        const { menuId } = yield select((state: { [x: string]: any }) => state[NS])
        if (menuId && menuId !== (payload.matchParams || {}).menuId) {
          return
        }
        yield put({
          type: 'save',
          payload: {
            dataSource: data,
            pagination: {
              current,
              pageSize: pageSize || defaultPagination.pageSize,
              total,
              pages,
            },
            others,
          },
        })
      },
      *fetchItemInfo({ payload }, { call, put }) {
        const data = yield call(service, 'getItemInfo', payload)
        yield put({
          type: 'save',
          payload: { itemInfo: data || {} },
        })
      },
      *editItem({ payload, editId, callback }, { call, put, select }) {
        const res = yield call(service, 'editItem', payload, editId)
        if (res !== undefined) {
          const { filterParams } = yield select((state: { [x: string]: any }) => state[NS])
          callback && callback(res)
          // 区分添加编辑， 添加刷新搜索参数|编辑只刷新当前页
          if (editId === 'add' || editId === undefined) {
            yield put({
              type: 'restPageFilter',
              payload: {
                editId: null,
                preEditId: null,
              },
            })
          } else {
            yield put({
              type: 'save',
              payload: {
                editId: null,
                preEditId: editId,
                filterParams: { ...filterParams },
              },
            })
          }
        }
      },
      *deleteItem({ payload, callback }, { call, put }) {
        const res = yield call(service, 'deleteListItems', payload)
        if (res !== undefined) {
          callback && callback(res)
          yield put({
            type: 'restPageFilter',
          })
        }
      },
      *actionItem({ payload, action, callback }, { call, put, select }) {
        const { isResetPage, ...params } = payload
        const res = yield call(service, 'actionItems', params, action)
        if (res !== undefined) {
          callback && callback(res)
          // 是否重置页面参数
          if (isResetPage) {
            yield put({
              type: 'restPageFilter',
            })
          } else {
            const { filterParams } = yield select((state: { [x: string]: any }) => state[NS])
            yield put({
              type: 'save',
              payload: {
                // 清空选中
                selectedRowKeys: [],
                filterParams: { ...filterParams },
              },
            })
          }
        }
      },
      *exportData({ payload, callback }, { call, put }) {
        const res = yield call(service, 'exportData', payload)
        if (res !== undefined) {
          callback && callback(res)
          yield put({
            type: 'save',
            payload: { selectedRowKeys: [] },
          })
        }
      },
      *updateMatchParams({ matchParams = {} }, { put, select }) {
        if (!matchParams.menuId) return
        const state = yield select((state: { [x: string]: any }) => state[NS])
        const { menuId } = state
        if (menuId === matchParams.menuId) return
        if (menuId === null) {
          yield put({
            type: 'save',
            payload: { menuId: matchParams.menuId },
          })
          return
        }
        let { cached = {} } = state
        menuId && (cached = { ...cached, [menuId]: { ...state, cached: {} } })
        const data = cached[matchParams.menuId]
        yield put({
          type: 'restPageFilter',
          payload: {
            dataSource: [],
            itemInfo: {},
            ...data,
            menuId: matchParams.menuId,
            cached: { ...cached },
          },
        })
      },
    },

    reducers: {
      save(state, { payload }: any) {
        return {
          ...state,
          ...payload,
        }
      },
      /* 切换页面重置选择条件 */
      restPageFilter(state, { payload }: any) {
        return {
          ...state,
          filterParams: {},
          selectedRowKeys: [],
          pagination: { ...defaultPagination },
          editId: null,
          ...payload,
        }
      },
    },
  }
}

export default (model: ListModel, service = normalService) => {
  let newModel = { ...model }
  let listModel: ListModel
  if (typeof service === 'object') {
    listModel = listCommonModel(combineServices(service), newModel.namespace)
  } else {
    listModel = listCommonModel(service as ListService, newModel.namespace)
  }
  Object.keys(listModel).forEach(key => {
    let va = listModel[key]
    if (typeof va === 'object') {
      newModel[key] = { ...va, ...model[key] }
    }
  })
  return newModel
}
