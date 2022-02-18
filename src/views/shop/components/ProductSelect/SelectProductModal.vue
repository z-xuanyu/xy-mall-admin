<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-18 16:51:44
 * @LastEditTime: 2022-02-18 17:12:23
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';

  const [registerModal, { closeModal }] = useModalInner();

  // 提交确认
  function onConfirm() {
    closeModal();
  }
</script>

<template>
  <BasicModal
    v-bind="$attrs"
    title="选择商品"
    @register="registerModal"
    width="1000px"
    @ok="onConfirm"
    @visible-change="handleVisibleChange"
/></template>

<style scoped></style>
