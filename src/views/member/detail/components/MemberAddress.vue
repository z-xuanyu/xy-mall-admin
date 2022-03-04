<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-25 15:28:34
 * @LastEditTime: 2022-02-28 15:42:28
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { BasicTable, useTable } from '/@/components/Table';
  import { getMemberUserAddressList } from '/@/api/user';
  import { columns } from './address.data';
  const [registerTable] = useTable({
    api: getMemberUserAddressList,
    columns,
    pagination: true,
    striped: false,
    useSearchForm: false,
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
