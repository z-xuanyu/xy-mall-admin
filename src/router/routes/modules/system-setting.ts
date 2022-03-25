/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 16:31:40
 * @LastEditTime: 2022-03-25 18:28:30
 * @Description: Modify here please
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const systemSettingPage: AppRouteModule = {
  path: '/system-setting',
  name: 'SystemSetting',
  component: LAYOUT,
  meta: {
    icon: 'ant-design:setting-outlined',
    title: '系统管理',
    orderNo: 998888,
  },
  children: [
    {
      path: 'account',
      name: 'AdminPage',
      component: () => import('/@/views/system-setting/admin/index.vue'),
      meta: {
        title: '管理员账号',
        icon: 'line-md:account',
      },
    },
    {
      path: 'role',
      name: 'RolePage',
      component: () => import('/@/views/system-setting/role/index.vue'),
      meta: {
        title: '角色管理',
        icon: 'eos-icons:role-binding-outlined',
      },
    },
    {
      path: 'menu',
      name: 'MenuPage',
      component: () => import('/@/views/system-setting/menu/index.vue'),
      meta: {
        title: '菜单管理',
        icon: 'heroicons-solid:menu-alt-2',
      },
    },
    {
      path: 'website',
      name: 'WebsitePage',
      component: () => import('/@/views/system-setting/website/index.vue'),
      meta: {
        title: '站点设置',
        icon: 'dashicons:admin-site-alt3',
      },
    },
  ],
};

export default systemSettingPage;
