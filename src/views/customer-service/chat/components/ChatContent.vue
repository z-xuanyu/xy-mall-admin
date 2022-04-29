<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-22 14:10:21
 * @LastEditTime: 2022-04-28 14:37:24
 * @Description: 客服聊天
-->
<script setup lang="ts">
  import { Avatar, Popover } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import SendMessageBox from './SendMessageBox.vue';
  import { computed, ref, watch, nextTick } from 'vue';
  import { useSocketStoreWithOut } from '/@/store/modules/socket';
  import { formatChatMessageTime } from '/@/utils/dateUtil';

  const useSocketChat = useSocketStoreWithOut();
  const messageList = computed(() => useSocketChat.getMessageList);
  const userId = computed(() => useSocketChat.getUserId);

  const messageContentRef = ref<HTMLDivElement | null>(null);

  watch(
    () => useSocketChat.messageList,
    () => {
      nextTick(() => {
        // 滚到底部
        messageContentRef.value?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
      });
    },
    {
      deep: true,
    },
  );
</script>

<template>
  <div class="flex flex-col justify-between">
    <div class="leading-[70px] flex justify-between bg-blue-500">
      <div class="space-x-2">
        <Avatar
          :size="40"
          src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKDZPvXt08QV5TyoUTT5NMFX3j3p3ZKnfWjXiaUGTJYvbL0ZvRsd2IzFQgyvorAv5JwcazafpfhshQ/132"
        />
        <span class="text-white">阿宇_Coder</span>
        <Popover trigger="click" placement="bottom">
          <span class="bg-green-100 cursor-pointer px-3 rounded-3xl py-0.5 text-xs">
            <i class="inline-block w-[5px] h-[5px] rounded-lg mb-[2px] bg-green-500"></i>
            在线
          </span>
          <template #content>
            <div class="flex items-center space-x-1 mb-2 cursor-pointer">
              <Icon icon="ic:baseline-check" />
              <i class="inline-block h-[10px] w-[10px] bg-green-500 rounded-full"></i>
              <span>在线</span>
            </div>
            <div class="flex items-center space-x-1 cursor-pointer">
              <!-- <Icon icon="ic:baseline-check" /> -->
              <i class="inline-block h-[10px] w-[10px] ml-[20px] bg-gray-300 rounded-full"></i>
              <span>下线</span>
            </div>
          </template>
        </Popover>
      </div>
      <div class="mr-2">
        <span class="bg-white text-blue-500 cursor-pointer px-4 py-1 rounded-4xl">退出登录</span>
      </div>
    </div>
    <div class="h-[calc(80vh-270px)] overflow-y-auto p-2" ref="messageContentRef">
      <p class="text-center text-gray-500" v-if="!messageList.length"> 暂无聊天记录 </p>
      <div class="py-2" v-for="(item, index) in messageList" :key="index + 'msg'">
        <p v-if="item.showTime" class="text-center text-gray-400">{{
          formatChatMessageTime(item.createdAt)
        }}</p>
        <div class="flex" :class="item.user._id == userId ? 'flex-row-reverse' : ''">
          <Avatar :size="40" :src="item.user.avatar" />
          <!-- 文本类型 -->
          <template v-if="item.messageType == 1">
            <div
              class="max-w-[200px] rounded-b-lg shadow-2xl mt-2 py-2 px-4"
              :class="
                item.user._id == userId
                  ? 'bg-blue-500 rounded-tl-lg text-white mr-2'
                  : 'bg-white rounded-tr-lg ml-2'
              "
            >
              {{ item.content }}
            </div>
          </template>
          <!-- 商品推送 -->
          <template v-if="item.messageType == 5">
            <div class="max-w-[300px] bg-white flex mr-2 p-2 rounded-lg shadow-sm">
              <img class="w-[70px] h-[70px] object-cover" :src="item.product?.pic" />
              <div class="flex-1 overflow-hidden">
                <div class="truncate">{{ item.product?.title }}</div>
                <div class="text-xs text-gray-400 py-1">
                  <span>库存：</span>
                  <span>{{ item.product?.inventory }}</span>
                  <span class="ml-2">销量：</span>
                  <span>{{ item.product?.sales }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-red-500">￥{{ item.product?.price }}</span>
                  <span class="text-blue-500 cursor-pointer">查看商品 ></span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <SendMessageBox />
  </div>
</template>

<style scoped></style>
