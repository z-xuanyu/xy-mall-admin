<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-17 09:55:19
 * @LastEditTime: 2022-07-08 11:06:22
 * @Description: 导航分类Modal
-->
<script setup lang="ts">
  import { ref, unref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm, ApiSelectMediaCard } from '/@/components/Form/index';
  import { formSchema } from './classify-navigation.data';
  import { createClassifyNavigation, updateClassifyNavigation } from '/@/api/classify-navigation';
  import { getMediaLibraryList } from '/@/api/media-library';
  import { getLibraryCategoryList } from '/@/api/library-category';

  const emit = defineEmits(['success', 'register']);
  const navigationId = ref<string>('');
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
      navigationId.value = data.record._id;
      setFieldsValue({
        ...data.record,
      });
    }

    updateSchema({
      field: 'pagePath',
      required: data?.record?.type == 1,
      show: data?.record?.type == 1,
    });

    updateSchema({
      field: 'url',
      required: data?.record?.type == 2,
      show: data?.record?.type == 2,
    });
  });
  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // 新增
      if (!unref(isUpdate)) {
        await createClassifyNavigation(values);
      } else {
        // 编辑
        await updateClassifyNavigation(navigationId.value, values);
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
      <template #pic="{ model, field }">
        <ApiSelectMediaCard
          v-model:value="model[field]"
          :api="getMediaLibraryList"
          :category-api="getLibraryCategoryList"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
