export default [
	{
		path: '/',
		component: '../layouts/index',
		routes: [
			{
				path: '*/:menuId/list',
				component: './comm/list/index.js',
				Routes: ['./src/routes/list.js'],
			},
			{
				path: '*/:menuId/list/page/:id?',
				component: './comm/infoPage/index.js',
				Routes: ['./src/routes/list.js'],
			},
			{
				path: '*/:menuId/list/edit/:id?',
				component: './comm/formPage/index.js',
				Routes: ['./src/routes/list.js'],
			},
		],
	}
];


