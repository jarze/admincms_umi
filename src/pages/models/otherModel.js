
import * as service from '@/pages/_list/services/55.js';

import extendsListModel from '@/pages/_list/_models/list.js';
export const NS = 'otherModel';

export default extendsListModel({
	namespace: NS,
	// state: {},
	// subscriptions: {
	// 	setup({ dispatch, history, ...props }) { },
	// },
	// effects: {},
	// reducers: {},
}, service);

