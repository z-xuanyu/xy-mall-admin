<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 12:24:45
 * @LastEditTime: 2022-06-28 11:48:29
 * @Description: 用户列表
-->
<script setup lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getMemberList, deleteMember } from '/@/api/user';
  import { columns, searchFormSchema } from './member.data';
  import { useGo } from '/@/hooks/web/usePage';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import MemberModal from './MemberModal.vue';

  const [registerModal, { openModal }] = useModal();

  const go = useGo();
  const { createMessage } = useMessage();
  const [registerMemberTable, { reload }] = useTable({
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

  // 编辑用户信息
  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  // 删除用户
  async function handleDelete(record: Recordable) {
    await deleteMember(record._id);
    reload();
    createMessage.success('删除成功!');
  }

  // 跳转用户详情页面
  function jumpDetail(record: Recordable) {
    go(`detail/${record._id}`);
  }

  // 更新完成
  function handleSuccess() {
    reload();
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
    <MemberModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<style scoped></style>
