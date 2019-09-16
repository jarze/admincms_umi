export default [
	{
		path: '/',
		component: '../layouts/index',
		routes: [
			{
				path: '*/:cateId/:modelId/list',
				component: './comm/list/index.js',
				Routes: ['./src/routes/list.js'],
				// routes: [
				// 	{
				// 		path: '*/:cateId/:modelId/list/add',
				// 		component: './list/add.js',
				// 		//Routes: ['./src/routes/listAction.js', './src/routes/list.js'],
				// 	},
				// ],
			},
			{
				path: '*/:cateId/:modelId/list/page/:id',
				component: './comm/formPage/index.js',
				Routes: ['./src/routes/list.js'],
			},
		],
	}
];


