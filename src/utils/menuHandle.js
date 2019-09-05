
export const menuToRouteHandle = (menu, path) => {
	return { path: path || '/', routes: menuHandle(menu, path) };
}

const menuHandle = (data = [], pid) => {
	return data.map(item => {
		let path = item.url;
		let va = pid ? `${pid}/${path}` : `/${path}`;
		let unit = {
			id: item.id,
			key: va,
			name: item.name,
			path: va,
			icon: item.icon,
			// exact: true
		};
		item.children && (unit.children = menuHandle(item.children, va));
		return unit;
	});
};
