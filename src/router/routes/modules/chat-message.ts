/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-04 14:06:29
 * @LastEditTime: 2022-03-04 14:12:15
 * @Description: Modify here please
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const chatMessagePage: AppRouteModule = {
  path: '/chat-message',
  name: 'ChatMessagePage',
  component: LAYOUT,
  redirect: '/chat-message/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'akar-icons:tag',
    title: '客服聊天',
    orderNo: 10000,
  },
  children: [
    {
      path: 'index',
      name: 'ChatMessagePageIndex',
      component: () => import('/@/views/chat-massage/index.vue'),
      meta: {
        title: '聊天框',
        icon: 'ci:list-checklist',
        hideMenu: true,
      },
    },
  ],
};

export default chatMessagePage;
