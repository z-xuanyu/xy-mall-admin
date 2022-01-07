<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-07 15:56:23
 * @LastEditTime: 2022-01-07 17:47:45
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema, TransformTreeArr } from './data';
  import {
    createLibraryCategory,
    getLibraryCategoryList,
    updateLibraryCategory,
  } from '/@/api/library-category';
  import { useMessage } from '/@/hooks/web/useMessage';

  const emit = defineEmits(['success', 'register']);

  const categoryId = ref<string>('');
  const { createMessage } = useMessage();
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
      categoryId.value = data.record._id;
      setFieldsValue({
        ...data.record,
      });
    }

    // 上级关联分类
    const categoryList = await getLibraryCategoryList();
    const treeData = TransformTreeArr(categoryList);
    updateSchema({
      field: 'parentId',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增分类' : '编辑分类'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // 新增
      if (!unref(isUpdate)) {
        await createLibraryCategory(values);
        createMessage.success('添加成功!');
      } else {
        // 编辑
        await updateLibraryCategory(categoryId.value, values);
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
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
