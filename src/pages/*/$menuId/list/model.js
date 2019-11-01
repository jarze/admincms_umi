import {
  getListData,
  deleteListItems,
  getItemInfo,
  editItem,
  actionItems,
  exportData,
  // getData,
} from './service';

export const NS = 'list';

const defaultPagination = {
  current: 1,
  pageSize: 50,
  total: 0,
};

export default {
  namespace: NS,
  state: {
    text: NS,

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
    setup({ dispatch, history, ...props }) {
      history.listen(location => {
        // console.log(history);
        window.scrollTo(0, 0);
      });
    },
  },

  effects: {
    // *fetchDataAuto({ payload, url }, { call, put }) {
    //   yield put({
    //     type: 'save',
    //     payload: yield call(getData, payload),
    //   });
    // },
    *fetchData({ payload }, { call, put }) {
      const { data, pageNum: current, pageSize, total, pages, ...others } = yield call(
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
            pages,
          },
          others,
        },
      });
    },
    *fetchItemInfo({ payload }, { call, put }) {
      const data = yield call(getItemInfo, payload);
      yield put({
        type: 'save',
        payload: { itemInfo: data || {} },
      });
    },
    *editItem({ payload, editId, callback }, { call, put, select }) {
      const res = yield call(editItem, payload);
      if (res !== undefined) {
        const { filterParams } = yield select(state => state[NS]);
        callback && callback();
        // 区分添加编辑， 添加刷新搜索参数|编辑只刷新当前页
        if (editId === 'add' || editId === undefined) {
          console.log('添加成功');
          yield put({
            type: 'restPageFilter',
            payload: {
              editId: null,
              preEditId: null,
            },
          });
        } else {
          console.log('编辑成功');
          yield put({
            type: 'save',
            payload: {
              editId: null,
              preEditId: editId,
              filterParams: { ...filterParams },
            },
          });
        }
      }
    },
    *deleteItem({ payload }, { call, put }) {
      const res = yield call(deleteListItems, payload);
      if (res !== undefined) {
        yield put({
          type: 'restPageFilter',
        });
      }
    },
    *actionItem({ payload, action }, { call, put, select }) {
      const { isResetPage, ...params } = payload;
      const res = yield call(actionItems, params, action);
      if (res !== undefined) {
        // 是否重置页面参数
        if (isResetPage) {
          yield put({
            type: 'restPageFilter',
          });
        } else {
          const { filterParams } = yield select(state => state[NS]);
          yield put({
            type: 'save',
            payload: {
              filterParams: { ...filterParams },
            },
          });
        }
      }
    },
    *exportData({ payload, callback }, { call, put }) {
      const res = yield call(exportData, payload, callback);
      if (res) {
        yield put({
          type: 'save',
          payload: { selectedRowKeys: [] },
        });
      }
    },
    // TODO: 切换菜单操作(缓存数据)
    *updateMatchParams({ matchParams = {} }, { call, put, select }) {
      if (!matchParams.menuId) return;
      const state = yield select(state => state[NS]);
      const { menuId } = state;
      if (menuId === matchParams.menuId) return;
      if (menuId === null) {
        yield put({
          type: 'save',
          payload: { menuId: matchParams.menuId },
        });
        return;
      }
      const { cached } = state;
      menuId && (cached[menuId] = { ...state, cached: {} });
      const data = cached[matchParams.menuId];

      yield put({
        type: 'restPageFilter',
        payload: { ...data, menuId: matchParams.menuId, cached: { ...cached } },
      });
      console.log(cached);
    },
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
        editId: null,
        itemInfo: {},
        ...payload,
      };
    },
  },
};
