<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-16 15:20:46
 * @LastEditTime: 2022-02-24 18:22:57
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { BasicTable, useTable } from '/@/components/Table';
  import { getProductList } from '/@/api/product';
  import { columns, searchFormSchema } from './hot-product.data';
  import BasicProductSelect from '../components/ProductSelect/BasicProductSelect.vue';
  import { Image, Switch } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { batchUpdateHotStatus, updateHotStatus } from '/@/api/product';

  const { createMessage } = useMessage();
  const [registerTable, { reload }] = useTable({
    api: getProductList,
    searchInfo: {
      isHot: true,
    },
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    pagination: true,
    striped: false,
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    clickToRowSelect: false,
  });

  // 添加选择
  async function handleSelectRes(value) {
    await batchUpdateHotStatus({ ids: value, status: true });
    reload();
    createMessage.success('添加成功');
  }

  // 取消热门
  async function handleColseHot(id, value) {
    await updateHotStatus(id, { status: value });
    reload();
    createMessage.success('取消成功');
  }
</script>

<template>
  <BasicTable @register="registerTable" :rowSelection="{ type: 'checkbox' }">
    <!-- 选择商品 -->
    <template #toolbar>
      <BasicProductSelect @select="handleSelectRes" />
    </template>
    <!-- 商品信息 -->
    <template #info="{ record }">
      <div class="flex items-center">
        <Image :src="record.pic" :width="100" />
        <p class="ml-2">{{ record.title }}</p>
      </div>
    </template>
    <!-- 数据统计 -->
    <template #statistical="{ record }">
      <div>已售数:{{ record.sales }}</div>
      <div>访问数:{{ record.views }}</div>
      <div>收藏数:0</div>
      <div>分数数:0</div>
    </template>
    <!-- 价格 -->
    <template #price="{ record }">
      <div class="text-red-500">
        <span>￥</span
        ><span class="text-xl">{{
          record.skuType == 1 ? record.price : record.sku && record.sku[0].skuValues[0].price
        }}</span></div
      >
      <div>
        <s class="text-gray-400"
          >￥{{
            record.skuType == 1
              ? record.costPrice
              : record.sku && record.sku[0].skuValues[0].costPrice
          }}</s
        >
      </div>
    </template>
    <template #isHot="{ record }">
      <Switch :checked="record.isHot" @change="handleColseHot(record._id, $event)" />
    </template>
  </BasicTable>
</template>

<style scoped></style>
