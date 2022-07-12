<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-07-12 10:11:49
 * @LastEditTime: 2022-07-12 14:22:27
 * @Description: 用户领取记录
-->
<script setup lang="ts">
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns, getCouponRecord, searchFormSchema } from './record.data';

  const [registerTable] = useTable({
    title: '记录列表',
    api: getCouponRecord,
    columns,
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
    },
    pagination: true,
    striped: false,
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    actionColumn: undefined,
  });
</script>

<template>
  <div class="coupon-record">
    <BasicTable @register="registerTable" :rowSelection="{ type: 'checkbox' }" />
  </div>
</template>

<style scoped></style>
