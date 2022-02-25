/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 16:31:40
 * @LastEditTime: 2022-02-25 10:25:51
 * @Description: Modify here please
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const shopPage: AppRouteModule = {
  path: '/shop',
  name: 'Shop',
  component: LAYOUT,
  meta: {
    icon: 'ant-design:shop-outlined',
    title: '店铺管理',
    orderNo: 2,
  },
  children: [
    {
      path: 'classify-navigation',
      name: 'ClassifyNavigation',
      component: () => import('/@/views/shop/classify-navigation/index.vue'),
      meta: {
        title: '分类导航',
        icon: 'fontisto:nav-icon-grid-a',
      },
    },
    {
      path: 'hot-product',
      name: 'HotProduct',
      component: () => import('/@/views/shop/hot-product/index.vue'),
      meta: {
        title: '热门推荐',
        icon: 'bxs:hot',
      },
    },
    {
      path: 'time-limit',
      name: 'TimeLimitProduct',
      component: () => import('/@/views/shop/time-limit-product/index.vue'),
      meta: {
        title: '限时精选',
        icon: 'bx:select-multiple',
      },
    },
  ],
};

export default shopPage;
