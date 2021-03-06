/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-13 15:42:29
 * @LastEditTime: 2022-02-25 10:29:59
 * @Description: Modify here please
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const tagPage: AppRouteModule = {
  path: '/tags',
  name: 'Tag',
  component: LAYOUT,
  redirect: '/tags/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'akar-icons:tag',
    title: '标签管理',
    orderNo: 10000,
  },
  children: [
    {
      path: 'index',
      name: 'TagList',
      component: () => import('/@/views/tag/index.vue'),
      meta: {
        title: '标签列表',
        icon: 'ci:list-checklist',
        hideMenu: true,
      },
    },
  ],
};

export default tagPage;
