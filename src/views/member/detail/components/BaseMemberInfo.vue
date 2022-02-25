<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-25 14:15:26
 * @LastEditTime: 2022-02-25 15:07:43
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref } from 'vue';
  import { Tag } from 'ant-design-vue';

  const memberInfo2 = ref([
    {
      text: '卷',
      name: '优惠券',
      count: 0,
    },
    {
      text: '金',
      name: '累积消费',
      count: 198.0,
    },
    {
      text: '登',
      name: '登录数次',
      count: 1,
    },
    {
      text: '充',
      name: '充值金额',
      count: 100,
    },
  ]);
</script>

<template>
  <div class="flex space-x-4 justify-between">
    <div class="bg-white w-1/2 2xl:w-1/3 flex p-3">
      <div>
        <h1 class="text-lg font-bold space-x-2 flex items-center px-1">
          <span>阿宇</span>
          <Tag color="blue">男</Tag>
          <Tag color="#F60F60">普通会员</Tag>
        </h1>
        <div class="avatar border-5 overflow-hidden rounded-md">
          <img
            class="object-cover w-40 h-40 rounded-md"
            src="https://alpdev.blob.core.windows.net/at-st/Images/835-627aee5d-628c-43f8-b7cb-c533c4ec2dd8.jpg"
            alt=""
          />
        </div>
      </div>
      <div class="pt-10 pl-4">
        <div class="space-y-5">
          <div class="space-x-2">
            <span class="font-bold">邮箱:</span>
            <span>812006298@qq.com</span>
          </div>
          <div class="space-x-2">
            <span class="font-bold">手机号码:</span>
            <span>15800021934</span>
          </div>
          <div class="space-x-2">
            <span class="font-bold">注册时间:</span>
            <span>2022-02-14 15:30</span>
          </div>
          <div class="space-x-2">
            <span class="font-bold">账号状态:</span>
            <Tag color="success">正常</Tag>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white flex items-center justify-around w-1/2 2xl:w-2/3 p-3">
      <div class="flex space-x-5" v-for="(item, index) in memberInfo2" :key="index">
        <div
          class="
            w-16
            h-16
            flex
            items-center
            justify-center
            text-2xl
            rounded-full
            bg-red-400
            text-white
          "
          >{{ item.text }}</div
        >
        <div class="space-y-2">
          <div class="text-md">{{ item.name }}</div>
          <div class="text-xl font-bold">{{ item.count }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
