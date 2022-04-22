<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-22 10:54:52
 * @LastEditTime: 2022-04-22 11:54:01
 * @Description: 添加/编剧客服弹出层
-->
<script setup lang="ts">
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './customerService.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { createCustomerService, updateCustomerService } from '/@/api/customer-service';
  import UploadImage from '/@/views/media-library/UploadImage.vue';

  const emit = defineEmits(['success', 'register']);

  const customerServiceId = ref('');

  const { createMessage } = useMessage();
  const isUpdate = ref(true);
  const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      customerServiceId.value = data.record._id;
      updateSchema([
        {
          field: 'password',
          required: false,
          rules: [{ required: false }],
          componentProps: {
            placeholder: '不修改密码请留空',
          },
        },
        {
          field: 'password2',
          required: false,
          rules: [{ required: false }],
          componentProps: {
            placeholder: '不修改密码请留空',
          },
        },
      ]);
      setFieldsValue({
        ...data.record,
        avatar: [data?.record?.avatar],
        password: '',
        password2: '',
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      values.avatar = values.avatar.join();
      // 新增
      if (!unref(isUpdate)) {
        await createCustomerService(values);
        createMessage.success('添加成功!');
      } else {
        // 编辑
        await updateCustomerService(customerServiceId.value, values);
        createMessage.success('编辑成功!');
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
      <template #avatar="{ model, field }">
        <UploadImage v-model="model[field]" />
      </template>
    </BasicForm>
  </BasicModal>
</template>

<style scoped></style>
