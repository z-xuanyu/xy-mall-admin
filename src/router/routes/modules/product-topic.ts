/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-14 10:08:22
 * @LastEditTime: 2022-02-25 10:28:53
 * @Description: Modify here please
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const productTopicPage: AppRouteModule = {
  path: '/product/topic',
  name: 'ProductTopic',
  component: LAYOUT,
  redirect: '/product/topic/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:pic-left-outlined',
    title: '推广专题',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'ProductTopicList',
      component: () => import('/@/views/product-topic/index.vue'),
      meta: {
        title: '专题列表',
        icon: 'ci:list-checklist',
        hideMenu: true,
      },
    },
  ],
};

export default productTopicPage;
