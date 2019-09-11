
export const menuToRouteHandle = (menu, path) => {
	return { path: path || '/', routes: menuHandle(menu, path) };
}

const menuHandle = (data = [], pid) => {
	return data.map(item => {
		const { id, name, icon, model, children } = item;
		let va = pid ? `${pid}/${id}` : `/${id}`;
		let type = MODEL_TYPES[model] || '';
		let key = model ? (type ? `${va}/${model}/${type}` : `${va}/${model}`) : va;
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
}
