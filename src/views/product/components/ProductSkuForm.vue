<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-12 14:33:38
 * @LastEditTime: 2022-02-14 16:17:08
 * @Description: 封装产品规格添加修改Form
-->
<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import { Input, InputNumber } from 'ant-design-vue';
  import { CloseCircleOutlined } from '@ant-design/icons-vue';
  import { Sku } from './sku.type';

  const props = defineProps({
    modelValue: {
      type: Array,
      default: null,
    },
  });

  const emit = defineEmits(['update:modelValue']);

  let sku = ref<Array<Sku>>([
    {
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
    },
  ]);

  onMounted(() => {
    if (props.modelValue) {
      const value = ref(props.modelValue);
      sku.value = value.value;
    }
  });

  // 添加规格、
  function handleAddSku() {
    sku.value.push({
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
  }

  // 追加规格值
  function handleAddSkuValue(index) {
    sku.value[index].skuValues.push({
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
  function handleDelSkuValue(index, skuIndex) {
    sku.value[index].skuValues.splice(skuIndex, 1);
  }

  watch(sku.value, (newV) => {
    console.log(1454544, newV, '变化');
    emit('update:modelValue', newV);
  });
</script>

<template>
  <div class="sku-form">
    <div class="border mb-5" v-for="(item, index) in sku" :key="index + 'sku'">
      <div class="bg-gray-100 p-2 py-4 space-x-4 flex items-center">
        <span>规格名</span>
        <div class="w-[180px]">
          <Input v-model:value="item.skuName" placeholder="请输入规格名称" />
        </div>
      </div>
      <div class="p-2 flex py-4 items-center space-x-4">
        <span>规格值</span>
        <div class="w-[180px] relative" v-for="(skuItem, skuIdx) in item.skuValues" :key="skuIdx">
          <Input placeholder="请输入规格值" v-model:value="skuItem.value" />
          <div
            class="absolute -top-2 -right-2 cursor-pointer"
            v-if="sku[index].skuValues.length > 1"
            @click="handleDelSkuValue(index, skuIdx)"
          >
            <CloseCircleOutlined />
          </div>
        </div>
        <a-button type="link" @click="handleAddSkuValue(index)">添加规格值</a-button>
      </div>
    </div>
    <!-- 规格值列表 -->
    <div class="mt-5 bg-gray-100 p-2 border" v-if="sku[0].skuName && sku[0].skuValues[0].value">
      <table class="w-full">
        <thead align="center">
          <th>{{ sku[0].skuName }}</th>
          <th v-if="sku.length == 2">{{ sku[1].skuName }}</th>
          <th v-if="sku.length == 3">{{ sku[2].skuName }}</th>
          <th>价格</th>
          <th>库存</th>
          <th>成本价(元)</th>
          <th>重量(kg)</th>
          <th>货号</th>
        </thead>
        <tbody>
          <template v-for="(item, index) in sku" :key="index + 'sku'">
            <tr class="py-1" v-for="(skuItem, skuIdx) in item.skuValues" :key="skuIdx">
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
          </template>
        </tbody>
      </table>
    </div>
    <div class="mt-2 space-x-2">
      <a-button type="primary" :disabled="sku.length >= 1" @click="handleAddSku()"
        >添加规格</a-button
      >
      <span class="text-gray-400">最多设置3个规格</span>
    </div>
  </div>
</template>
