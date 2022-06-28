<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 12:26:25
 * @LastEditTime: 2022-06-28 11:27:11
 * @Description: 会员编辑
-->
<script setup lang="ts">
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './member.edit.data';
  import { useMessage } from '/@/hooks/web/useMessage';

  const emit = defineEmits(['success', 'register']);

  // 提示消息
  const { createMessage } = useMessage();
  const userId = ref<number>(0);
  const isUpdate = ref(true);

  // 编辑会员信息表单相关
  const [registerForm, { resetFields, validate, setFieldsValue }] = useForm({
    labelWidth: 80,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  // 编辑会员信息Modal相关
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    // 会员信息编辑更新
    if (unref(isUpdate)) {
      userId.value = data?.record?.userId;
      setFieldsValue({
        ...data.record,
      });
    }
  });

  // 编辑会员信息Modal标题
  const getTitle = computed(() => (!unref(isUpdate) ? '新增会员' : '编辑资料'));

  // 提交
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // 新增
      if (!unref(isUpdate)) {
        // TODO: 待定： 新增会员
      } else {
        // 编辑
        console.log(values);
        createMessage.success('更改成功!');
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
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<style scoped></style>
