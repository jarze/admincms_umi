import { getMenuType } from '@config/page';

export const menuToRouteHandle = (menu, path) => {
	return { path: path || '/', routes: menuHandle(menu, path) };
}

const menuHandle = (data = [], pid) => {
	return data.map(item => {
		const { id, name, icon, children } = item;
		let va = pid ? `${pid}/${id}` : `/${id}`;
		let type = getMenuType(id) || '';
		let key = type && !children ? `${va}/${type}` : `${va}`;
		let unit = {
			id: id,
			key: key,
			name: name + '-' + id,
			path: key,
			icon: icon,
			// exact: true
		};
		children && (unit.children = menuHandle(children, va));
		return unit;
	});
};


