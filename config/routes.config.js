export default [
	{
		path: '/',
		component: '../layouts/index',
		routes: [
			{
				path: '*/:menuId/list/:tabKey?',
				component: './*/$menuId/list/index.js',
				Routes: ['./src/routes/list.js'],
			},
			{
				path: '*/:menuId/list/page/:id',
				component: './*/$menuId/list/page/$id.js',
				Routes: ['./src/routes/list.js'],
			},
			{
				path: '*/:menuId/list/edit/:id?',
				component: './*/$menuId/list/edit/$id$.js',
				Routes: ['./src/routes/list.js'],
			},
		],
	}
];


