import listModel from '@/pages/comm/model';

export const defaultPagination = {
	current: 1,
	pageSize: 20,
	total: 0,
};

const {
	state: listState,
	effects: listEffects,
	reducers: listReducers
} = listModel;

/* 继承list model */

/**
 * @description:
 * @param 0 model 本身
 * @param 1 获取列表方法
 * @return:
 */
export const extendsListModel = ({
	state,
	effects,
	reducers,
	...props
}, getListData) => {
	return {
		state: {
			...listState,
			...state
		},
		effects: {
			...listEffects,
			*fetchData({ payload }, { call, put }) {
				if (!getListData) return;
				const { data, pageNum: current, pageSize, total, pages } = yield call(
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
							pages
						},
					},
				});
			},
			...effects
		},
		reducers: {
			...listReducers,
			...reducers
		},
		...props
	};
}
