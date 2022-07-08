<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 11:35:23
 * @LastEditTime: 2022-07-08 10:57:11
 * @Description: BannerModal
-->
<script setup lang="ts">
  import { ref, unref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import {
    BasicForm,
    useForm,
    ApiSelectMediaCard,
    ApiSelectProduct,
  } from '/@/components/Form/index';
  import { formSchema } from './banner.data';
  import { createBanner, updateBanner } from '/@/api/banner';
  import { getMediaLibraryList } from '/@/api/media-library';
  import { getLibraryCategoryList } from '/@/api/library-category';
  import { getProductList } from '/@/api/product';

  const emit = defineEmits(['success', 'register']);
  const bannerId = ref<string>('');
  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
    labelWidth: 80,
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      bannerId.value = data?.record?._id;
      setFieldsValue({
        ...data.record,
        product: data?.record?.product?._id,
      });

      console.log('banner modal');
    }

    updateSchema({
      field: 'url',
      required: data?.record?.type == 1,
      show: data?.record?.type == 1,
    });

    updateSchema({
      field: 'product',
      required: data?.record?.type == 2,
      show: data?.record?.type == 2,
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增Banner' : '编辑Banner'));
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // 新增
      if (!unref(isUpdate)) {
        await createBanner(values);
      } else {
        // 编辑
        await updateBanner(bannerId.value, values);
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #image="{ model, field }">
        <ApiSelectMediaCard
          v-model:value="model[field]"
          :api="getMediaLibraryList"
          :category-api="getLibraryCategoryList"
        />
      </template>
      <template #product="{ model, field }">
        <ApiSelectProduct v-model:value="model[field]" :api="getProductList" />
      </template>
    </BasicForm>
  </BasicModal>
</template>

<style scoped></style>
