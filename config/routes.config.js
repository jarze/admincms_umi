export default [
	{
		path: '/',
		component: '../layouts/index',
		routes: [
			{
				path: '*/:cateId/list',
				component: './comm/list/index.js',
				Routes: ['./src/routes/list.js'],
			},
			{
				path: '*/:cateId/list/page/:id?',
				component: './comm/infoPage/index.js',
				Routes: ['./src/routes/list.js'],
			},
			{
				path: '*/:cateId/list/edit/:id?',
				component: './comm/formPage/index.js',
				Routes: ['./src/routes/list.js'],
			},
		],
	}
];


