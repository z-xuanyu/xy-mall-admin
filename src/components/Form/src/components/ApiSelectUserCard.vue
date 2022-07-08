<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-07-08 14:54:16
 * @LastEditTime: 2022-07-08 17:31:52
 * @Description: 用户选择卡片
-->
<script setup lang="ts">
  import { Modal, Avatar, Table } from 'ant-design-vue';
  import { ref, h, watchEffect, type PropType } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table/index';
  import { getMemberList, getMemberListByIds } from '/@/api/user';

  const props = defineProps({
    value: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  });

  const emit = defineEmits(['update:value']);

  const userIds = ref<string[]>([]);
  const userList = ref<any[]>([]);

  // 批量获取用户信息
  async function fetchData() {
    const res = await getMemberListByIds(userIds.value);
    userList.value = res;
  }

  watchEffect(()=> {
    userIds.value = props.value;
  });
  const visible = ref(false);

  const [registerTable, { getSelectRowKeys }] = useTable({
    rowKey:'_id',
    api: getMemberList,
    columns: [
      {
        title: '用户ID',
        dataIndex: '_id',
        width: 160,
        align: 'left',
      },
      {
        title: '用户头像',
        dataIndex: 'avatarUrl',
        width: 160,
        align: 'center',
        customRender: ({ record }) => {
          return h(Avatar, {
            src: record.avatarUrl,
            width: 40,
          });
        },
      },
      {
        title: '用户昵称',
        dataIndex: 'nickName',
        width: 160,
        align: 'center',
      },
    ],
    formConfig: {
      labelWidth: 120,
      schemas: [
        {
          field: 'nickName',
          label: '用户昵称:',
          component: 'Input',
          labelWidth: 80,
          colProps: {
            span: 10,
          },
          componentProps: {
            placeholder: '请输入用户昵称',
          },
        },
      ],
    },
    pagination: true,
    striped: false,
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    actionColumn: undefined,
  });

  // 打开选择卡片弹窗
  function handleOpen() {
    visible.value = true;
  }

  // 确认提交
  function handleOk() {
    const keys = getSelectRowKeys();
    userIds.value = keys;
    fetchData();
    visible.value = false;
    emit('update:value', userIds.value);
  }

  // 关闭
  function onClose() {
    visible.value = false;
  }

  const columns: any = [
      {
        title: '用户ID',
        dataIndex: '_id',
        width: '120px',
        align: 'left',
      },
      {
        title: '用户昵称',
        dataIndex: 'nickName',
        align: 'center',
      },
      {
        title: '用户头像',
        dataIndex: 'avatarUrl',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'actions',
        align: 'left',
      },

  ]

  // 删除选中的用户
  function handleDelSelect(record) {
    console.log(record, '4546');
    const index = userIds.value.indexOf(record._id);
    if (index > -1) {
      userIds.value.splice(index, 1);
      userList.value.splice(index, 1);
    }
    emit('update:value', userIds.value);
  }
</script>

<template>
  <div>
    <a-button @click="handleOpen" type="primary" ghost>选择用户</a-button>
    <Modal
      v-model:visible="visible"
      width="800px"
      title="选择用户"
      @ok="handleOk"
      @cancel="onClose"
      :maskClosable="false"
    >
      <BasicTable @register="registerTable" :rowSelection="{ type: 'checkbox' }" />
    </Modal>
    <!-- 选中用户信息 -->
    <div class="w-[700px] mt-4">
      <Table bordered :pagination="false" :data-source="userList" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'avatarUrl'">
            <Avatar :src="record.avatarUrl" :width="40" />
          </template>
          <template v-if="column.dataIndex === 'actions'">
            <a @click="handleDelSelect(record)">删除</a>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>

<style scoped></style>
