<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-17 09:55:19
 * @LastEditTime: 2022-04-15 15:37:10
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref, unref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './classify-navigation.data';
  import UploadImage from '/@/views/media-library/UploadImage.vue';
  import { createClassifyNavigation, updateClassifyNavigation } from '/@/api/classify-navigation';

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
        pic: [data.record.pic],
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
      values.pic = values.pic[0];
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
        <UploadImage v-model="model[field]" />
      </template>
    </BasicForm>
  </BasicModal>
</template>
