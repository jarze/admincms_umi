// export default [
// 	{
// 		path: '/',
// 		component: '../layouts/index',
// 		routes: [
// 			{ path: '/user', redirect: '/user/login' },
// 			{ path: '/user/login', component: './user/login' },
// 		],
// 	}
// ];

export default [{
	path: 'cms',
	component: '../layouts/index',
	routes: [{
		path: '*',
		name: 'cate',
		getComponent(nextState, cb) {
			const rout = '../pages/Example';
			import(rout).then(() => {
				cb(null, require(rout));
			});
		}
	}]
}];
