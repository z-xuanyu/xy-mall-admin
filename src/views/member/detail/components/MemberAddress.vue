<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-25 15:28:34
 * @LastEditTime: 2022-04-07 11:24:22
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { BasicTable, useTable } from '/@/components/Table';
  import { getMemberUserAddressList } from '/@/api/user';
  import { columns, searchFormSchema } from './address.data';

  const props = defineProps({
    userId: {
      type: String,
      default: '',
    },
  });

  const [registerTable] = useTable({
    api: getMemberUserAddressList,
    columns,
    searchInfo: {
      userId: props.userId,
    },
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
  });
</script>

<template>
  <BasicTable @register="registerTable" />
</template>

<style scoped></style>
