/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-07 12:18:07
 * @LastEditTime: 2022-02-25 10:27:04
 * @Description: Modify here please
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const mediaLibraryPage: AppRouteModule = {
  path: '/media-library',
  name: 'MediaLibrary',
  component: LAYOUT,
  redirect: '/media-library/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'carbon:media-library',
    title: '媒体库管理',
    orderNo: 10000,
  },
  children: [
    {
      path: 'index',
      name: 'MediaLibraryList',
      component: () => import('/@/views/media-library/index.vue'),
      meta: {
        title: '媒体库列表',
        icon: 'ci:list-checklist',
        hideMenu: true,
      },
    },
  ],
};

export default mediaLibraryPage;
