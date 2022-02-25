/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 16:31:40
 * @LastEditTime: 2022-02-25 10:29:19
 * @Description: Modify here please
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const productPage: AppRouteModule = {
  path: '/product',
  name: 'Product',
  component: LAYOUT,
  redirect: '/product/index',
  meta: {
    icon: 'bx:bxl-product-hunt',
    title: '商品管理',
    orderNo: 3,
  },
  children: [
    {
      path: 'index',
      name: 'ProductList',
      component: () => import('/@/views/product/index.vue'),
      meta: {
        title: '商品列表',
        icon: 'ci:list-checklist',
      },
    },
    {
      path: 'category',
      name: 'ProductCategory',
      component: () => import('/@/views/product/category/index.vue'),
      meta: {
        title: '商品分类',
        icon: 'bx:bx-category',
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

export default productPage;
