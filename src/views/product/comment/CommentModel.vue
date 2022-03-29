<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-29 15:50:42
 * @LastEditTime: 2022-03-29 18:13:43
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './comment.data';
  import { replyProductComment } from '/@/api/product-comment';

  const emits = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const commentId = ref(null);
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 80,
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      commentId.value = data?.record?._id;
      setFieldsValue({
        ...data.record,
      });
    }
  });
  const getTitle = computed(() => (!unref(isUpdate) ? '回复信息' : '回复评论'));
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // 新增
      if (!unref(isUpdate)) {
        console.log(values);
      } else {
        // 编辑
        await replyProductComment(commentId.value, { content: values.replyContent });
      }
      closeModal();
      emits('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<style scoped></style>
