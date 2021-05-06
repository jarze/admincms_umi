import { getMenuType, EXTRA_ROUTES, EXTRA_TYPE_ROUTES } from '@/config/page'

export const menuToRouteHandle = (menu, path) => {
  return { path: path || '/', routes: menuHandle(menu, path) }
}

const menuHandle = (data = [], pid) => {
  return data.map(item => {
    const { id, name, icon, children, exact } = item
    let va = `${pid || ''}/${id}`
    let type = getMenuType(id)
    let key = type ? `${va}/${type}` : `${va}`
    type && !pid && (key = `/-${key}`) // 通配符至少匹配一级目录

    let unit = {
      id: id,
      key: key,
      name: name,
      path: key,
      icon: icon,
      exact
    }
    children && (unit.children = menuHandle(children, va))
    if (children) {
      unit.children = menuHandle(children, va)
    } else {
      if (EXTRA_ROUTES[id]) {
        unit.hideChildrenInMenu = true
        unit.children = menuHandle(EXTRA_ROUTES[String(id)], key)
      } else if (type && EXTRA_TYPE_ROUTES[type]) {
        unit.hideChildrenInMenu = true
        unit.children = menuHandle(EXTRA_TYPE_ROUTES[type], key)
      }
    }
    return unit
  })
}

// export const handlePrivileges = (data = []) => {
//   const application = data.find(item => !item.parentId);
//   let menus = [];
//   let cacheData = [...data];
//   for (let i = 0; i < data.length; i++) {
//     let item = data[i];
//     if (item.parentId === -1) {
//       cacheData.splice(i, 1);
//     } else if (item.parentId === application.id) {
//       cacheData.splice(i, 1);
//       let menu = findChildren(cacheData, data[i]);
//       menus.push(menu);
//     } else if (cacheData.length === 0) {
//       break;
//     }
//   }
//   return menus.sort((a, b) => a.sortNumber - b.sortNumber);
// };

// const findChildren = (dataSource, menu) => {
//   menu.children = dataSource
//     .filter(item => item.parentId === menu.id)
//     .sort((a, b) => a.sortNumber - b.sortNumber)
//     .map(item => {
//       dataSource.splice(dataSource.indexOf(item), 1);
//       return { ...findChildren(dataSource, item) };
//     });
//   return menu;
// };

// 是否是目录
export const isDirectory = (data = [], currentPath) => {
  let find = false
  for (let item of data) {
    let { path, children, hideChildrenInMenu } = item
    if (path === currentPath) {
      if (hideChildrenInMenu) {
        find = !hideChildrenInMenu
        break
      }
      find = !!children
      break
    } else if (currentPath.startsWith(path) && children) {
      if (hideChildrenInMenu) {
        find = !hideChildrenInMenu
        break
      }
      find = isDirectory(children, currentPath)
    }
  }
  return find
}
