/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 14:28:32
 * @LastEditTime: 2022-01-05 16:16:25
 * @Description: Modify here please
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/news',
  name: 'News',
  component: LAYOUT,
  redirect: '/news/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'bx:bx-news',
    title: '新闻管理',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'NewsPage',
      component: () => import('/@/views/news/index.vue'),
      meta: {
        title: '新闻列表',
        icon: 'bi:card-list',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
