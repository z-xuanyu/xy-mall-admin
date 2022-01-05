/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 16:28:27
 * @LastEditTime: 2022-01-05 16:30:44
 * @Description: Modify here please
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/category',
  name: 'Admin',
  component: LAYOUT,
  redirect: '/category/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'bx:bx-category',
    title: '分类管理',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'CategoryPage',
      component: () => import('/@/views/category/index.vue'),
      meta: {
        title: '分类列表',
        icon: 'ci:list-checklist',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
