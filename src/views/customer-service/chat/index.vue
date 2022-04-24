<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-22 12:00:59
 * @LastEditTime: 2022-04-22 18:31:05
 * @Description: 客服聊天
-->
<script setup lang="ts">
  import Conversations from './components/Conversations.vue';
  import ChatContent from './components/ChatContent.vue';
  import ChatRightBox from './components/ChatRightBox.vue';
</script>

<template>
  <div class="flex justify-center mt-[20px]">
    <div class="w-[1200px] 2xl:w-[1500px] h-[80vh] border flex shadow-xl">
      <div class="w-[320px]">
        <Conversations />
      </div>
      <div class="flex-1">
        <ChatContent />
      </div>
      <div class="w-[280px]">
        <ChatRightBox />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
