/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-06 10:26:00
 * @LastEditTime: 2022-01-06 10:42:11
 * @Description: Modify here please
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/banner',
  name: 'Banner',
  component: LAYOUT,
  redirect: '/banner/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ph:flag-banner-bold',
    title: 'Banner管理',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'BannerPage',
      component: () => import('/@/views/banner/index.vue'),
      meta: {
        title: 'Banner列表',
        icon: 'ci:list-checklist',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
