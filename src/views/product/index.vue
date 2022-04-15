<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 12:33:22
 * @LastEditTime: 2022-04-15 15:53:05
 * @Description: 产品列表
-->

<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useDrawer } from '/@/components/Drawer';
  import { getProductList, removeProduct } from '/@/api/product';
  import { searchFormSchema, columns } from './product.data';
  import ProductDrawer from './ProductDrawer.vue';

  const { createMessage } = useMessage();
  const [registerTable, { reload }] = useTable({
    title: '商品列表',
    api: getProductList,
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
    clickToRowSelect: false,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: 'right',
    },
  });

  const [registerDrawer, { openDrawer }] = useDrawer();

  // 编辑
  const handleEdit = (record: Recordable) => {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  };
  // 添加
  const handleCreate = () => {
    openDrawer(true, {
      isUpdate: false,
    });
  };
  const handleSuccess = () => {
    reload();
  };
  // 处理删除
  const handleDelete = async (record: Recordable) => {
    await removeProduct(record._id);
    handleSuccess();
    createMessage.success('删除成功!');
  };
</script>

<template>
  <div class="product-page">
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
              tooltip: '编辑商品',
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除商品',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <ProductDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<style scoped></style>
