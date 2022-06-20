<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-25 15:10:55
 * @LastEditTime: 2022-06-20 14:29:20
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns, searchFormSchema } from './order.data';
  import { getUserOrders } from '/@/api/order';
  import { Image } from 'ant-design-vue';

  const props = defineProps({
    userId: {
      type: String,
      default: '',
    },
  });

  const [registerTable] = useTable({
    columns,
    api: getUserOrders,
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
  <BasicTable @register="registerTable">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'products'">
        <div class="flex items-center" v-for="(item, index) in record.products" :key="item._id">
          <Image :src="item.pic" :width="60" :height="60" />
          <div class="ml-2 flex-1 text-left">
            <div>{{ item.title }}</div>
            <div class="space-x-4 mt-1">
              <span class="text-gray-400">{{ record.skus[index].skuName }}</span>
              <span>x</span>
              <span>{{ record.skus[index].num }}</span>
              <span class="font-medium">￥{{ record.skus[index].price }}</span>
            </div>
          </div>
        </div>
      </template>
    </template>
  </BasicTable>
</template>

<style scoped></style>
