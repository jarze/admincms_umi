import { getMenuType, getTabs } from '@config/page';

export const menuToRouteHandle = (menu, path) => {
	return { path: path || '/', routes: menuHandle(menu, path) };
}

const menuHandle = (data = [], pid) => {
	return data.map(item => {
		const { id, name, icon, children } = item;
		let va = pid ? `${pid}/${id}` : `/${id}`;
		let type = getMenuType(id);
		let key = type ? `${va}/${type}` : `${va}`;

		let unit = {
			id: id,
			key: key,
			name: name + '-' + id,
			path: key,
			icon: icon,
		};
		children && (unit.children = menuHandle(children, va));
		if (children) {
			unit.children = menuHandle(children, va);
		} else {
			if (EXTRA_ROUTES[id]) {
				unit.hideChildrenInMenu = true;
				unit.children = menuHandle(EXTRA_ROUTES[String(id)], key);
			}
		}
		return unit;
	});
};

// menu 之外的深层级页面（不显示在menu,会显示在面包屑上 {pid: [{name, children}]}
const EXTRA_ROUTES = {
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


