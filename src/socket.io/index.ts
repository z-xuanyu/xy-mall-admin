/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-04 15:11:05
 * @LastEditTime: 2022-04-11 15:26:55
 * @Description: Socket
 */
import { io } from 'socket.io-client';
import { useSocketStoreWithOut } from '/@/store/modules/socket';

export function setupSocketIo() {
  const useSocketState = useSocketStoreWithOut();
  const socket = io('https://fukucho-api.zhouxuanyu.com/chat');
  useSocketState.initSocket(socket);
}
