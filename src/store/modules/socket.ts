/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-04 15:38:53
 * @LastEditTime: 2022-03-04 17:43:23
 * @Description: Modify here please
 */

import { defineStore } from 'pinia';
import { store } from '/@/store';
export const socketState = defineStore({
  id: 'socket-io',
  state: () => ({
    socket: null as any,
  }),

  getters: {
    getSocket(): any {
      return this.socket;
    },
  },

  actions: {
    initSocket(socket: any) {
      this.socket = socket;
      this.socket.on('onMessage', (data) => {
        console.log(data, 'admin端监听');
      });
    },
  },
});

export function useSocketStoreWithOut() {
  return socketState(store);
}
