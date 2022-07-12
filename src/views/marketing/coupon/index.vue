<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-16 16:23:27
 * @LastEditTime: 2022-07-12 15:12:25
 * @Description: 优惠券列表
-->
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema, getCunponList } from './coupon.data';
  import CouponModal from './CouponModal.vue';
  import ReceiveRecordModal from './ReceiveRecordModal.vue';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  // 新增优惠券或者编辑优惠券
  const [registerModal, { openModal }] = useModal();
  // 查看优惠券领取记录
  const [receiveRecordModal, { openModal: openReceiveRecordModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '优惠券列表',
    api: getCunponList,
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
    actionColumn: {
      width: 160,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: 'right',
    },
  });

  // 新增优惠券
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }
  // 编辑优惠券
  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  // 成功回调
  function handleSuccess() {
    reload();
  }

  // 删除优惠券
  function handleDelete() {
    handleSuccess();
    createMessage.success('删除成功!');
  }

  // 打开领取记录
  function handleOpenRecord(record: Recordable) {
    openReceiveRecordModal(true, {
      record,
    });
  }
</script>

<template>
  <div class="cunpon-page">
    <BasicTable @register="registerTable" :rowSelection="{ type: 'checkbox' }">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                label: '领取记录',
                onClick: handleOpenRecord.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
                tooltip: '编辑',
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                },
                tooltip: '删除',
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <CouponModal @success="handleSuccess" @register="registerModal" />
    <ReceiveRecordModal @register="receiveRecordModal" />
  </div>
</template>

<style scoped></style>
