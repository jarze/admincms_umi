export default [
  {
    path: '/login',
    component: './Login/index.js',
    Routes: ['./src/routes/auth.js'],
  },
  {
    path: '/',
    component: '../layouts/index',
    Routes: ['./src/routes/auth.js'],
    routes: [
      {
        path: '/',
        component: './index',
      },
      {
        path: '*/:menuId/list',
        component: './*/$menuId/list/_layout.js',
        routes: [
          {
            path: 'edit/:id?',
            component: './*/$menuId/list/edit/$id$.js',
            Routes: ['./src/routes/list.js'],
          },
          {
            path: 'page/:id',
            component: './*/$menuId/list/page/$id.js',
            Routes: ['./src/routes/list.js'],
          },
          {
            path: ':id?',
            component: './*/$menuId/list/$id$.js',
            Routes: ['./src/routes/list.js'],
          },
        ],
      },
    ],
  },
];
