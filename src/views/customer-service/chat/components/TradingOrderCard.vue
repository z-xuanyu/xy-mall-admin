<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-22 16:52:49
 * @LastEditTime: 2022-04-22 18:23:02
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { Input, Button } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { ref } from 'vue';

  const activeKey = ref('1');

  const tabs = ref([
    {
      key: '1',
      text: '全部',
    },
    {
      key: '2',
      text: '未支付',
    },
    {
      key: '3',
      text: '未发货',
    },
    {
      key: '4',
      text: '退款中',
    },
  ]);

  function handleTabsChange(key: string) {
    activeKey.value = key;
  }
</script>

<template>
  <div>
    <div class="flex justify-around border-b">
      <span
        @click="handleTabsChange(item.key)"
        class="inline-block leading-[50px] cursor-pointer relative"
        :class="activeKey == item.key ? 'font-bold text-blue-500' : ''"
        v-for="item in tabs"
        :key="item.key"
        >{{ item.text }}
        <i
          v-if="item.key == activeKey"
          class="absolute h-[2px] bg-blue-500 left-0 right-0 bottom-0"
        ></i>
      </span>
    </div>
    <div class="p-2">
      <Input placeholder="搜索订单编号">
        <template #prefix>
          <Icon color="#aaaaaa" :size="20" icon="eva:search-outline" />
        </template>
      </Input>
    </div>
    <!-- 订单列表 -->
    <div class="h-[calc(80vh-170px)] overflow-y-auto">
      <div class="p-2" v-for="orderItem in 10" :key="orderItem + 'order'">
        <div class="flex justify-between px-2 bg-gray-100 p-1">
          <div class="space-x-2 flex items-center"
            ><span
              class="
                inline-block
                flex
                justify-center
                items-center
                p-1
                bg-blue-500
                rounded-full
                h-[20px]
                w-[20px]
              "
            >
              <Icon :size="10" color="white" icon="fa6-regular:comment-dots" />
            </span>
            <span class="text-xs">待评价</span></div
          >
          <span class="text-xs">2022-04-11 22:13:13</span>
        </div>
        <!-- 商品列表 -->
        <div class="flex py-2" v-for="item in 2" :key="item">
          <img
            class="w-[80px]"
            src="https://qiniu.crmeb.net/attach/2022/03/11/3ecf8b90a37aa051fb0c379a9e868113.jpg?imageView2/2/w/300/h/300"
            alt=""
          />
          <div class="flex-1 overflow-hidden space-y-1">
            <div class="truncate"> 智能水牙线口腔清理正畸阿斯達四方阿斯弗 </div>
            <div class="text-gray-400">白色</div>
            <div>¥9.90 x 1</div>
          </div>
        </div>
        <!-- 订单信息 -->
        <div class="p-2 space-y-1">
          <div>
            <span class="inline-block w-[70px] text-right">订单编号：</span>
            <span>wx244947325615603712</span>
          </div>
          <div>
            <span class="inline-block w-[70px] text-right">付款时间：</span>
            <span>2022-04-11 22:13:13</span>
          </div>
          <div>
            <span class="inline-block w-[70px] text-right">邮费：</span>
            <span>¥ 0.00</span>
          </div>
          <div>
            <span class="inline-block w-[70px] text-right">实收款：</span>
            <span>¥ 9.90</span>
          </div>
        </div>
        <!-- 操作按钮 -->
        <div class="space-x-2 px-2">
          <Button type="primary" size="small" ghost>退款</Button>
          <Button type="primary" size="small" ghost>备注</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .ant-input-affix-wrapper {
    border-radius: 100px;
  }
</style>
