[TOC]

# admincms_umi
基于umi框架后台管理系统封装

# 路由规则

> <mark>`menuId`</mark> 唯一标志页面

## 路由配置
### [`list`](#list配置相关)

``` js
	routes: [{
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
      }]
```

## 搜索列表页面配置

见 `src/pages/_list/list-types.d.ts`

## `CLI` 页面生成器

```
yarn gen
```