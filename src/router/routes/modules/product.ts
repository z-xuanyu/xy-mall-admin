/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 16:31:40
 * @LastEditTime: 2022-02-14 11:03:06
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
      },
    },
    {
      path: 'params/template',
      name: 'ProductParamsTemplate',
      component: () => import('/@/views/product/params-template/index.vue'),
      meta: {
        title: '参数模板',
        icon: 'ls:paramater',
      },
    },
    {
      path: 'sku/template',
      name: 'ProductSkuTemplate',
      component: () => import('/@/views/product/sku-template/index.vue'),
      meta: {
        title: '规格模板',
        icon: 'ant-design:skin-outlined',
      },
    },
  ],
};

export default dashboard;
