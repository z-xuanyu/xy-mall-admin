<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-02 14:36:40
 * @LastEditTime: 2022-04-02 15:40:17
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { Card, Input, Switch } from 'ant-design-vue';
</script>

<template>
  <div class="p-3">
    <Card title="发货设置">
      <div class="flex my-2 p-2">
        <span class="w-[80px] text-right pr-4">全场包邮</span>
        <div class="space-y-2">
          <Switch />
          <p class="text-gray-400 mt-1 text-xs">开启全场包邮必须设置包邮金额大于0的金额才能开启</p>
        </div>
      </div>
      <div class="flex p-2">
        <span class="w-[80px] text-right pr-4">满额包邮</span>
        <div class="w-[200px]">
          <Input placeholder="0" />
          <p class="text-gray-400 mt-1 text-xs">商城商品满多少金额即可包邮</p>
        </div>
      </div>
    </Card>
  </div>
</template>

<style scoped></style>
