import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/chat',
    name: 'chat',
    hidden: true,
    component: () => import('@/views/chat/index')
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation', affix: false }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'Guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/configuration',
    component: Layout,
    name: 'configuration',
    meta: { title: '报价管理', icon: 'el-icon-s-help' },
    redirect: 'noRedirect',
    menuCode: '1000',
    children: [
      {
        path: '/projectEdit',
        name: '项目设置',
        redirect: 'noRedirect',
        meta: { title: '项目设置', icon: 'el-icon-s-help' },
        menuCode: '1000004',
        parentCode: '1000',
        showOne: true,
        component: () => import('@/components/second.vue'),
        children: [
          {
            path: 'index',
            name: 'projectEdit',
            menuCode: '1000004001',
            parentCode: '1000004',
            component: () => import('@/views/quotationSystem/itemconfig/index.vue'),
            meta: { title: '项目显示设置', icon: 'table' }
          }
        ]
      },
      {
        path: '/parameter',
        redirect: 'noRedirect',
        menuCode: '1000001',
        parentCode: '1000',
        component: () => import('@/components/second.vue'),
        meta: { title: '报价参数', icon: 'el-icon-s-help' },
        children: [
          {
            menuCode: '1000001001',
            parentCode: '1000001',
            path: 'paperpricesetting',
            name: 'paperpricesetting',
            component: () => import('@/views/quotationSystem/paperpricesetting/index.vue'),
            meta: { title: '纸张价格设置', icon: 'table' }
          },
          {
            path: 'edit',
            name: 'edit',
            component: resolve => import('@/views/quotationSystem/paperpricesetting/edit.vue'),
            meta: {
              title: '纸张价格设置-编辑',
              affix: false,
              zhTitle: '纸张价格设置-编辑',
              icon: 'icon-ym icon-ym-btn-preview',
              canMultipleOpen: false,
              id: ''
            },
            hidden: true
          },
          {
            menuCode: '1000001002',
            parentCode: '1000001',
            path: 'printingmachinesetting',
            name: 'printingmachinesetting',
            component: () => import('@/views/quotationSystem/printingmachinesetting/index.vue'),
            meta: { title: '印刷机台设置', icon: 'table' }
          },
          {
            path: 'printEdit',
            name: 'printEdit',
            component: () => import('@/views/quotationSystem/printingmachinesetting/edit.vue'),
            meta: { title: '印刷机台设置-编辑', icon: 'table' },
            hidden: true
          }
        ]
      },
      {
        path: '/boxconfiguration',
        name: '盒型配置',
        meta: { title: '盒型配置', icon: 'el-icon-s-help' },
        redirect: 'noRedirect',
        showOne: true,
        menuCode: '1000005',
        parentCode: '1000',
        component: () => import('@/components/second.vue'),
        children: [
          {
            menuCode: '1000005001',
            parentCode: '1000005',
            path: 'index',
            name: 'colorboxsetting',
            component: () => import('@/views/quotationSystem/colorboxsetting/index.vue'),
            meta: { title: '彩盒设置', icon: 'table' }
          }
        ]
      },
      {
        path: '/boxquotation',
        name: '盒型报价',
        meta: { title: '盒型报价', icon: 'el-icon-s-help' },
        redirect: 'noRedirect',
        menuCode: '1000002',
        parentCode: '1000',
        showOne: true,
        component: () => import('@/components/second.vue'),
        children: [
          {
            menuCode: '1000002001',
            parentCode: '1000002',
            path: 'index',
            name: 'index',
            component: () => import('@/views/quotationSystem/boxquotation/buttonbottombox/index.vue'),
            meta: { title: '彩盒彩箱报价', icon: 'table' }
          }
        ]
      },
      {
        menuCode: '1000003',
        parentCode: '1000',
        path: 'quotationList',
        name: 'quotationList',
        meta: { title: '报价单列表', icon: 'el-icon-s-help' },
        component: () => import('@/views/quotationSystem/quotationList/index.vue'),
        children: []
      }
    ]
  },
  {
    path: '/crm',
    component: Layout,
    name: 'crm',
    menuCode: '1001',
    meta: { title: '客户管理', icon: 'el-icon-s-help' },
    showOne: true,
    redirect: 'noRedirect',
    children: [
      {
        path: 'index',
        name: 'crmList',
        menuCode: '1001001',
        parentCode: '1001',
        component: () => import('@/views/crm/index.vue'),
        meta: { title: '客户列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: '系统管理',
    meta: { title: '系统管理', icon: 'el-icon-s-help' },
    onechild: true,
    redirect: 'noRedirect',
    menuCode: '1002',
    children: [
      {
        menuCode: '1002002',
        parentCode: '1002',
        path: 'user',
        name: 'user',
        component: () => import('@/views/system/user.vue'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'tenta',
        name: 'tenta',
        menuCode: '1002001',
        parentCode: '1002',
        component: () => import('@/views/system/tenta.vue'),
        meta: { title: '租户列表', icon: 'table' }
      },
      {
        path: 'permission',
        name: 'childpermission',
        component: () => import('@/views/system/permission.vue'),
        meta: { title: '设置权限', icon: 'table' },
        hidden: true
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'Export Zip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'Theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
router.addRoutes(asyncRoutes)
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
