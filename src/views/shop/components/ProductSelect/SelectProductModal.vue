<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-18 16:51:44
 * @LastEditTime: 2022-05-06 15:15:57
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getProductList } from '/@/api/product';
  import { columns, searchFormSchema } from './product.data';
  import { Image } from 'ant-design-vue';

  const [registerModal, { closeModal }] = useModalInner();

  const emit = defineEmits(['success', 'register']);

  const [registerProductTable, { getSelectRowKeys }] = useTable({
    rowKey: '_id',
    api: getProductList,
    columns,
    pagination: true,
    striped: false,
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    clickToRowSelect: true,
  });
  // 提交确认
  function onConfirm() {
    const ids = getSelectRowKeys();
    emit('success', ids);
    closeModal();
  }
</script>

<template>
  <BasicModal
    v-bind="$attrs"
    title="选择商品"
    @register="registerModal"
    width="80%"
    @ok="onConfirm"
  >
    <BasicTable @register="registerProductTable" :rowSelection="{ type: 'checkbox' }">
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
        <template v-if="column.dataIndex === 'price'">
          <div class="text-red-500">
            <span>￥</span><span class="text-xl">{{ record.price }}</span></div
          >
          <div>
            <s class="text-gray-400">￥{{ record.costPrice }}</s>
          </div>
        </template>
      </template>
    </BasicTable>
  </BasicModal>
</template>

<style scoped></style>
