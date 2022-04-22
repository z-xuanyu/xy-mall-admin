<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-22 14:11:15
 * @LastEditTime: 2022-04-22 16:14:51
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { Icon } from '/@/components/Icon';
</script>

<template>
  <div class="h-[200px] border-t bg-white relative">
    <div class="flex items-center p-2 space-x-2">
      <Icon :size="25" icon="fluent:emoji-24-regular" />
      <Icon :size="25" icon="tabler:photo" />
      <Icon :size="25" icon="fa-regular:comment-dots" />
    </div>
    <textarea
      class="w-full h-[150px] p-2 outline-none resize-none"
      placeholder="请输入文字内容"
    ></textarea>
    <button class="bg-gray-300 absolute right-2 bottom-2 px-4 py-1 rounded-sm text-white"
      >发送</button
    >
  </div>
</template>

<style scoped></style>
