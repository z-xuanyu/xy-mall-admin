<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-15 16:16:16
 * @LastEditTime: 2022-04-15 16:35:07
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { Button } from 'ant-design-vue';
</script>

<template>
  <div class="bg-white m-4 p-5">
    <div class="flex">
      <span>选择配色方案：</span>
      <div class="flex space-x-5 ml-5">
        <div
          class="border flex cursor-pointer items-center p-2 px-4 rounded-sm"
          v-for="item in 4"
          :class="item == 1 ? 'border-purple-500' : ''"
          :key="item"
        >
          <span class="w-[20px] h-[20px] rounded-sm bg-purple-500 inline-block"></span>
          <span class="ml-2">天空色</span>
        </div>
      </div>
    </div>
    <div class="mt-10 flex">
      <span>当前风格示例:</span>
      <div class="flex-1 ml-7">
        <img
          class="w-[800px]"
          src="http://pro.crmeb.net/admin/view_admin/img/orange.78f28374.jpg"
          alt=""
        />
        <Button class="mt-10" type="primary">保存</Button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
