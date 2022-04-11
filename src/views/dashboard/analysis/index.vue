<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 14:44:22
 * @LastEditTime: 2022-04-11 15:16:25
 * @Description: Modify here please
-->
<template>
  <div class="p-4">
    <GrowCard :loading="loading" class="enter-y" />
    <!-- 导航 -->
    <div class="pt-4">
      <NavbarGrid />
    </div>
    <!-- 订单总计 -->
    <OrderAnalysis class="!my-4 enter-y" :loading="loading" />
    <!-- 用户统计 -->
    <div class="md:flex space-x-5">
      <UserAnalysis class="md:w-2/3 w-full" :dataTime="get30days()" />
      <BuyUserPie class="md:w-1/3 w-full" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import GrowCard from './components/GrowCard.vue';
  import OrderAnalysis from './components/OrderAnalysis.vue';
  import NavbarGrid from './components/NavbarGrid.vue';
  import UserAnalysis from './components/UserAnalysis.vue';
  import BuyUserPie from './components/BuyUserPie.vue';
  import { get30days } from '/@/utils/dateUtil';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
