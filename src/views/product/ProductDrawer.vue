<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-13 11:52:45
 * @LastEditTime: 2022-05-10 10:36:15
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
  import { getTagList } from '/@/api/tag';
  import { TransformTreeArr } from '/@/utils';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();
  let isUpdate = ref<boolean>(true);
  let productId = ref<string>('');

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
    updateSchema({
      field: 'skus',
      ifShow: false,
      required: false,
    });
    if (unref(isUpdate)) {
      // 产品id
      productId.value = data.record._id;
      updateSchema({
        field: 'skus',
        ifShow: data.record.skuType == 2,
        required: data.record.skuType == 2,
      });

      updateSchema({
        field: 'price',
        show: data.record.skuType !== 2,
        required: data.record.skuType !== 2,
      });

      updateSchema({
        field: 'costPrice',
        show: data.record.skuType !== 2,
        required: data.record.skuType !== 2,
      });

      updateSchema({
        field: 'inventory',
        show: data.record.skuType !== 2,
        required: data.record.skuType !== 2,
      });
      setFieldsValue({
        ...data.record,
        tags: data.record.tags.map((item) => item._id),
        category: data.record.category._id,
        pic: [data.record.pic],
        skus: {
          skuAttrs: data.record.skuAttrs,
          skus: data.record.skus,
        },
      });
    }

    // 产品分类
    const categoryList = await getCategoryList();
    const treeData = TransformTreeArr(categoryList.items);
    updateSchema({
      field: 'category',
      componentProps: { treeData },
    });

    // 产品标签
    const getProductTags = await getTagList({ type: 1 } as const);
    updateSchema({
      field: 'tags',
      componentProps: {
        options: getProductTags.items.map((item) => {
          return {
            label: item.name,
            value: item._id,
            key: item._id,
          };
        }),
      },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '添加商品' : '编辑商品'));

  // 保存
  const handleSubmit = async () => {
    try {
      const values = await validate();
      values.skuAttrs = values.skus.skuAttrs;
      values.skus = values.skus.skus;
      values.pic = values.pic[0];
      setDrawerProps({ confirmLoading: true });
      if (!unref(isUpdate)) {
        // 添加产品 api
        await createProduct(values);
        createMessage.success('添加成功!');
      } else {
        // 编辑产品 api
        await updateProduct(productId.value, values);
        createMessage.success('编辑成功!');
      }
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  };

  // 关闭
  function handleVisibleChange(value) {
    if (!value) {
      updateSchema({
        field: 'skus',
        ifShow: false,
        required: false,
      });
    }
  }
</script>

<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :title="getTitle"
    :width="1300"
    showFooter
    @ok="handleSubmit"
    @visible-change="handleVisibleChange"
  >
    <BasicForm @register="registerForm">
      <!-- 产品封面 -->
      <template #pic="{ model, field }">
        <UploadImage v-model="model[field]" />
      </template>
      <!-- 产品规格 -->
      <template #skus="{ model, field }">
        <ProductSkuForm v-model="model[field]" />
      </template>
      <!-- 产品封面 -->
      <template #bannerImg="{ model, field }">
        <UploadImage :multiple="true" v-model="model[field]" />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>

<style scoped></style>
