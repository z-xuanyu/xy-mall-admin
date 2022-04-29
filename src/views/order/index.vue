<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-16 15:22:14
 * @LastEditTime: 2022-04-28 16:32:24
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getOrderList, removeOrder } from '/@/api/order';
  import { searchFormSchema, columns } from './order.data';
  import { Image } from 'ant-design-vue';

  const { createMessage } = useMessage();
  const [registerTable, { reload }] = useTable({
    title: '订单列表',
    api: getOrderList,
    columns,
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
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  // 编辑
  const handleEdit = (record: Recordable) => {
    console.log(record);
    // openDrawer(true, {
    //   record,
    //   isUpdate: true,
    // });
  };
  const handleSuccess = () => {
    reload();
  };
  // 处理删除
  const handleDelete = async (record: Recordable) => {
    await removeOrder(record._id);
    handleSuccess();
    createMessage.success('删除成功!');
  };
</script>

<template>
  <div class="order-page">
    <BasicTable @register="registerTable" :rowSelection="{ type: 'checkbox' }">
      <template #userName="{ record }">
        <router-link :to="'/member/detail/' + record.userId">
          {{ record.userName }}
        </router-link>
      </template>
      <!-- 商品信息 -->
      <template #productInfo="{ record }">
        <div class="flex items-center" v-for="(item, index) in record.products" :key="item._id">
          <Image :src="item.pic" :width="100" :height="100" />
          <div class="ml-2 flex-1">
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
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'icon-park-outline:transaction-order',
              popConfirm: {
                title: '查看详细',
                confirm: handleEdit.bind(null, record),
              },
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>

<style scoped></style>
