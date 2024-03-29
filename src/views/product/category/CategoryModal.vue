<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 16:53:51
 * @LastEditTime: 2022-07-08 11:45:44
 * @Description: 商品分类
-->
<script setup lang="ts">
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm, ApiSelectMediaCard } from '/@/components/Form/index';
  import { formSchema } from './category.data';
  import { TransformTreeArr } from '/@/utils';
  import { createCategory, getCategoryList, updateCategory } from '/@/api/category';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getMediaLibraryList } from '/@/api/media-library';
  import { getLibraryCategoryList } from '/@/api/library-category';

  const emit = defineEmits(['success', 'register']);

  const categoryId = ref<string>('');
  const { createMessage } = useMessage();
  const isUpdate = ref(true);
  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 60,
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
    const categoryList = await getCategoryList();
    const treeData = TransformTreeArr(categoryList.items);
    updateSchema({
      field: 'parentId',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // 新增
      if (!unref(isUpdate)) {
        await createCategory(values);
        createMessage.success('添加成功!');
      } else {
        // 编辑
        await updateCategory(categoryId.value, values);
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
      <template #thumbnail="{ model, field }">
        <ApiSelectMediaCard
          v-model:value="model[field]"
          :api="getMediaLibraryList"
          :category-api="getLibraryCategoryList"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>

<style scoped></style>
