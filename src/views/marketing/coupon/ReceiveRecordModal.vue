<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-07-12 14:55:27
 * @LastEditTime: 2022-07-12 15:33:02
 * @Description: 优惠券领取记录弹窗
-->
<script setup lang="ts">
  import { BasicTable, useTable } from '/@/components/Table';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { columns, getReceiveRecordData } from './receiveRecord.data';

  const [registerModal, { setModalProps }] = useModalInner(() => {
    setModalProps({ confirmLoading: false });
  });

  const [registerTable] = useTable({
    api: getReceiveRecordData,
    columns,
    pagination: true,
    striped: false,
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: true,
    canResize: false,
    actionColumn: undefined,
  });
</script>

<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :width="800"
    title="领取记录"
    :footer="null"
  >
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>

<style scoped></style>
