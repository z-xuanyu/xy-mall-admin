/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 16:31:40
 * @LastEditTime: 2022-02-16 15:52:08
 * @Description: Modify here please
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/system-setting',
  name: 'SystemSetting',
  component: LAYOUT,
  meta: {
    icon: 'ant-design:setting-outlined',
    title: '系统管理',
    orderNo: 998888,
  },
  children: [
    {
      path: 'account',
      name: 'AdminPage',
      component: () => import('/@/views/system-setting/admin/index.vue'),
      meta: {
        title: '管理员账号',
        icon: 'line-md:account',
      },
    },
  ],
};

export default dashboard;
