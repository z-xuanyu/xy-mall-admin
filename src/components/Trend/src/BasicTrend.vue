<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-11 15:40:08
 * @LastEditTime: 2022-04-11 17:04:46
 * @Description: Modify here please
-->
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'BasicTrend',
  });
</script>
<script setup lang="ts">
  import { Icon } from '/@/components/Icon';
  import { Tooltip } from 'ant-design-vue';

  defineProps({
    iconBgColor: {
      type: String,
      default: '#9dd3a8',
    },
    title: {
      type: String,
      default: '商品浏览量',
    },
    tipsText: {
      type: String,
      default: '在选定条件下，所有商品详情页被访问的次数，一个人在统计时间内访问多次记为多次',
    },
    type: {
      type: String,
      default: 'up',
    },
    value: {
      type: Number,
      default: 7969,
    },
    percentage: {
      type: String,
      default: '60.69%',
    },
  });
</script>

<template>
  <div class="flex py-5">
    <div
      class="icon-wrpper rounded-full flex justify-center items-center h-[35px] w-[35px]"
      :style="{ backgroundColor: iconBgColor }"
    >
      <Icon icon="bxs:shopping-bag-alt" color="white" />
    </div>
    <div class="ml-3">
      <div
        >{{ title }}
        <Tooltip placement="rightTop" color="white">
          <template #title>
            <span class="text-black">{{ tipsText }}</span>
          </template>
          <Icon icon="iwwa:information" />
        </Tooltip>
      </div>
      <div class="text-3xl py-1">{{ value }}</div>
      <div class="flex items-center">
        <span>环比增长:</span>
        <span class="ml-2" :class="type === 'up' ? 'text-green-600' : 'text-red-600'">{{
          percentage
        }}</span>
        <Icon :size="20" icon="gridicons:dropdown" :color="type === 'up' ? 'green' : 'red'" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
