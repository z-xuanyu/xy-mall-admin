<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-29 15:35:38
 * @LastEditTime: 2022-03-29 18:12:05
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import { columns, searchFormSchema } from './comment.data';
  import { getProductComments, removeProductComment } from '/@/api/product-comment';
  import CommentModel from './CommentModel.vue';
  import { Image } from 'ant-design-vue';

  const { createMessage } = useMessage();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '商品评价',
    api: getProductComments,
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
  });

  // 回复
  const handleEdit = (record: Recordable) => {
    openModal(true, {
      record,
      isUpdate: true,
    });
  };
  const handleSuccess = () => {
    createMessage.success('回复成功!');
    reload();
  };
  // 处理删除
  const handleDelete = async (record: Recordable) => {
    await removeProductComment(record._id);
    reload();
    createMessage.success('删除成功!');
  };
</script>

<template>
  <div class="product-comment">
    <BasicTable @register="registerTable">
      <template #productInfo="{ record }">
        <div class="flex items-center">
          <Image :src="record.product.pic" :width="100" />
          <p class="ml-2">{{ record.product.title }}</p>
        </div>
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
    <CommentModel @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<style scoped></style>
