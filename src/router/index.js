import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'home' }
      }
    ]
  },

  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher',
    name: 'Teacher',
    meta: { title: '教师管理', icon: 'teacher' },
    children: [
      {
        path: '',
        component: () => import('@/views/teacher/index'),
        meta: { title: '列表', icon: 'table' }
      },
      {
        path: 'add',
        component: () => import('@/views/teacher/form'),
        meta: { title: '新增', icon: 'form' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/teacher/form'),
        meta: { title: '编辑', icon: 'form' },
        hidden: true
      }
    ]
  },

  {
    path: '/subject',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/subject/index'),
        meta: { title: '课程科目', icon: 'subject' }
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    meta: { title: '课程管理', icon: 'course' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/course/list'),
        meta: { title: '课程列表', icon: 'table' }
      },
      {
        path: 'info',
        component: () => import('@/views/course/info'),
        meta: { title: '新增课程', icon: 'form' }
      },
      {
        path: 'info/:id',
        component: () => import('@/views/course/info'),
        meta: { title: '编辑课程基本信息', icon: 'edit' },
        hidden: true
      },
      {
        path: 'chapter/:id',
        component: () => import('@/views/course/chapter'),
        meta: { title: '编辑课程大纲', icon: 'edit' },
        hidden: true
      },
      {
        path: 'publish/:id',
        component: () => import('@/views/course/publish'),
        meta: { title: '完成', icon: 'form' },
        hidden: true
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    hidden: true,
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ],
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
