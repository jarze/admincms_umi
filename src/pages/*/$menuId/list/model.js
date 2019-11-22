import * as service from './service';
import extendsListModel from '@/pages/_models/list.js';
export const NS = 'list';

export default extendsListModel({
	namespace: NS,
	// state: {},
	// subscriptions: {
	// 	setup({ dispatch, history, ...props }) { },
	// },
	// effects: {},
	// reducers: {},
}, service);

