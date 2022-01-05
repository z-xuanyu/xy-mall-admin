<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 11:35:23
 * @LastEditTime: 2022-01-05 12:23:15
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref, reactive, unref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './admin.data';
  import { createAdmin, updateAdmin } from '/@/api/admin';

  const emit = defineEmits(['success', 'register']);
  const state = reactive({
    adminId: '',
  });
  const isUpdate = ref(true);
  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 80,
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      state.adminId = data.record._id;
      setFieldsValue({
        ...data.record,
      });
    }
    // 如果编辑不显示密码输入框
    updateSchema({
      field: 'password',
      required: !unref(isUpdate),
      show: !unref(isUpdate),
    });
  });
  const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // 新增
      if (!unref(isUpdate)) {
        await createAdmin(values);
      } else {
        // 编辑
        const data = {
          name: values.name,
          email: values.email,
        };
        await updateAdmin(state.adminId, data);
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
