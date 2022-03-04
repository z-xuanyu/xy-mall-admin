/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-16 16:10:13
 * @LastEditTime: 2022-02-25 15:36:00
 * @Description: Modify here please
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const memberPage: AppRouteModule = {
  path: '/member',
  name: 'Member',
  component: LAYOUT,
  meta: {
    icon: 'gg:user-list',
    title: '会员管理',
    orderNo: 5,
  },
  children: [
    {
      path: 'index',
      name: 'MemberList',
      component: () => import('/@/views/member/index.vue'),
      meta: {
        title: '会员列表',
        icon: 'ant-design:unordered-list-outlined',
      },
    },
    {
      path: 'paying',
      name: 'MemberPaying',
      component: () => import('/@/views/member/paying/index.vue'),
      meta: {
        title: '付费会员',
        icon: 'iconoir:verified-user',
      },
    },
    {
      path: 'setting',
      name: 'MemberSetting',
      component: () => import('/@/views/member/setting/index.vue'),
      meta: {
        title: '会员设置',
        icon: 'la:user-cog',
      },
    },
    {
      path: 'detail/:id',
      name: 'MemberDetail',
      component: () => import('/@/views/member/detail/index.vue'),
      meta: {
        title: '会员详细',
        icon: 'mdi:card-account-details-outline',
        currentActiveMenu: '/member/index',
        hideMenu: true,
      },
    },
  ],
};

export default memberPage;
