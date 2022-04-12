<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-11 15:30:02
 * @LastEditTime: 2022-04-12 10:21:07
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref } from 'vue';
  import { BasicTrend } from '/@/components/Trend';
  import { Card, RangePicker, Button } from 'ant-design-vue';
  import ProductStatistic from './components/ProductStatistic.vue';
  import ProductTop from './components/ProductTop.vue';
  import { get30days } from '/@/utils/dateUtil';

  const date = ref(null);
</script>

<template>
  <div class="p-3">
    <div class="bg-white">
      <Card :bordered="false">
        <template #title>
          <div class="flex justify-between items-center">
            <span>商品概况</span>
            <div class="space-x-3">
              <RangePicker v-model:value="date" />
              <Button type="primary">查询</Button>
              <Button type="primary">导出</Button>
            </div>
          </div>
        </template>
        <div class="flex flex-wrap">
          <div class="w-1/5" v-for="item in 10" :key="item"> <BasicTrend /></div>
        </div>
      </Card>
      <div class="p-2 mt-5">
        <ProductStatistic :dataTime="get30days()" />
      </div>
    </div>
    <div class="mt-4 bg-white">
      <ProductTop />
    </div>
  </div>
</template>

<style scoped></style>
