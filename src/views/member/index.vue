<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 12:24:45
 * @LastEditTime: 2022-05-06 17:01:47
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getMemberList } from '/@/api/user';
  import { columns, searchFormSchema } from './member.data';
  import { useGo } from '/@/hooks/web/usePage';

  const go = useGo();
  const [registerMemberTable] = useTable({
    title: '会员列表',
    api: getMemberList,
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

  function handleEdit() {}

  function handleDelete() {}

  function jumpDetail(record) {
    go(`detail/${record._id}`);
  }
</script>

<template>
  <div class="member-page">
    <BasicTable @register="registerMemberTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
                tooltip: '编辑',
              },
              {
                icon: 'mdi:card-account-details-outline',
                onClick: jumpDetail.bind(null, record),
                tooltip: '详情',
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                },
                tooltip: '删除',
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>

<style scoped></style>
