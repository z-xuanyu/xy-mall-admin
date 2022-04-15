<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-16 15:21:17
 * @LastEditTime: 2022-04-15 15:37:03
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import ClassifyNavigationModal from './ClassifyNavigationModal.vue';
  import { useModal } from '/@/components/Modal';
  import { getClassifyNavigationList, removeClassifyNavigation } from '/@/api/classify-navigation';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { searchFormSchema, columns } from './classify-navigation.data';

  const { createMessage } = useMessage();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '导航列表',
    api: getClassifyNavigationList,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    pagination: true,
    striped: false,
    useSearchForm: true,
    clickToRowSelect: false,
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
    openModal(true, {
      record,
      isUpdate: true,
    });
  };
  // 添加
  const handleCreate = () => {
    openModal(true, {
      isUpdate: false,
    });
  };
  const handleSuccess = () => {
    reload();
  };
  // 处理删除
  const handleDelete = async (record: Recordable) => {
    await removeClassifyNavigation(record._id);
    handleSuccess();
    createMessage.success('删除成功!');
  };
</script>

<template>
  <div class="classify-navigation-page">
    <BasicTable @register="registerTable" :rowSelection="{ type: 'checkbox' }">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 添加 </a-button>
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
          ]"
        />
      </template>
    </BasicTable>
    <ClassifyNavigationModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
