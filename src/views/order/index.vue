<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-16 15:22:14
 * @LastEditTime: 2022-05-07 11:18:00
 * @Description: 订单列表
-->
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getOrderList, removeOrder } from '/@/api/order';
  import { searchFormSchema, columns } from './order.data';
  import { useModal } from '/@/components/Modal';
  import { useDrawer } from '/@/components/Drawer';
  import { Image } from 'ant-design-vue';
  import DeliveryModal from './DeliveryModal.vue';
  import DetailDrawer from './DetailDrawer.vue';

  const { createMessage } = useMessage();
  const [registerDetailDrawer, { openDrawer: openDetailDrawer }] = useDrawer();
  const [registerDeliveryModal, { openModal: openDeliveryModal }] = useModal();
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
    clickToRowSelect: false,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: 'right',
    },
  });

  // 订单详细
  function handleLookDetail(record: Recordable) {
    openDetailDrawer(true, {
      record,
    });
  }
  // 处理发货
  function handleDelivery(record: Recordable) {
    openDeliveryModal(true, {
      record,
    });
  }
  // 成功
  function handleSuccess() {
    reload();
  }
  // 处理删除
  async function handleDelete(record: Recordable) {
    await removeOrder(record._id);
    handleSuccess();
    createMessage.success('删除成功!');
  }
</script>

<template>
  <div class="order-page">
    <BasicTable @register="registerTable" :rowSelection="{ type: 'checkbox' }">
      <template #bodyCell="{ column, record }">
        <!-- 用户信息 -->
        <template v-if="column.dataIndex === 'userName'">
          <router-link :to="'/member/detail/' + record.userId">
            {{ record.userName }}
          </router-link>
        </template>
        <!-- 商品信息 -->
        <template v-if="column.dataIndex === 'productInfo'">
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
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                label: '发送货',
                onClick: handleDelivery.bind(null, record),
                ifShow: record.status == 2,
              },
              {
                icon: 'icon-park-outline:transaction-order',
                tooltip: '订单详细',
                onClick: handleLookDetail.bind(null, record),
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
      </template>
    </BasicTable>
    <!-- 发货modal -->
    <DeliveryModal @register="registerDeliveryModal" @success="handleSuccess" />
    <!-- 订单详细 -->
    <DetailDrawer @register="registerDetailDrawer" />
  </div>
</template>

<style scoped></style>
