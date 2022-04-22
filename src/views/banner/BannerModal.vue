<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 11:35:23
 * @LastEditTime: 2022-04-22 11:14:53
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref, unref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm, ApiSelect } from '/@/components/Form/index';
  import { formSchema } from './banner.data';
  import { createBanner, updateBanner } from '/@/api/banner';
  import { getProductList } from '/@/api/product';
  import UploadImage from '/@/views/media-library/UploadImage.vue';

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
        image: [data?.record?.image],
        product: data?.record?.product?._id,
      });
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

  // 下拉选择搜索产品关键词
  const keyword = ref<string>('');
  const productSearchParams = computed<Recordable>(() => {
    return { title: unref(keyword) };
  });

  // 搜索产品
  function onSearchProduct(value: string) {
    keyword.value = value;
  }

  const getTitle = computed(() => (!unref(isUpdate) ? '新增Banner' : '编辑Banner'));
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      values.image = values.image[0];
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
        <UploadImage v-model="model[field]" />
      </template>
      <template #product="{ model, field }">
        <ApiSelect
          :api="getProductList"
          showSearch
          v-model:value="model[field]"
          :filterOption="false"
          resultField="items"
          labelField="title"
          valueField="_id"
          placeholder="请选择关联产品"
          :params="productSearchParams"
          @search="onSearchProduct"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>

<style scoped></style>
