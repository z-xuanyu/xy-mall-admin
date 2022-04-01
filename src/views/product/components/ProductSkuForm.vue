<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-12 14:33:38
 * @LastEditTime: 2022-04-01 17:15:21
 * @Description: 封装产品规格添加修改Form
-->
<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import { Input, InputNumber } from 'ant-design-vue';
  import { CloseCircleOutlined } from '@ant-design/icons-vue';
  import { descartes } from '/@/utils';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();

  const props = defineProps({
    modelValue: {
      type: [Object, null, Array],
      default: null,
    },
  });
  const emit = defineEmits(['update:modelValue']);

  // 规格属性
  const skuAttrs = ref([
    {
      name: '',
      values: [
        {
          name: '',
        },
      ],
    },
  ]);
  // 规格表格头属性名称
  const headerNames = ref([]);
  // 规格属性值
  let skus = ref([]);
  onMounted(() => {
    if (props.modelValue?.skuAttrs && props.modelValue?.skus) {
      const value = ref(props.modelValue);
      skuAttrs.value = value.value.skuAttrs.map((item) => ({
        name: item.name,
        values: item.values.map((v) => ({ name: v })),
      }));
      headerNames.value = value.value.skuAttrs.map((item) => item.name);
      skus.value = value.value.skus.map((item) => {
        const obj = {};
        item.skuNames.map((v, idx) => {
          obj[`value${idx + 1}`] = v;
        });
        return {
          ...item,
          ...obj,
        };
      });
    }
  });

  // 添加新规格
  function handleAddSku() {
    skuAttrs.value.push({
      name: '',
      values: [
        {
          name: '',
        },
      ],
    });
  }

  // 删除规格
  function handleDelSku(index) {
    skuAttrs.value.splice(index, 1);
  }

  // 追加属性值
  function handleAddSkuValue(index) {
    skuAttrs.value[index].values.push({
      name: '',
    });
  }

  // 移除属性值
  function handleDelSkuValue(index, skuIndex) {
    skuAttrs.value[index].values.splice(skuIndex, 1);
  }

  watch(
    skus,
    (newV) => {
      emit('update:modelValue', {
        skuAttrs: skuAttrs.value.map((item) => ({
          name: item.name,
          values: item.values.map((v) => v.name),
        })),
        skus: newV,
      });
    },
    { deep: true },
  );
  // 生成规格
  function handleGenerateSku() {
    for (const item of skuAttrs.value) {
      if (!item.name) return createMessage.error('请填写规格名称');
      for (const v of item.values) {
        if (!v.name) return createMessage.error('请填写属性值');
      }
    }
    headerNames.value = skuAttrs.value.map((item) => item.name);
    const values = skuAttrs.value.map((item) => item.values.map((v) => v.name));
    const res = descartes(values);
    // 生成sku表格数据
    skus.value = res.map((item) => {
      const obj = {};
      item.map((v, idx) => {
        obj[`value${idx + 1}`] = v;
      });
      return {
        ...obj,
        price: 0,
        inventory: 0,
        costPrice: 0,
        weight: 0,
        artNo: '',
        image: '',
        skuNames: item,
      };
    });
  }
</script>

<template>
  <div class="sku-form">
    <div class="border relative mb-5" v-for="(item, index) in skuAttrs" :key="index + 'attr'">
      <div class="bg-gray-100 p-2 py-4 space-x-4 flex items-center">
        <span>规格名</span>
        <div class="w-[180px]">
          <Input v-model:value="item.name" placeholder="请输入规格名称" />
        </div>
      </div>
      <div class="p-2 flex py-4 items-center space-x-4">
        <span>规格值</span>
        <div class="w-[180px] relative" v-for="(attrVal, skuIdx) in item.values" :key="skuIdx">
          <Input placeholder="请输入规格值" v-model:value="attrVal.name" />
          <div
            class="absolute -top-2 -right-2 cursor-pointer"
            v-if="item.values.length > 1"
            @click="handleDelSkuValue(index, skuIdx)"
          >
            <CloseCircleOutlined />
          </div>
        </div>
        <a-button type="link" @click="handleAddSkuValue(index)">添加属性值</a-button>
      </div>
      <!-- 删除规格 -->
      <div
        class="absolute -top-2 -right-2 cursor-pointer"
        v-if="index > 0"
        @click="handleDelSku(index)"
      >
        <CloseCircleOutlined />
      </div>
    </div>
    <!-- 添加新规格 -->
    <div class="mt-2 space-x-2">
      <a-button @click="handleAddSku()">添加新规格</a-button>
      <a-button type="primary" @click="handleGenerateSku()">立即生成</a-button>
    </div>
    <!-- 规格值列表 -->
    <div class="mt-5 py-2" v-if="skus.length">
      <table class="w-full">
        <thead align="center" class="border">
          <th class="py-4 border" v-for="(h, index) in headerNames" :key="index + 'header'">{{
            h
          }}</th>
          <th class="border">价格</th>
          <th class="border">库存</th>
          <th class="border">成本价(元)</th>
          <th class="border">重量(kg)</th>
          <th class="border">货号</th>
        </thead>
        <tbody>
          <template v-for="(item, index) in skus" :key="index + 'sku'">
            <tr class="border">
              <td
                class="w-[150px] text-center border"
                v-for="(v, vIndex) in skuAttrs"
                :key="vIndex + 'v'"
              >
                <span class="py-4 inline-block">{{ item[`value${vIndex + 1}`] }}</span>
              </td>
              <td class="px-5 py-1 text-center border">
                <InputNumber
                  placeholder="请输入价格"
                  :min="0"
                  string-mode
                  :step="0.01"
                  v-model:value="item.price"
                />
              </td>
              <td class="px-5 py-1 text-center border">
                <InputNumber placeholder="请输入库存" :min="0" v-model:value="item.inventory" />
              </td>
              <td class="px-5 py-1 text-center border">
                <InputNumber
                  placeholder="请输入原价"
                  :min="0"
                  string-mode
                  :step="0.01"
                  v-model:value="item.costPrice"
                />
              </td>
              <td class="px-5 py-1 text-center border">
                <InputNumber placeholder="请输入重量" :min="0" v-model:value="item.weight" />
              </td>
              <td class="px-5 py-1 text-center border">
                <Input placeholder="请输入货号" v-model:value="item.artNo" />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
