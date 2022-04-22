<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-22 14:10:21
 * @LastEditTime: 2022-04-22 16:38:09
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { Avatar, Popover } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import SendMessageBox from './SendMessageBox.vue';
</script>

<template>
  <div class="flex flex-col justify-between">
    <div class="leading-[70px] flex justify-between bg-blue-500">
      <div class="space-x-2">
        <Avatar
          :size="40"
          src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKDZPvXt08QV5TyoUTT5NMFX3j3p3ZKnfWjXiaUGTJYvbL0ZvRsd2IzFQgyvorAv5JwcazafpfhshQ/132"
        />
        <span class="text-white">阿宇_Coder</span>
        <Popover trigger="click" placement="bottom">
          <span class="bg-green-100 cursor-pointer px-3 rounded-3xl py-0.5 text-xs">
            <i class="inline-block w-[5px] h-[5px] rounded-lg mb-[2px] bg-green-500"></i>
            在线
          </span>
          <template #content>
            <div class="flex items-center space-x-1 mb-2 cursor-pointer">
              <Icon icon="ic:baseline-check" />
              <i class="inline-block h-[10px] w-[10px] bg-green-500 rounded-full"></i>
              <span>在线</span>
            </div>
            <div class="flex items-center space-x-1 cursor-pointer">
              <!-- <Icon icon="ic:baseline-check" /> -->
              <i class="inline-block h-[10px] w-[10px] ml-[20px] bg-gray-300 rounded-full"></i>
              <span>下线</span>
            </div>
          </template>
        </Popover>
      </div>
      <div class="mr-2">
        <span class="bg-white text-blue-500 cursor-pointer px-4 py-1 rounded-4xl">退出登录</span>
      </div>
    </div>
    <div class="h-[calc(80vh-270px)] p-2">
      <div class="py-2">
        <p class="text-center text-gray-400">2022-04-22 16:32</p>
        <div class="flex">
          <Avatar
            :size="40"
            src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKDZPvXt08QV5TyoUTT5NMFX3j3p3ZKnfWjXiaUGTJYvbL0ZvRsd2IzFQgyvorAv5JwcazafpfhshQ/132"
          />
          <div
            class="w-max-[200px] rounded-b-lg shadow-2xl ml-2 rounded-tr-lg mt-2 py-2 px-4 bg-white"
          >
            你会受到阿萨德阿萨啊沙发沙发阿萨法
          </div>
        </div>
      </div>
      <div class="py-2">
        <p class="text-center text-gray-400">2022-04-22 16:32</p>
        <div class="flex flex-row-reverse">
          <Avatar
            :size="40"
            src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKDZPvXt08QV5TyoUTT5NMFX3j3p3ZKnfWjXiaUGTJYvbL0ZvRsd2IzFQgyvorAv5JwcazafpfhshQ/132"
          />
          <div
            class="
              w-max-[200px]
              rounded-b-lg
              shadow-2xl
              mr-2
              rounded-tl-lg
              mt-2
              py-2
              px-4
              bg-green-400
            "
          >
            人总是贪婪的，就像最开始，我也只是想知道你的名字。
          </div>
        </div>
      </div>
    </div>
    <SendMessageBox />
  </div>
</template>

<style scoped></style>
