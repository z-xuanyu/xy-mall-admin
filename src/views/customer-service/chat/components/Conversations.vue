<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-22 14:08:34
 * @LastEditTime: 2022-04-24 10:43:42
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { Icon } from '/@/components/Icon';
  import { Avatar, Tag } from 'ant-design-vue';

  import { ref } from 'vue';

  const activeKey = ref('1');

  const tabs = ref([
    {
      key: '1',
      text: '用户列表',
    },
    {
      key: '2',
      text: '游客列表',
    },
  ]);

  function handleTabsChange(key: string) {
    activeKey.value = key;
  }
</script>

<template>
  <div class="conversation bg-white">
    <div class="h-[70px] flex flex-col justify-center bg-blue-500 px-5">
      <div class="bg-white flex items-center rounded-4xl overflow-hidden">
        <Icon :size="20" icon="eva:search-outline" class="px-2" />
        <input type="text" placeholder="搜索用户名称" class="outline-none py-2" />
      </div>
    </div>
    <div class="border-r">
      <div class="flex justify-around">
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
      <!-- 会话列表 -->
      <div class="conversation__list overflow-y-auto">
        <!-- 空数据 -->
        <div class="py-20" v-if="false">
          <img
            class="w-[120px] mx-auto"
            src="http://v4.crmeb.net/admin/img/no_chat.b9c3e583.png"
            alt=""
          />
          <p class="text-center mt-5 text-gray-400">暂无用户列表</p>
        </div>
        <!--用户列表 -->
        <div
          class="flex p-3 cursor-pointer"
          v-for="item in 20"
          :key="item + 'user'"
          :class="item == 1 ? 'border-l-4 border-blue-500 bg-gray-100' : ''"
        >
          <Avatar :size="45" src="https://www.zhouxuanyu.com/usr/uploads/2022/02/47540976.jpg" />
          <div class="flex-1 ml-2 overflow-hidden">
            <div class="flex justify-between">
              <div
                ><span class="mr-2">阿宇_Coder</span
                ><Tag size="small" color="green">公众号</Tag></div
              >
              <span class="text-xs text-gray-400">4月8日 17:31</span>
            </div>
            <div class="text-gray-400 truncate py-1"
              >您好您好您好您好您好您好您好您好您好您好您好您好您好您好您好您好您好您好</div
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .conversation {
    &__list {
      height: calc(80vh - 120px);
    }
  }
</style>
