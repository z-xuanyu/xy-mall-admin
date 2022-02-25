/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 16:31:40
 * @LastEditTime: 2022-02-25 10:27:59
 * @Description: Modify here please
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const marketingPage: AppRouteModule = {
  path: '/marketing',
  name: 'Marketing',
  component: LAYOUT,
  meta: {
    icon: 'mdi-light:clipboard-text',
    title: '营销管理',
    orderNo: 6,
  },
  children: [
    {
      path: 'coupon',
      name: 'MarketingCoupon',
      component: () => import('/@/views/marketing/coupon/index.vue'),
      meta: {
        title: '优惠券',
        icon: 'icon-park-outline:coupon',
      },
    },
  ],
};

export default marketingPage;
