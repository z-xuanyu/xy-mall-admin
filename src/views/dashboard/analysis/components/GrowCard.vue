<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 14:44:22
 * @LastEditTime: 2022-04-08 10:51:42
 * @Description: Modify here please
-->
<template>
  <div class="md:flex">
    <template v-for="(item, index) in data" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        :title="item.title"
        class="md:w-1/4 w-full !md:mt-0 !mt-4"
        :class="[index + 1 < 4 && '!md:mr-4']"
        :canExpan="false"
      >
        <template #extra>
          <Tag color="green">今日</Tag>
        </template>

        <div class="py-4 px-2">
          <CountTo :startVal="1" :endVal="item.value" class="text-2xl" />
        </div>
        <div class="p-2 flex items-center">
          <span>昨日 498</span>
          <span>日环比 -49990%</span>
          <Icon :size="20" icon="gridicons:dropdown" color="green" />
        </div>
        <div class="p-2 border-t flex justify-between">
          <span>{{ item.subTitle }}</span>
          <CountTo :startVal="1" :endVal="item.total" :suffix="handleSuffix(index)" />
        </div>
      </Card>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { CountTo } from '/@/components/CountTo/index';
  import { Tag, Card } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { ref } from 'vue';

  defineProps({
    loading: {
      type: Boolean,
    },
  });

  function handleSuffix(index) {
    let str = '';

    switch (index) {
      case 0:
        str = '元';
        break;
      case 1:
        str = 'Pv';
        break;
      case 2:
        str = '单';
        break;
      case 3:
        str = '人';
        break;
      default:
        break;
    }

    return str;
  }

  const data = ref([
    {
      title: '销售额',
      subTitle: '本月销售额',
      value: 2000,
      total: 12440.93,
    },
    {
      title: '用户访问量',
      subTitle: '本月访问量',
      value: 20000,
      total: 940,
    },
    {
      title: '订单量',
      subTitle: '本月订单量',
      value: 8000,
      total: 14,
    },
    {
      title: '新增用户',
      subTitle: '本月新增用户',
      value: 5000,
      total: 12450,
    },
  ]);
</script>
