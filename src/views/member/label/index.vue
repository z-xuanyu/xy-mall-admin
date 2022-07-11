<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-07-11 09:56:52
 * @LastEditTime: 2022-07-11 15:58:05
 * @Description: 用户标签
-->
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchSchema, getUserLabels, memberLabelType } from './label.data';
  import { useModal } from '/@/components/Modal';
  import { watch } from 'vue';
  import LabelModal from './LabelModal.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getUserLabels,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchSchema,
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

  // 标签类型变化
  watch(memberLabelType, () => {
    reload();
  });

  // 添加标签
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }
  // 编辑标签
  function handleEdit(record: Recordable) {
    openModal(true, {
      isUpdate: true,
      record,
    });
  }
  // 删除标签
  function handleDelete(record: Recordable) {
    console.log(record);
  }

  // 成功
  function handleSuccess() {
    reload();
  }
</script>

<template>
  <div class="member-label">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增标签 </a-button>
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
    <LabelModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<style scoped></style>
