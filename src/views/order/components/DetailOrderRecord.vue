<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-05-05 15:57:13
 * @LastEditTime: 2022-05-05 16:50:58
 * @Description: 订单记录
-->
<script setup lang="ts">
  import { ref } from 'vue';
  import { Table } from 'ant-design-vue';

  const dataSource = ref([
    {
      key: '1',
      orderId: '2967',
      record: '用户付款成功',
      time: '2022-05-05 15:07:02',
    },
    {
      key: '2',
      orderId: '2967',
      record: '订单生成',
      time: '2022-05-05 15:07:05',
    },
  ]);

  const columns = ref([
    {
      title: '订单ID',
      dataIndex: 'orderId',
      key: 'orderId',
      align: 'center',
    },
    {
      title: '操作记录',
      dataIndex: 'record',
      key: 'record',
      align: 'center',
    },
    {
      title: '操作时间',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
    },
  ]);
</script>

<template>
  <Table :bordered="true" :dataSource="dataSource" :pagination="false" :columns="columns" />
</template>

<style scoped></style>
