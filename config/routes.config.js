export default [
	{
		path: '/',
		component: '../layouts/index',
		routes: [
			{ path: '*/:cateId/:modelId/list', component: './list/index.js' },
		],
	}
];


