/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-04 15:38:53
 * @LastEditTime: 2022-04-28 14:17:54
 * @Description: Modify here please
 */

import { defineStore } from 'pinia';
import { store } from '/@/store';
import { getConversationRecord, getChatMessageList } from '/@/api/customer-service';

interface SendMessageType {
  // 发送人id
  userId: string;
  // 目标用户id
  targetId: string;
  // 发送内容
  content?: string;
  // 发送消息类型
  messageType: number;
  // 推送商品信息
  product?: any;
}

export const socketState = defineStore({
  id: 'socket-io',
  state: () => ({
    // 初始化socket
    socket: null as any,
    // 客服id
    userId: '6262218cb74277f628093064',
    // 目标id
    targetId: '622707f8ddf23c9a77a88092',
    // 会话列表
    conversationRecord: [],
    // 聊天记录列表
    messageList: [] as any,
  }),

  getters: {
    getSocket(): any {
      return this.socket;
    },
    getConversationList(): any {
      return this.conversationRecord;
    },

    getMessageList(): any {
      const maxTime = 5 * 60 * 1000;
      function getTime(value: string) {
        return new Date(value).getTime();
      }
      return (
        this.messageList.length &&
        this.messageList.map((item: any, index: number, arr: any) => {
          return {
            ...item,
            showTime: index
              ? getTime(item.createdAt) - getTime(arr[index - 1].createdAt) > maxTime
              : true,
          };
        })
      );
    },
    getUserId(): string {
      return this.userId;
    },
    getTargetId(): string {
      return this.targetId;
    },
  },

  actions: {
    initSocket(socket: any) {
      this.socket = socket;
      // 接受消息监听
      this.socket.on('onMessage', (data) => {
        if (data.user._id == this.targetId || data.user._id == this.userId) {
          this.messageList.push(data);
        }
      });
      this.fetchConversationList();
      this.fetchMessageList();
    },
    async fetchConversationList() {
      this.conversationRecord = await getConversationRecord(this.userId);
    },

    async fetchMessageList() {
      this.messageList = await getChatMessageList(this.userId, this.targetId);
    },
    // 发送消息
    sendMessage(data: SendMessageType) {
      this.socket.emit('sendMessage', data);
      this.fetchConversationList();
    },
  },
});

export function useSocketStoreWithOut() {
  return socketState(store);
}
