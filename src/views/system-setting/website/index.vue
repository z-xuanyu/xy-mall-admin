<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-16 14:31:03
 * @LastEditTime: 2022-03-16 15:31:55
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import SiteInfo from './SiteInfo.vue';
  import StorageSetting from './StorageSetting.vue';

  const activeKey = ref('tab1');

  const tabListTitle = [
    {
      key: 'tab1',
      tab: '站点信息',
    },
    {
      key: 'tab2',
      tab: '云存储',
    },
    {
      key: 'tab3',
      tab: '版权信息',
    },
  ];

  function onTabChange(key) {
    activeKey.value = key;
  }
</script>

<template>
  <Card
    :tab-list="tabListTitle"
    v-bind="$attrs"
    :active-tab-key="activeKey"
    @tabChange="onTabChange"
  >
    <p v-if="activeKey === 'tab1'">
      <SiteInfo />
    </p>
    <p v-if="activeKey === 'tab2'">
      <StorageSetting />
    </p>

    <p v-if="activeKey === 'tab3'"> 5555 </p>
  </Card>
</template>

<style scoped>
  :deep(.ant-card-body) {
    background-color: #f0f2f5;
  }
</style>
