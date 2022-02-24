<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-18 16:45:22
 * @LastEditTime: 2022-02-24 17:43:49
 * @Description: 商品选择器
-->
<script setup lang="ts">
  import SelectProductModal from './SelectProductModal.vue';
  import { useModal } from '/@/components/Modal';
  const [registerSelectProductModal, { openModal }] = useModal();

  const emit = defineEmits(['select']);

  function handleCreate() {
    openModal();
  }

  function handleSuccess(value) {
    emit('select', value);
  }
</script>

<template>
  <div class="product-select">
    <a-button type="primary" @click="handleCreate"> 新增 </a-button>
    <SelectProductModal @register="registerSelectProductModal" @success="handleSuccess" />
  </div>
</template>
