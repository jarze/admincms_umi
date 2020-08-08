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
        name: 'home',
        component: './index',
      },
      {
        path: '/404',
        name: '404',
        component: './404',
      },
      {
        path: '*/:menuId/list',
        name: '搜索列表',
        component: './*/$menuId/list/_layout.js',
        routes: [
          {
            path: 'edit/:id?',
            name: '表单',
            component: './*/$menuId/list/edit/$id$.js',
            Routes: ['./src/routes/list.js'],
          },
          {
            path: 'page/:id?',
            name: '详情',
            component: './*/$menuId/list/page/$id$.js',
            Routes: ['./src/routes/list.js'],
          },
          {
            path: ':id?',
            name: '列表',
            component: './*/$menuId/list/$id$.js',
            Routes: ['./src/routes/list.js'],
          },
        ],
      },
    ],
  },
]
