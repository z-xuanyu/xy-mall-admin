<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-25 12:10:39
 * @LastEditTime: 2022-04-07 17:29:28
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import BaseMemberInfo from './components/BaseMemberInfo.vue';
  import MemberOrder from './components/MemberOrder.vue';
  import MemberFootprint from './components/MemberFootprint.vue';
  import MemberCollection from './components/MemberCollection.vue';
  import MemberAddress from './components/MemberAddress.vue';
  import MemberCoupon from './components/MemberCoupon.vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const userId = ref(route.params.id);

  const activeKey = ref('order');

  const tabListTitle = [
    {
      key: 'order',
      tab: '订单',
    },
    {
      key: 'footprint',
      tab: '足迹',
    },
    {
      key: 'collection',
      tab: '收藏',
    },
    {
      key: 'address',
      tab: '地址',
    },
    {
      key: 'coupon',
      tab: '优惠券',
    },
  ];

  function onTabChange(key) {
    activeKey.value = key;
  }
</script>

<template>
  <div class="member-detail p-5">
    <!-- 会员基本信息 -->
    <BaseMemberInfo />
    <!-- 会员其他功能 -->
    <div class="mt-5">
      <Card
        :tab-list="tabListTitle"
        v-bind="$attrs"
        :active-tab-key="activeKey"
        @tabChange="onTabChange"
      >
        <p v-if="activeKey === 'order'">
          <MemberOrder :userId="userId" />
        </p>
        <p v-if="activeKey === 'footprint'">
          <MemberFootprint :userId="userId" />
        </p>
        <p v-if="activeKey === 'collection'">
          <MemberCollection :userId="userId" />
        </p>
        <p v-if="activeKey === 'address'">
          <MemberAddress :userId="userId" />
        </p>
        <p v-if="activeKey === 'coupon'">
          <MemberCoupon />
        </p>
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
