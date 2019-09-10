import { extendsListModel } from '@utils/modelHandle';
import { getListData } from './service';

export const NS = 'list';

export default extendsListModel({
	namespace: NS,
	state: {
	},
	subscriptions: {
	},
	effects: {
	},
	reducers: {
	},
}, getListData);
