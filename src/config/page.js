// 定义属于list的menus
const listMenus = ['5', '7', '15'];

// 获取menu类型
export const getMenuType = (menuId) => {
  if (listMenus.includes(menuId)) {
    return 'list';
  }
  return null;
}