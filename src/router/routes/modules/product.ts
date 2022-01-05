/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 16:31:40
 * @LastEditTime: 2022-01-05 16:35:00
 * @Description: Modify here please
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/product',
  name: 'Product',
  component: LAYOUT,
  redirect: '/Product/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'bx:bxl-product-hunt',
    title: '产品管理',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'ProductPage',
      component: () => import('/@/views/product/index.vue'),
      meta: {
        title: '产品列表',
        icon: 'ci:list-checklist',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
