<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-25 18:25:14
 * @LastEditTime: 2022-03-28 14:41:12
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema } from './menu.data';
  import { getMenus, removeMenu } from '/@/api/menu';
  import { useModal } from '/@/components/Modal';
  import MenuModal from './MenuModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { TransformTreeArr } from '/@/utils';

  const { createMessage } = useMessage();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '菜单列表',
    api: getMenus,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    pagination: true,
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
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
    // 请求后数据结构转换tree
    afterFetch: (res) => {
      return TransformTreeArr(res);
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
    await removeMenu(record._id);
    reload();
    createMessage.success('删除成功!');
  };
</script>

<template>
  <div class="menu-page">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
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
    <MenuModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<style scoped></style>
