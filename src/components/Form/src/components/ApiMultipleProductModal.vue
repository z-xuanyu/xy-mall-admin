<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-07-13 11:26:30
 * @LastEditTime: 2022-07-13 16:53:33
 * @Description: 多选商品弹窗
-->
<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import { Modal, Image, Tag } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table/index';
  import { ref, h, onMounted, watchEffect } from 'vue';
  import { getProductList } from '/@/api/product';
  import { getCategoryList } from '/@/api/category';
  import { TransformTreeArr } from '/@/utils';

  const props = defineProps({
    value: { type: Array },
  });

  const emit = defineEmits(['update:value']);

  const defaultValue = ref<any>([]);

  watchEffect(() => {
    defaultValue.value = props.value || [];
  });

  let categoryList = ref([]);

  onMounted(() => {
    getCategoryList().then((res) => {
      categoryList.value = TransformTreeArr(res.items);
    });
  });

  function getCategories() {
    return new Promise((resolve) => {
      resolve(categoryList.value);
    });
  }

  const visible = ref(false);

  const [registerTable, { getSelectRowKeys }] = useTable({
    rowKey: '_id',
    api: getProductList,
    columns: [
      {
        title: '图片',
        dataIndex: 'pic',
        width: 160,
        align: 'center',
        customRender: ({ record }) => {
          return h(Image, {
            src: record.pic,
            width: 40,
            height: 40,
          });
        },
      },
      {
        title: '商品名称',
        dataIndex: 'title',
        width: 160,
        align: 'center',
      },
      {
        title: '商品分类',
        dataIndex: 'category',
        width: 160,
        align: 'center',
        customRender: ({ record }) => {
          return h(
            Tag,
            {
              color: '#2db7f5',
            },
            { default: () => record.category.name },
          );
        },
      },
    ],
    formConfig: {
      labelWidth: 120,
      schemas: [
        {
          field: 'title',
          label: '商品名称:',
          component: 'Input',
          labelWidth: 80,
          colProps: {
            span: 12,
          },
          componentProps: {
            placeholder: '请输入商品名称',
          },
        },
        {
          field: 'category',
          label: '商品分类:',
          component: 'ApiTreeSelect',
          labelWidth: 80,
          colProps: {
            span: 12,
          },
          componentProps: {
            api: getCategories,
            placeholder: '请选择商品分类',
            fieldNames: { children: 'children', label: 'name', key: '_id', value: '_id' },
          },
        },
      ],
    },
    pagination: true,
    striped: false,
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    actionColumn: undefined,
  });

  // 打开选择卡片弹窗
  function openProductModal() {
    visible.value = true;
  }

  // 确认
  function handleOk() {
    visible.value = false;
    const keys = getSelectRowKeys();
    defaultValue.value = keys;
    emit('update:value', defaultValue.value);
  }

  // 取消
  function onClose() {
    visible.value = false;
    defaultValue.value = props.value || [];
  }
</script>

<template>
  <div class="multiple-product-modal pb-4">
    <!-- 选择商品 -->
    <div class="flex space-x-2">
      <div class="w-[80px] h-[80px] relative">
        <img
          class="w-full h-full object-cover rounded-lg"
          src="http://nestshop.oss-cn-shenzhen.aliyuncs.com/images/nz-09a.png"
          alt=""
        />
        <!-- 移除图标 -->
        <Icon icon="ci:off-close" class="absolute -top-2 -right-2 text-xl" />
      </div>
      <div class="w-[80px] h-[80px] relative">
        <img
          class="w-full h-full object-cover rounded-lg"
          src="http://nestshop.oss-cn-shenzhen.aliyuncs.com/images/nz-09a.png"
          alt=""
        />
        <!-- 移除图标 -->
        <Icon icon="ci:off-close" class="absolute -top-2 -right-2 text-xl cursor-pointer" />
      </div>
      <!-- 添加商品 -->
      <div
        class="
          border-dashed border-2
          bg-white
          w-[80px]
          h-[80px]
          flex
          justify-center
          items-center
          rounded-lg
          cursor-pointer
          relative
        "
        @click="openProductModal"
      >
        <Icon icon="ic:outline-photo-size-select-large" class="text-xl" />
        <span class="absolute -bottom-6 text-sm text-gray-400">选择商品</span>
      </div>
    </div>

    <!-- 商品列表 -->
    <Modal
      v-model:visible="visible"
      width="800px"
      title="选择商品"
      @ok="handleOk"
      @cancel="onClose"
      :maskClosable="false"
    >
      <BasicTable @register="registerTable" :rowSelection="{ type: 'checkbox' }" />
    </Modal>
  </div>
</template>

<style scoped></style>
