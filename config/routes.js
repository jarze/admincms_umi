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
        name: 'login',
        component: './index',
      },
      {
        path: '/404',
        name: 'login',
        component: './404',
      },
      {
        path: '*/:menuId/list',
        name: 'login',
        component: './*/$menuId/list/_layout.js',
        routes: [
          {
            path: 'edit/:id?',
            name: 'login',
            component: './*/$menuId/list/edit/$id$.js',
            Routes: ['./src/routes/list.js'],
          },
          {
            path: 'page/:id',
            name: 'login',
            component: './*/$menuId/list/page/$id.js',
            Routes: ['./src/routes/list.js'],
          },
          {
            path: ':id?',
            name: 'login',
            component: './*/$menuId/list/$id$.js',
            Routes: ['./src/routes/list.js'],
          },
        ],
      },
    ],
  },
]
