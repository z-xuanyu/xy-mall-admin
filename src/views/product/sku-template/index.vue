<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-19 16:58:30
 * @LastEditTime: 2022-05-06 17:39:15
 * @Description: 产品规格模板
-->
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema } from './skuTemplate.data';
  import { getProductSkuTemplateList } from '/@/api/sku-template';
  import SkuTemplateModal from './SkuTemplateModal.vue';
  import { useModal } from '/@/components/Modal';

  const [registerModal, { openModal }] = useModal();

  const [registerTable, { reload }] = useTable({
    title: '规格模板列表',
    columns,
    api: getProductSkuTemplateList,
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
  <div class="sku-template-page">
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
    <SkuTemplateModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
