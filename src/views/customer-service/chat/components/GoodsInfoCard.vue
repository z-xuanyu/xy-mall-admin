<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-22 16:54:13
 * @LastEditTime: 2022-04-28 14:23:03
 * @Description: 聊天右边商品信息相关
-->
<script setup lang="ts">
  import { Input } from 'ant-design-vue';
  import { ref, onMounted } from 'vue';
  import { getMemberViewHistories } from '/@/api/user';
  import { useSocketStoreWithOut } from '/@/store/modules/socket';
  import { Icon } from '/@/components/Icon';

  interface productItemType {
    _id: string;
    pic: string;
    price: number;
    productId: string;
    title: string;
  }

  const useChatState = useSocketStoreWithOut();

  const activeKey = ref('1');

  const tabs = ref([
    {
      key: '1',
      text: '购买',
    },
    {
      key: '2',
      text: '足迹',
    },
    {
      key: '3',
      text: '热销',
    },
  ]);

  const list = ref<productItemType[]>([]);
  onMounted(async () => {
    const res = await getMemberViewHistories({ userId: useChatState.targetId });
    list.value = res.items;
  });

  function handleTabsChange(key: string) {
    activeKey.value = key;
  }

  // 添加推送商品
  function handleClickPushProduct(item: any) {
    useChatState.sendMessage({
      userId: useChatState.userId,
      targetId: useChatState.targetId,
      messageType: 5,
      product: { ...item, id: item.productId },
    });
  }
</script>

<template>
  <div>
    <!-- tabs -->
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
    <!-- search -->
    <div class="p-2">
      <Input placeholder="搜索商品名称">
        <template #prefix>
          <Icon color="#aaaaaa" :size="20" icon="eva:search-outline" />
        </template>
      </Input>
    </div>
    <!-- 商品列表 -->
    <div class="h-[calc(80vh-170px)] overflow-y-auto">
      <div class="flex pr-4 pl-2 py-2" v-for="(item, index) in list" :key="index + 'goods'">
        <img class="w-[70px] h-[70px] object-cover" :src="item.pic" alt="" />
        <div class="flex-1 ml-2 overflow-hidden">
          <div class="truncate">{{ item.title }}</div>
          <div class="text-gray-400 text-xs py-1"
            ><span>库存：</span><span class="mr-2">1755</span><span>销量：</span><span>5</span></div
          >
          <div class="flex justify-between">
            <span class="text-red-500">￥{{ item.price.toFixed(2) }}</span>
            <span class="text-blue-500 cursor-pointer" @click="handleClickPushProduct(item)"
              >推送</span
            >
          </div>
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
