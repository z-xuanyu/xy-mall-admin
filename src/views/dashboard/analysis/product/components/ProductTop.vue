<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-12 10:17:20
 * @LastEditTime: 2022-04-12 11:09:51
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref } from 'vue';
  import { Card, DatePicker, Button, Select, SelectOption } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns } from './product.data';

  const date = ref(null);
  const selectValue = ref('1');
  const [registerTable] = useTable({
    columns,
    pagination: false,
    striped: false,
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    clickToRowSelect: false,
  });

  function handleEdit() {}
</script>

<template>
  <Card :bordered="false">
    <template #title>
      <div class="flex justify-between items-center">
        <span>商品排行</span>
        <div class="space-x-3">
          <Select v-model:value="selectValue" class="w-[150px]">
            <SelectOption value="1">浏览量</SelectOption>
            <SelectOption value="2">访客数</SelectOption>
            <SelectOption value="3">加购件数</SelectOption>
            <SelectOption value="3">下单件数</SelectOption>
            <SelectOption value="4">支付金额</SelectOption>
            <SelectOption value="5">毛利率</SelectOption>
            <SelectOption value="6">收藏数</SelectOption>
            <SelectOption value="7">访客-支付转化率</SelectOption>
          </Select>
          <DatePicker v-model:value="date" />
          <Button type="primary">查询</Button>
        </div>
      </div>
    </template>
    <div class="flex flex-wrap">
      <BasicTable @register="registerTable">
        <template #action="{ record }">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
            ]"
          />
        </template>
      </BasicTable>
    </div>
  </Card>
</template>

<style scoped></style>
