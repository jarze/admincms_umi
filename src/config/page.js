// 定义属于list的menus
const LIST_MENUS = [
  /*GEN: APPEND SEARCH LIST HERE*/
  'example_list_two',
  'example_list',
]
const PAGE_MENUS = [
  /*GEN: APPEND PAGE HERE*/
  'example_page',
]

// 获取menu类型
export const getMenuType = menuId => {
  if (LIST_MENUS.includes(menuId)) {
    return 'list'
  } else if (PAGE_MENUS.includes(menuId)) {
    return 'list/page'
  }
  return null
}

// const MENU_TABS = {
//   '7': [
//     {
//       key: '1',
//       tab: 'tab1',
//     },
//     {
//       key: '2',
//       tab: 'tab2',
//     },
//     {
//       key: '3',
//       tab: 'tab3',
//     },
//   ],
// }

// export const getTabs = menuId => {
//   return MENU_TABS[menuId]
// }

// menu 之外的深层级页面（不显示在menu,会显示在面包屑上 {pid: [{name, children}]}
export const EXTRA_ROUTES = {
  //example
  example_list: [
    {
      id: 'edit',
      name: '添加',
      children: [
        {
          id: 'detail',
          name: '详情',
        },
        {
          id: ':id',
          name: '编辑',
          children: [
            {
              id: ':id',
              name: '编辑详情',
            },
          ],
        },
      ],
    },
  ],
}
