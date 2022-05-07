<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-02 15:57:14
 * @LastEditTime: 2022-05-06 17:17:12
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema } from './unit.data';
  import { getProductUnits } from '/@/api/product-unit';
  import UnitModal from './UnitModal.vue';
  import { useModal } from '/@/components/Modal';

  const [registerModal, { openModal }] = useModal();

  const [registerTable, { reload }] = useTable({
    title: '商品单位列表',
    columns,
    api: getProductUnits,
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
  function handleDelete() {
    reload();
  }

  // 成功
  function handleSuccess() {
    reload();
  }
</script>

<template>
  <div class="unit-page">
    <BasicTable @register="registerTable" :rowSelection="{ type: 'checkbox' }">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
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
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <UnitModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<style scoped></style>
