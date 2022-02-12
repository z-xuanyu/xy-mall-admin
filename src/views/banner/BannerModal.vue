<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 11:35:23
 * @LastEditTime: 2022-02-11 18:15:29
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref, unref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './banner.data';
  import { createBanner, updateBanner } from '/@/api/banner';
  import UploadImage from '/@/views/media-library/UploadImage.vue';

  const emit = defineEmits(['success', 'register']);
  const bannerId = ref<string>('');
  const bannerImg = ref([]);
  const isUpdate = ref(true);
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
      bannerId.value = data.record._id;
      bannerImg.value = [data.record.image];
      setFieldsValue({
        ...data.record,
      });
    } else {
      bannerImg.value = [];
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增Banner' : '编辑Banner'));
  async function handleSubmit() {
    // 选择图片
    if (bannerImg.value.length) {
      setFieldsValue({
        image: bannerImg.value[0],
      });
    }

    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // 新增
      if (!unref(isUpdate)) {
        const data = { ...values, image: bannerImg.value[0] };
        await createBanner(data);
      } else {
        // 编辑
        const data = { ...values, image: bannerImg.value[0] };
        await updateBanner(bannerId.value, data);
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
      <template #image>
        <UploadImage v-model="bannerImg" />
      </template>
    </BasicForm>
  </BasicModal>
</template>

<style scoped></style>
