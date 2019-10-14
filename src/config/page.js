// 定义属于list的menus
const LIST_MENUS = ['2', '5', '7', '15', '9'];

// 获取menu类型
export const getMenuType = (menuId) => {
	if (LIST_MENUS.includes(menuId)) {
		return 'list';
	}
	return null;
}

const MENU_TABS = {
	'7': [{
		key: '1',
		tab: 'tab1',
	}, {
		key: '2',
		tab: 'tab2',
	}, {
		key: '3',
		tab: 'tab3',
	}]
};
export const getTabs = (menuId) => {
	return MENU_TABS[menuId];
}