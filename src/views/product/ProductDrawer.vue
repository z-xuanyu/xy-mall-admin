<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-13 11:52:45
 * @LastEditTime: 2022-02-12 17:42:44
 * @Description: 添加或者编辑产品
-->
<script setup lang="ts">
  import { ref, unref, computed } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import UploadImage from '/@/views/media-library/UploadImage.vue';
  import ProductSkuForm from './components/ProductSkuForm.vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { formSchema } from './product.data';
  import { createProduct, updateProduct } from '/@/api/product';
  import { getCategoryList } from '/@/api/category';
  import { TransformTreeArr } from '/@/utils';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();
  let isUpdate = ref<boolean>(true);
  let productId = ref<string>('');
  const productPic = ref([]);

  //    提交表单
  const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
    labelWidth: 120,
    showResetButton: false,
    showSubmitButton: false,
    schemas: formSchema,
    actionColOptions: {
      span: 24,
    },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      // 产品id
      productId.value = data.record._id;
      setFieldsValue({
        ...data.record,
      });
    }

    // 产品分类
    const categoryList = await getCategoryList();
    const treeData = TransformTreeArr(categoryList.items);
    updateSchema({
      field: 'category',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '添加产品' : '编辑产品'));

  // 保存
  const handleSubmit = async () => {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      if (!unref(isUpdate)) {
        // 添加新闻 api
        await createProduct(values);
        createMessage.success('添加成功!');
      } else {
        // 编辑新闻 api
        await updateProduct(newsId.value, values);
        createMessage.success('编辑成功!');
      }
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  };
</script>

<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :title="getTitle"
    width="1000px"
    showFooter
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <!-- 产品封面 -->
      <template #pic>
        <UploadImage v-model="productPic" />
      </template>
      <!-- 产品规格 -->
      <template #sku="{ model, field }">
        <ProductSkuForm v-model:value="model[field]" />
      </template>
      <!-- 产品封面 -->
      <template #bannerImg="{ model, field }">
        <UploadImage :multiple="true" v-model="model[field]" />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>

<style scoped></style>
