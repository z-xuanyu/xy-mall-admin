<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-05-05 15:57:13
 * @LastEditTime: 2022-05-05 16:51:03
 * @Description: 订单详细商品信息
-->
<script setup lang="ts">
  import { ref } from 'vue';
  import { Table, Image } from 'ant-design-vue';

  const dataSource = ref([
    {
      key: '1',
      info: 'RuYi系列如意钻石戒指项链耳饰18K镶钻白贝钻石套装 | VVS/极微瑕,戒指 现货,D-E/极白,60分',
      price: 7999,
      num: 1,
      total: '7999.00',
    },
    {
      key: '2',
      info: 'RuYi系列如意钻石戒指项链耳饰18K镶钻白贝钻石套装 | VVS/极微瑕,戒指 现货,D-E/极白,60分',
      price: 7999,
      num: 1,
      total: '7999.00',
    },
  ]);

  const columns = ref([
    {
      title: '商品信息',
      dataIndex: 'info',
      key: 'info',
      align: 'center',
      slots: { customRender: 'info' },
      width: 600,
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
    },
    {
      title: '数量',
      dataIndex: 'num',
      key: 'num',
      align: 'center',
    },
    {
      title: '小计',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
    },
  ]);
</script>

<template>
  <Table :bordered="true" :dataSource="dataSource" :pagination="false" :columns="columns">
    <template #info="{ text }">
      <div class="flex items-center">
        <Image
          :width="50"
          src="https://qiniu.crmeb.net/attach/2021/12/18/5a2872389669ca7c151d04d99d8bd714.jpg?imageView2/2/w/300/h/300"
        />
        <p class="text-left ml-2">{{ text }}</p>
      </div>
    </template>
  </Table>
</template>

<style scoped></style>
