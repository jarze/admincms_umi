
export const menuToRouteHandle = (menu, path) => {
	return { path: path || '/', routes: menuHandle(menu, path) };
}

const menuHandle = (data = [], pid) => {
	return data.map(item => {
		const { id, name, icon, children } = item;
		let va = pid ? `${pid}/${id}` : `/${id}`;
		let type = MODEL_TYPES[id] || '';
		let key = type && !children ? `${va}/${type}` : `${va}`;
		let unit = {
			id: id,
			key: key,
			name: name,
			path: key,
			icon: icon,
			// exact: true
		};
		children && (unit.children = menuHandle(children, va));
		return unit;
	});
};

const MODEL_TYPES = {
	'11': 'list',
	'22': 'list',
	'5': 'list',
	'6': 'list',
	'8': 'list'
}
