<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 14:44:22
 * @LastEditTime: 2022-04-11 14:25:37
 * @Description: Modify here please
-->
<template>
  <Card>
    <template #title>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <div class="inline-block p-2 rounded-full bg-blue-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="10px"
              height="10px"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 512 512"
              class="text-blue-500"
            >
              <path
                fill="currentColor"
                d="M320 32H192a32 32 0 0 0-32 32v412a4 4 0 0 0 4 4h184a4 4 0 0 0 4-4V64a32 32 0 0 0-32-32Zm144 160h-72a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8h80a24 24 0 0 0 24-24V224a32 32 0 0 0-32-32ZM48 128a32 32 0 0 0-32 32v296a24 24 0 0 0 24 24h80a8 8 0 0 0 8-8V136a8 8 0 0 0-8-8Z"
              />
            </svg>
          </div>
          <span class="ml-2">订单</span>
        </div>
        <div class="text-sm text-gray-600 space-x-5">
          <span
            class="cursor-pointer"
            @click="handleClickTabsText(index)"
            v-for="(item, index) in tabText"
            :key="index"
            :class="activeIndex == index ? 'text-blue-500' : ''"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </template>
    <OrderAnalysisBar :dataTime="get30days()" />
  </Card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import OrderAnalysisBar from './OrderAnalysisBar.vue';
  import { get30days } from '/@/utils/dateUtil';

  const activeIndex = ref(0);
  const tabText = ref(['30天', '周', '月', '年']);

  function handleClickTabsText(index) {
    activeIndex.value = index;
  }
</script>
