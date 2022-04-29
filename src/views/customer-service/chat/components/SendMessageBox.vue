<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-22 14:11:15
 * @LastEditTime: 2022-04-28 14:19:43
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref } from 'vue';
  import { Icon } from '/@/components/Icon';
  import { useSocketStoreWithOut } from '/@/store/modules/socket';

  const useSocket = useSocketStoreWithOut();

  const sendContent = ref('');

  // 发送消息
  function handleSendMessage() {
    useSocket.sendMessage({
      userId: useSocket.userId, // 客服id
      targetId: useSocket.targetId, // 目标用户id
      content: sendContent.value,
      messageType: 1,
    });
    sendContent.value = '';
  }
</script>

<template>
  <div class="h-[200px] border-t bg-white relative">
    <div class="flex items-center p-2 space-x-2">
      <Icon class="cursor-pointer" :size="25" icon="fluent:emoji-24-regular" />
      <Icon class="cursor-pointer" :size="25" icon="tabler:photo" />
      <Icon class="cursor-pointer" :size="25" icon="fa-regular:comment-dots" />
    </div>
    <textarea
      class="w-full h-[150px] p-2 outline-none resize-none"
      v-model="sendContent"
      placeholder="请输入文字内容"
    ></textarea>
    <button
      @click="handleSendMessage"
      class="absolute right-2 bottom-2 px-4 py-1 rounded-sm text-white"
      :class="sendContent ? 'bg-blue-500' : 'bg-gray-300'"
      :disabled="!sendContent"
      >发送</button
    >
  </div>
</template>

<style scoped></style>
