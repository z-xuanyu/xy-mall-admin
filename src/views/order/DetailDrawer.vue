<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-05-05 14:12:43
 * @LastEditTime: 2022-05-05 16:11:36
 * @Description: 订单详细
-->
<script setup lang="ts">
  import { ref } from 'vue';
  import { Icon } from '/@/components/Icon';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Button } from '/@/components/Button';
  import { Tabs, TabPane } from 'ant-design-vue';
  import DetailOrderInfo from './components/DetailOrderInfo.vue';
  import DetailOrderProductInfo from './components/DetailOrderProductInfo.vue';
  import DetailOrderRecord from './components/DetailOrderRecord.vue';

  const activeKey = ref<string>('1');

  const [registerDrawer, { setDrawerProps }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false });
    console.log(data);
  });

  // function handleSubmit() {
  //   try {
  //     setDrawerProps({ confirmLoading: true });
  //     closeDrawer();
  //   } finally {
  //     setDrawerProps({ confirmLoading: false });
  //   }
  // }
</script>

<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    title="订单详细"
    :width="1000"
    :showFooter="false"
  >
    <div class="detail">
      <!-- top -->
      <div class="flex justify-between">
        <div class="flex items-center">
          <div class="w-[50px] h-[50px] bg-blue-500 flex justify-center items-center rounded-md">
            <Icon icon="akar-icons:clipboard" color="white" size="40" />
          </div>
          <div class="ml-2">
            <h6>普通订单</h6>
            <div class="text-gray-500">
              <span>订单编号：</span>
              <span>wx251487041936687104</span>
            </div>
          </div>
        </div>
        <!-- 操作按钮 -->
        <div class="space-x-3">
          <Button class="rounded-md" type="primary">立即支付</Button>
          <Button class="rounded-md" color="success">编辑</Button>
        </div>
      </div>
      <!-- status -->
      <div class="flex justify-between py-5">
        <div>
          <span class="block mb-1 text-gray-500">订单状态</span>
          <span class="text-orange-400">未支付</span>
        </div>
        <div>
          <span class="block mb-1 text-gray-500">实际支付</span>
          <span>￥0</span>
        </div>
        <div>
          <span class="block mb-1 text-gray-500">支付方式</span>
          <span>微信支付</span>
        </div>
        <div>
          <span class="block mb-1 text-gray-500">支付时间</span>
          <span>2022-05-05 17:50</span>
        </div>
      </div>
      <!-- Tabs -->
      <Tabs v-model:activeKey="activeKey">
        <TabPane key="1" tab="订单信息">
          <DetailOrderInfo />
        </TabPane>
        <TabPane key="2" tab="商品信息">
          <DetailOrderProductInfo />
        </TabPane>
        <TabPane key="3" tab="订单记录">
          <DetailOrderRecord />
        </TabPane>
      </Tabs>
    </div>
  </BasicDrawer>
</template>

<style scoped></style>
