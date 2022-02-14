<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-13 11:52:45
 * @LastEditTime: 2022-02-14 16:49:31
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

    updateSchema({
      field: 'sku',
      ifShow: false,
      required: false,
    });

    if (unref(isUpdate)) {
      // 产品id
      productId.value = data.record._id;
      productPic.value = [data.record.pic];
      setFieldsValue({
        ...data.record,
        tags: data.record.tags.map((item) => item._id),
        category: data.record.category._id,
      });

      updateSchema({
        field: 'sku',
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
    } else {
      productPic.value = [];
    }

    // 产品分类
    const categoryList = await getCategoryList();
    const treeData = TransformTreeArr(categoryList.items);
    updateSchema({
      field: 'category',
      componentProps: { treeData },
    });

    // 产品标签
    const getProductTags = await getTagList({ type: 1 });
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

  const getTitle = computed(() => (!unref(isUpdate) ? '添加产品' : '编辑产品'));

  // 保存
  const handleSubmit = async () => {
    // 选择图片
    if (productPic.value.length) {
      setFieldsValue({
        pic: productPic.value[0],
      });
    }
    try {
      const values = await validate();

      // 校验规格信息
      for (let item of values.sku) {
        if (!item.skuName) return createMessage.error('请填写规格名称');
        for (let value of item.skuValues) {
          for (const key in value) {
            if (!value[key] && key != 'image') return createMessage.error('请填写规格值');
          }
        }
      }
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
