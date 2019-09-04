/*
 * @Autor: jarze
 * @Date: 2019-08-29 10:00:23
 * @Desc: Do not edit
 */

export const dva = {
	config: {
		onError(err: ErrorEvent) {
			err.preventDefault();
			console.error(err.message);
		},
	},
};


// export function patchRoutes(routes) {
// 	routes[0].unshift({
// 		path: '/foo',
// 		component: require('./routes/foo').default,
// 	});
// }

// 渲染应用之前做权限校验，不通过则跳转到登录页
// export function render(oldRender) {
//   setTimeout(oldRender, 1000);
// }


// export function onRouteChange({ location, routes, action }) {
//   bacon(location.pathname);
// }
