<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 12:32:34
 * @LastEditTime: 2022-01-05 16:12:47
 * @Description: 新闻列表
-->
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import NewsDrawer from './NewsDrawer.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useDrawer } from '/@/components/Drawer';
  import { getNewsList, removeNews } from '/@/api/news';
  import { searchFormSchema, columns } from './news.data';
  import { Tag } from 'ant-design-vue';

  const { createMessage } = useMessage();
  const [registerTable, { reload }] = useTable({
    title: '新闻列表',
    api: getNewsList,
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
    await removeNews(record._id);
    handleSuccess();
    createMessage.success('删除成功!');
  };
</script>

<template>
  <div class="news-page">
    <BasicTable @register="registerTable" :rowSelection="{ type: 'checkbox' }">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增新闻 </a-button>
      </template>
      <template #tags="{ record }">
        <div class="space-x-2">
          <Tag color="#2db7f5" v-for="(item, tagIndex) in record.tags" :key="tagIndex">{{
            item
          }}</Tag>
        </div>
      </template>
      <template #content="{ record }">
        <div v-html="record.content" class="overflow-hidden"></div>
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
    <NewsDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<style scoped></style>
