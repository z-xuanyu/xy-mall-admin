<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-12 14:33:38
 * @LastEditTime: 2022-06-20 15:52:02
 * @Description: 封装产品规格添加修改Form
-->
<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import { CloseCircleOutlined } from '@ant-design/icons-vue';
  import { descartes } from '/@/utils';
  import { useMessage } from '/@/hooks/web/useMessage';
  import UploadImage from '/@/views/media-library/UploadImage.vue';
  const { createMessage } = useMessage();

  const props = defineProps({
    modelValue: {
      type: [Object],
      default: () => {},
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
  let skus = ref<any>([]);
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
          image: item.image ? [item.image] : [],
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
        skuAttrs: skuAttrs.value.map((item: any) => ({
          name: item.name,
          values: item.values.map((v) => v.name),
        })),
        skus: newV.map((item: any) => ({ ...item, image: item?.image.join() })),
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
    headerNames.value = skuAttrs.value.map((item) => item.name) as any;
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
        image: [],
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
          <!-- <Input v-model:value="item.name" placeholder="请输入规格名称" /> -->
          <input
            v-model="item.name"
            placeholder="请输入规格名称"
            type="text"
            class="outline-none border px-2 py-1"
          />
        </div>
      </div>
      <div class="p-2 flex py-4 items-center space-x-4">
        <span>规格值</span>
        <div class="w-[180px] relative" v-for="(attrVal, skuIdx) in item.values" :key="skuIdx">
          <input
            class="outline-none border px-2 py-1"
            type="text"
            placeholder="请输入规格值"
            v-model="attrVal.name"
          />
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
          <th class="border">图片</th>
          <th class="border">价格</th>
          <th class="border">库存</th>
          <th class="border">成本价(元)</th>
          <th class="border">重量(kg)</th>
          <th class="border">货号</th>
        </thead>
        <tbody>
          <template v-for="(item, _i) in skus" :key="_i + 'sku'">
            <tr class="border">
              <td class="text-center border" v-for="(_, vIndex) in skuAttrs" :key="vIndex + 'v'">
                <span class="py-4 w-[100px] inline-block">{{ item[`value${vIndex + 1}`] }}</span>
              </td>
              <td class="text-center border">
                <div class="p-1 w-[100px]">
                  <UploadImage
                    v-model="item.image"
                    :isShowTips="false"
                    justify="justify-center"
                    width="w-14"
                    height="h-14"
                  />
                </div>
              </td>
              <td class="py-1 px-2 text-center border">
                <input
                  type="number"
                  class="outline-none border py-1 px-2 w-[100px]"
                  placeholder="请输入价格"
                  v-model="item.price"
                  :min="0"
                />
              </td>
              <td class="py-1 px-2 text-center border">
                <input
                  type="number"
                  class="outline-none border py-1 px-2 w-[100px]"
                  placeholder="请输入库存"
                  v-model="item.inventory"
                  :min="0"
                />
              </td>
              <td class="py-1 text-center px-2 border">
                <input
                  type="number"
                  class="outline-none border py-1 px-2 w-[100px]"
                  placeholder="请输入原价"
                  v-model="item.costPrice"
                  :min="0"
                />
              </td>
              <td class="py-1 text-center border px-2">
                <input
                  type="number"
                  class="outline-none border py-1 px-2 w-[100px]"
                  placeholder="请输入重量"
                  v-model="item.weight"
                  :min="0"
                />
              </td>
              <td class="py-1 text-center border px-2">
                <input
                  type="text"
                  class="outline-none border py-1 px-2 w-[100px]"
                  placeholder="请输入货号"
                  v-model="item.artNo"
                />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
