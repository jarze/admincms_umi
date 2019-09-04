export default [
	{
		path: '/',
		component: '../layouts/index',
		routes: [
			{ path: '/user', redirect: '/user/login' },
			{ path: '/user/login', component: './user/login' },
		],
	}
];
