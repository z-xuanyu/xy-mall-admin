<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-08 10:55:45
 * @LastEditTime: 2022-04-08 11:30:37
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { Icon } from '/@/components/Icon';
  import { ref } from 'vue';

  const data = ref([
    {
      title: '用户管理',
      icon: 'heroicons-solid:users',
      color: 'rgb(105, 192, 255)',
      to: '/user/index',
    },
    {
      title: '系统设置',
      icon: 'ant-design:setting-filled',
      color: 'rgb(149, 222, 100)',
      to: '/user/index',
    },
    {
      title: '商品',
      icon: 'el:shopping-cart',
      color: 'rgb(255, 156, 110)',
      to: '/user/index',
    },
    {
      title: '订单管理',
      icon: 'akar-icons:clipboard',
      color: 'rgb(179, 127, 235)',
      to: '/user/index',
    },
    {
      title: '消息配置',
      icon: 'fluent:calendar-chat-24-regular',
      color: '#614ad3',
      to: '/user/index',
    },
    {
      title: '文章管理',
      icon: 'ri:article-line',
      color: '#8bc24c',
      to: '/user/index',
    },
    {
      title: '分销管理',
      icon: 'ion:pricetags-sharp',
      color: '#ff585d',
      to: '/user/index',
    },
    {
      title: '优惠券',
      icon: 'icon-park-outline:coupon',
      color: '#fd5f00',
      to: '/user/index',
    },
  ]);
</script>

<template>
  <div class="flex flex-wrap lg:flex-nowrap justify-between lg:space-x-5">
    <div
      class="
        bg-white
        lg:rounded-md
        w-1/4
        lg:w-1/8
        pt-5
        cursor-pointer
        flex flex-col
        hover:shadow-lg
        items-center
        mb-4
        lg:mb-0
      "
      v-for="(item, index) in data"
      :key="index + 'nav'"
    >
      <Icon :icon="item.icon" size="30" :color="item.color" />
      <p class="py-1">{{ item.title }}</p>
    </div>
  </div>
</template>

<style scoped></style>
