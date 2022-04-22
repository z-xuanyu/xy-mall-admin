<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-22 14:13:36
 * @LastEditTime: 2022-04-22 16:57:30
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref } from 'vue';
  import UserInfoCard from './UserInfoCard.vue';
  import TradingOrderCard from './TradingOrderCard.vue';
  import GoodsInfoCard from './GoodsInfoCard.vue';

  const activeKey = ref('1');

  const tabs = ref([
    {
      key: '1',
      text: '客户信息',
    },
    {
      key: '2',
      text: '交易信息',
    },
    {
      key: '3',
      text: '商品信息',
    },
  ]);

  function handleTabsChange(key: string) {
    activeKey.value = key;
  }
</script>

<template>
  <div>
    <div class="h-[70px] bg-blue-500 flex justify-around text-white">
      <span
        @click="handleTabsChange(item.key)"
        class="inline-block leading-[70px] cursor-pointer relative"
        :class="activeKey == item.key ? 'font-bold' : ''"
        v-for="item in tabs"
        :key="item.key"
        >{{ item.text }}
        <i
          v-if="item.key == activeKey"
          class="absolute h-[2px] bg-white left-0 right-0 bottom-0"
        ></i>
      </span>
    </div>
    <div class="h-[calc(80vh-70px)] border-l bg-white">
      <template v-if="activeKey == '1'">
        <UserInfoCard />
      </template>
      <template v-if="activeKey == '2'">
        <TradingOrderCard />
      </template>
      <template v-if="activeKey == '3'">
        <GoodsInfoCard />
      </template>
    </div>
  </div>
</template>

<style scoped></style>
