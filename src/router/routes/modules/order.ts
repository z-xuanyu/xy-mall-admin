/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 16:31:40
 * @LastEditTime: 2022-02-16 16:09:19
 * @Description: Modify here please
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/order',
  name: 'Order',
  component: LAYOUT,
  meta: {
    icon: 'icon-park-outline:transaction-order',
    title: '订单管理',
    orderNo: 4,
  },
  children: [
    {
      path: 'index',
      name: 'OrderList',
      component: () => import('/@/views/order/index.vue'),
      meta: {
        title: '订单列表',
        icon: 'ant-design:unordered-list-outlined',
      },
    },
    {
      path: 'refunds-dispose',
      name: 'OrderRefundsDispose',
      component: () => import('/@/views/order/refunds_dispose/index.vue'),
      meta: {
        title: '退款处理',
        icon: 'ri:refund-line',
      },
    },
    {
      path: 'sale-return-dispose',
      name: 'OrderSaleReturnDispose',
      component: () => import('/@/views/order/sale-return-dispose/index.vue'),
      meta: {
        title: '退货处理',
        icon: 'tabler:truck-return',
      },
    },
    {
      path: 'deal-set',
      name: 'OrderDealSet',
      component: () => import('/@/views/order/deal-set/index.vue'),
      meta: {
        title: '交易设置',
        icon: 'fluent:text-box-settings-24-regular',
      },
    },
  ],
};

export default dashboard;
