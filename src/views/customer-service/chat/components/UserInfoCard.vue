<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-22 16:51:09
 * @LastEditTime: 2022-04-24 10:45:26
 * @Description: 聊天右边用户信息
-->
<script setup lang="ts">
  import { ref } from 'vue';
  import { Avatar, Tag, Select, SelectOption } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';

  const group = ref('1');
</script>

<template>
  <div class="p-2">
    <div class="flex items-center space-x-3 py-4 border-b">
      <Avatar
        :size="50"
        src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIlbWnxNPEJxpnicbBibfJSxsZkVicJKLeBlB18VMFnYyWTicNLxrtpIDJrCIhN6fKj7HtIgjfc6qq8FQ/132"
      />
      <span class="text-lg">阿宇_Coder </span>
      <Tag color="green">公众号</Tag>
    </div>
    <div class="py-4 space-y-3 px-2 border-b">
      <div>
        <span class="w-[80px] inline-block">手机号</span>
        <span>138****6455</span>
      </div>
      <div class="flex items-center">
        <span class="w-[80px] inline-block">分组</span>
        <Select size="small" class="w-full flex-1" v-model:value="group" placeholder="请选择分组">
          <SelectOption value="1">中低消费人群</SelectOption>
          <SelectOption value="2">高消费人群</SelectOption>
        </Select>
      </div>
      <div class="flex">
        <span class="w-[80px] inline-block">用户标签</span>
        <div class="flex-1">
          <Tag size="small" color="blue">老客户介绍</Tag>
          <Tag size="small" color="blue">老客户</Tag>
        </div>
        <Icon class="mt-[2px]" :size="15" icon="ic:baseline-arrow-forward-ios" />
      </div>
    </div>
    <div class="py-4 space-y-3 px-2 border-b">
      <div>
        <span class="w-[80px] inline-block">会员等级</span>
        <span>V5</span>
      </div>
      <div>
        <span class="w-[80px] inline-block">推荐人</span>
        <span>阿宇_Corder</span>
      </div>
      <div>
        <span class="w-[80px] inline-block">用户类型</span>
        <span>小程序</span>
      </div>
      <div>
        <span class="w-[80px] inline-block">余额</span>
        <span>8888.00</span>
      </div>
      <div>
        <span class="w-[80px] inline-block">推广员</span>
        <span>是</span>
      </div>
      <div>
        <span class="w-[80px] inline-block">生日</span>
        <span>1995-08-23</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
