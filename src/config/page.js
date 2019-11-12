// 定义属于list的menus
const LIST_MENUS = ['2', '5', '7', '15',];
const PAGE_MENUS = ['3'];

// 获取menu类型
export const getMenuType = (menuId) => {
	if (LIST_MENUS.includes(menuId)) {
		return 'list';
	} else if (PAGE_MENUS.includes(menuId)) {
		return 'list/page';
	}
	return null;
}

//{pid: [] }
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

// menu 之外的深层级页面（不显示在menu,会显示在面包屑上 {pid: [{name, children}]}
export const EXTRA_ROUTES = {
	//example
	"7": [{
		id: 'aa',
		name: '添加设备',
		children: [{
			id: 'das',
			name: '详情查看',
		}]
	}]
};