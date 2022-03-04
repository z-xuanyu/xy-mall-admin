/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-04 15:11:05
 * @LastEditTime: 2022-03-04 16:19:45
 * @Description: Socket
 */
import { io } from 'socket.io-client';
import { useSocketStoreWithOut } from '/@/store/modules/socket';

export function setupSocketIo() {
  const useSocketState = useSocketStoreWithOut();
  const socket = io('http://localhost:3008/chat');
  useSocketState.initSocket(socket);
}
