<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-22 14:08:34
 * @LastEditTime: 2022-04-27 15:32:57
 * @Description: 聊天会话列表
-->
<script setup lang="ts">
  import { Icon } from '/@/components/Icon';
  import { Avatar, Tag } from 'ant-design-vue';
  import { useSocketStoreWithOut } from '/@/store/modules/socket';
  import { computed } from 'vue';

  const useSocketChat = useSocketStoreWithOut();

  const conversationList = computed(() => useSocketChat.getConversationList);
</script>

<template>
  <div class="conversation bg-white">
    <div class="h-[70px] flex flex-col justify-center bg-blue-500 px-5">
      <div class="bg-white flex items-center rounded-4xl overflow-hidden">
        <Icon :size="20" icon="eva:search-outline" class="px-2" />
        <input type="text" placeholder="搜索用户名称" class="outline-none py-2" />
      </div>
    </div>
    <div class="border-r">
      <!-- 会话列表 -->
      <div class="conversation__list overflow-y-auto">
        <!-- 空数据 -->
        <div class="py-20" v-if="false">
          <img
            class="w-[120px] mx-auto"
            src="http://v4.crmeb.net/admin/img/no_chat.b9c3e583.png"
            alt=""
          />
          <p class="text-center mt-5 text-gray-400">暂无用户列表</p>
        </div>
        <!--用户列表 -->
        <div
          class="flex p-3 cursor-pointer"
          v-for="(item, index) in conversationList"
          :key="item + 'user'"
          :class="index == 0 ? 'border-l-4 border-blue-500 bg-gray-100' : ''"
        >
          <Avatar :size="45" :src="item.user.avatar" />
          <div class="flex-1 ml-2 overflow-hidden">
            <div class="flex justify-between">
              <div
                ><span class="mr-2">{{ item.user.name }}</span
                ><Tag size="small" color="green">公众号</Tag></div
              >
              <span class="text-xs text-gray-400">4月8日 17:31</span>
            </div>
            <div class="text-gray-400 truncate py-1">{{ item.messageContent }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .conversation {
    &__list {
      height: calc(80vh - 70px);
    }
  }
</style>
