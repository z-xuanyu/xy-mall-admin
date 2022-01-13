<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 12:31:34
 * @LastEditTime: 2022-01-11 15:40:35
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import BannerModal from './BannerModal.vue';
  import { useModal } from '/@/components/Modal';
  import { getBannerList, removeBanner } from '/@/api/banner';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { searchFormSchema, columns } from './banner.data';

  const { createMessage } = useMessage();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: 'Banner列表',
    api: getBannerList,
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
    await removeBanner(record._id);
    handleSuccess();
    createMessage.success('删除成功!');
  };
</script>
<template>
  <div class="banner-page">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增账号 </a-button>
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
    <BannerModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<style scoped></style>
