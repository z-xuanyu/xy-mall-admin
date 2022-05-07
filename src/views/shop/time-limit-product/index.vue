<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-16 15:20:46
 * @LastEditTime: 2022-05-06 15:05:52
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { BasicTable, useTable } from '/@/components/Table';
  import { getProductList } from '/@/api/product';
  import { columns, searchFormSchema } from './timeLimitProduct.data';
  import BasicProductSelect from '../components/ProductSelect/BasicProductSelect.vue';
  import { Image, Switch } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { batchUpdateTimeLimitStatus, updateTimeLimitStatus } from '/@/api/product';

  const { createMessage } = useMessage();
  const [registerTable, { reload }] = useTable({
    api: getProductList,
    searchInfo: {
      isTimeLimit: true,
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
    await batchUpdateTimeLimitStatus({ ids: value, status: true });
    reload();
    createMessage.success('添加成功');
  }

  // 取消限时精选
  async function handleColse(id, value) {
    await updateTimeLimitStatus(id, { status: value });
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
    <template #bodyCell="{ column, record }">
      <!-- 商品信息 -->
      <template v-if="column.dataIndex === 'info'">
        <div class="flex items-center">
          <Image :src="record.pic" :width="100" />
          <p class="ml-2">{{ record.title }}</p>
        </div>
      </template>
      <!-- 数据统计 -->
      <template v-if="column.dataIndex === 'statistical'">
        <div>已售数:{{ record.sales }}</div>
        <div>访问数:{{ record.views }}</div>
        <div>收藏数:0</div>
        <div>分数数:0</div>
      </template>
      <!-- 价格 -->
      <template v-if="column.dataIndex === 'price'">
        <div class="text-red-500">
          <span>￥</span><span class="text-xl">{{ record.price }}</span></div
        >
        <div>
          <s class="text-gray-400">￥{{ record.costPrice }}</s>
        </div>
      </template>
      <!-- 是否精选 -->
      <template v-if="column.dataIndex === 'isTimeLimit'">
        <Switch :checked="record.isTimeLimit" @change="handleColse(record._id, $event)" />
      </template>
    </template>
  </BasicTable>
</template>

<style scoped></style>
