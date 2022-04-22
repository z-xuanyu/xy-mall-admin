<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-04 14:05:47
 * @LastEditTime: 2022-04-22 12:13:52
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema } from './customerService.data';
  import { getCustomerServices, removeCustomerService } from '/@/api/customer-service';
  import CustomerServiceModal from './CustomerServiceModal.vue';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useGo } from '/@/hooks/web/usePage';
  const go = useGo();

  const { createMessage } = useMessage();

  const [registerModal, { openModal }] = useModal();

  const [registerTable, { reload }] = useTable({
    title: '客服列表',
    columns,
    api: getCustomerServices,
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
      width: 80,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: 'right',
    },
  });

  // 新增
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }
  // 编辑
  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  // 删除
  async function handleDelete(record: Recordable) {
    await removeCustomerService(record._id);
    reload();
    createMessage.success('删除成功!');
  }

  // 成功
  function handleSuccess() {
    reload();
  }

  // 跳转聊天工作台
  function jumpChat(record: Recordable) {
    go(`/customer-service/chat?id=${record._id}`);
  }
</script>

<template>
  <div>
    <BasicTable @register="registerTable" :rowSelection="{ type: 'checkbox' }">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
            {
              label: '进入工作台',
              onClick: jumpChat.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <CustomerServiceModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<style scoped></style>
