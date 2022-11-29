import { RouteRecordRaw } from 'vue-router'
import('@/router/main/analysis/overview/overview')
export function mapMenustoRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1、先去加载默认所有的路由
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = import.meta.glob('../router/main/**/*.ts')
  console.log(userMenus)

  Object.keys(routeFiles).forEach(async (key) => {
    // const route = await import('..' + key.split('.')[2])
    const route = await import(key)

    allRoutes.push(route.default)
  })

  // 2、根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        // console.log('allRoutes', allRoutes[0])
        // 下面这行代码不知道为什么不执行
        const route = allRoutes.find((route) => route.path == menu.url)

        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}
