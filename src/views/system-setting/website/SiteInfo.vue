<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-16 14:38:52
 * @LastEditTime: 2022-03-16 15:24:44
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { RadioGroup, Radio, Input, Switch } from 'ant-design-vue';
  import UploadImage from '/@/views/media-library/UploadImage.vue';
  import { ref } from 'vue';

  const value = ref(1);
</script>

<template>
  <!-- 基本设置 -->
  <div class="rounded-sm shadow mb-5 bg-white">
    <h1 class="text-lg p-2 border-b">基本设置</h1>
    <div class="px-2 pb-4">
      <div class="flex items-center my-4 p-2">
        <span class="w-[100px]">经营状态</span>
        <RadioGroup v-model:value="value">
          <Radio :value="1">营业</Radio>
          <Radio :value="2">打样</Radio>
        </RadioGroup>
      </div>
      <div class="flex my-4 items-center p-2">
        <span class="w-[100px]">店铺名称</span>
        <div class="w-[200px]">
          <Input placeholder="请输入设置店铺名称" />
        </div>
      </div>

      <div class="flex my-4 items-center p-2">
        <span class="w-[100px]">店铺LOGO</span>
        <div class="w-[200px]">
          <UploadImage />
        </div>
      </div>
    </div>
  </div>
  <!-- 交易设置 -->
  <div class="rounded-sm mb-5 shadow bg-white">
    <h1 class="text-lg p-2 border-b">交易设置</h1>
    <div class="px-2 pb-4">
      <div class="flex items-center my-4 p-2">
        <span class="w-[180px] text-right pr-4">待付款订单自动取消</span>
        <Switch />
      </div>
      <div class="flex p-2">
        <span class="w-[180px] text-right pr-4">自动确认收货时间</span>
        <div class="w-[200px]">
          <Input placeholder="0" addon-after="天" />
          <p class="text-gray-400 mt-1 text-xs">从发货到自动确认收货时间</p>
        </div>
      </div>

      <div class="flex p-2">
        <span class="w-[180px] text-right pr-4">待评价订单默认好评时间</span>
        <div class="w-[200px]">
          <Input placeholder="3" addon-after="天" />
          <p class="text-gray-400 mt-1 text-xs">从确认收货时间开始计算</p>
        </div>
      </div>

      <div class="flex p-2">
        <span class="w-[180px] text-right pr-4">售后时间</span>
        <div class="w-[200px]">
          <Input placeholder="0" addon-after="天" />
          <p class="text-gray-400 mt-1 text-xs">从确认收货开始计算，可申请售后的时间</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
