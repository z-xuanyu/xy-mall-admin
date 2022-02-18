<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-16 15:20:46
 * @LastEditTime: 2022-02-18 17:34:28
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { BasicTable, useTable } from '/@/components/Table';
  import { getProductList } from '/@/api/product';
  import { columns, searchFormSchema } from './hot-product.data';
  import BasicProductSelect from '../components/ProductSelect/BasicProductSelect.vue';

  const [registerTable, { reload }] = useTable({
    api: getProductList,
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

  // 添加
  const handleCreate = () => {
    reload();
  };
</script>

<template>
  <BasicTable @register="registerTable" :rowSelection="{ type: 'checkbox' }">
    <template #toolbar>
      <BasicProductSelect />
    </template>
  </BasicTable>
</template>

<style scoped></style>
