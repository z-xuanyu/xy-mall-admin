/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 11:01:29
 * @LastEditTime: 2022-01-05 11:32:56
 * @Description: Modify here please
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/admin',
  name: 'Admin',
  component: LAYOUT,
  redirect: '/admin/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:user-outlined',
    title: '管理员',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'AadminPage',
      component: () => import('/@/views/admin/index.vue'),
      meta: {
        title: '管理员列表',
        icon: 'ant-design:user-outlined',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
