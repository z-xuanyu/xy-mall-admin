<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-12 14:33:38
 * @LastEditTime: 2022-02-12 15:27:12
 * @Description: 封装产品规格添加修改Form
-->
<script setup lang="ts">
  import { reactive, watch, onMounted } from 'vue';
  import { Input, InputNumber } from 'ant-design-vue';
  import { CloseCircleOutlined } from '@ant-design/icons-vue';
  import { Sku } from './sku.type';

  const props = defineProps({
    modelValue: {
      type: Object,
      default: null,
    },
  });

  onMounted(() => {
    if (props.modelValue) {
      sku = props.modelValue;
    }
  });
  const emit = defineEmits(['update:modelValue']);

  const sku = reactive<Sku>({
    // 规格名称
    skuName: '',
    // 规格值
    skuValues: [
      {
        value: '',
        price: null,
        inventory: null,
        costPrice: null,
        weight: null,
        artNo: '',
        image: '',
      },
    ],
  });

  // 追加规格值
  function handleAddSkuValue() {
    sku.skuValues.push({
      value: '',
      price: null,
      inventory: null,
      costPrice: null,
      weight: null,
      artNo: '',
      image: '',
    });
  }

  // 移除规格值
  function handleDelSkuValue(index) {
    sku.skuValues.splice(index, 1);
  }

  watch(sku, (newV) => {
    emit('update:modelValue', newV);
  });
</script>

<template>
  <div class="sku-form">
    <div class="border">
      <div class="bg-gray-100 p-2 py-4 space-x-4 flex items-center">
        <span>规格名</span>
        <div class="w-[180px]">
          <Input v-model:value="sku.skuName" placeholder="请输入规格名称" />
        </div>
      </div>
      <div class="p-2 flex py-4 items-center space-x-4">
        <span>规格值</span>
        <div class="w-[180px] relative" v-for="(skuItem, skuIdx) in sku.skuValues" :key="skuIdx">
          <Input placeholder="请输入规格值" v-model:value="skuItem.value" />
          <div
            class="absolute -top-2 -right-2 cursor-pointer"
            v-if="sku.skuValues.length > 1"
            @click="handleDelSkuValue(skuIdx)"
          >
            <CloseCircleOutlined />
          </div>
        </div>
        <a-button type="link" @click="handleAddSkuValue">添加规格值</a-button>
      </div>
    </div>
    <div class="mt-5 bg-gray-100 p-2 border" v-if="sku.skuName && sku.skuValues[0].value">
      <table class="w-full">
        <thead align="center">
          <th>{{ sku.skuName }}</th>
          <th>价格</th>
          <th>库存</th>
          <th>成本价(元)</th>
          <th>重量(kg)</th>
          <th>货号</th>
        </thead>
        <tbody>
          <tr class="py-1" v-for="(skuItem, skuIdx) in sku.skuValues" :key="skuIdx">
            <td class="w-[100px] text-center"> {{ skuItem.value }} </td>
            <td class="px-5 py-1">
              <InputNumber :min="0" string-mode :step="0.01" v-model:value="skuItem.price" />
            </td>
            <td class="px-5 py-1">
              <InputNumber :min="0" v-model:value="skuItem.inventory" />
            </td>
            <td class="px-5 py-1">
              <InputNumber :min="0" string-mode :step="0.01" v-model:value="skuItem.costPrice" />
            </td>
            <td class="px-5 py-1"> <InputNumber :min="0" v-model:value="skuItem.weight" /> </td>
            <td class="px-5 py-1"> <Input v-model:value="skuItem.artNo" /> </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
