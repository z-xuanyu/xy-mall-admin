<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-22 14:10:21
 * @LastEditTime: 2022-04-24 11:28:11
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { Avatar, Popover } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import SendMessageBox from './SendMessageBox.vue';
  import { ref } from 'vue';

  const messageList = ref<any>([
    {
      isMe: false,
      content: '你好在吗？',
      messageType: 1,
      avatar:
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKDZPvXt08QV5TyoUTT5NMFX3j3p3ZKnfWjXiaUGTJYvbL0ZvRsd2IzFQgyvorAv5JwcazafpfhshQ/132',
      sendTime: '2022-04-22 16:32',
    },
    {
      isMe: true,
      content: '你好。有什么能帮助到你的？',
      messageType: 1,
      avatar:
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKDZPvXt08QV5TyoUTT5NMFX3j3p3ZKnfWjXiaUGTJYvbL0ZvRsd2IzFQgyvorAv5JwcazafpfhshQ/132',
      sendTime: '2022-04-22 16:32',
    },
    {
      isMe: false,
      content: '发个商品链接过来',
      messageType: 1,
      avatar:
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKDZPvXt08QV5TyoUTT5NMFX3j3p3ZKnfWjXiaUGTJYvbL0ZvRsd2IzFQgyvorAv5JwcazafpfhshQ/132',
      sendTime: '2022-04-22 16:32',
    },
    {
      isMe: false,
      content: '推荐爆款那个',
      messageType: 1,
      avatar:
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKDZPvXt08QV5TyoUTT5NMFX3j3p3ZKnfWjXiaUGTJYvbL0ZvRsd2IzFQgyvorAv5JwcazafpfhshQ/132',
      sendTime: '2022-04-22 16:32',
    },
    {
      isMe: true,
      content: {
        goods_id: 44,
        goods_pic:
          'http://img30.360buyimg.com/popWaterMark/jfs/t1/118268/24/20913/49337/6225c410Eb5b62c7d/68007ca7550b4244.jpg',
        title: '智能水牙线口腔清理正畸洁牙器洗牙智能水牙线口腔清理正畸洁牙器洗牙',
        inventory: 1491,
        sales: 5,
        price: 149,
      },
      messageType: 5,
      avatar:
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKDZPvXt08QV5TyoUTT5NMFX3j3p3ZKnfWjXiaUGTJYvbL0ZvRsd2IzFQgyvorAv5JwcazafpfhshQ/132',
      sendTime: '2022-04-22 16:32',
    },
    {
      isMe: true,
      content: {
        goods_id: 44,
        goods_pic:
          'http://img30.360buyimg.com/popWaterMark/jfs/t1/118268/24/20913/49337/6225c410Eb5b62c7d/68007ca7550b4244.jpg',
        title: '智能水牙线口腔清理正畸洁牙器洗牙智能水牙线口腔清理正畸洁牙器洗牙',
        inventory: 1491,
        sales: 5,
        price: 149,
      },
      messageType: 5,
      avatar:
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKDZPvXt08QV5TyoUTT5NMFX3j3p3ZKnfWjXiaUGTJYvbL0ZvRsd2IzFQgyvorAv5JwcazafpfhshQ/132',
      sendTime: '2022-04-22 16:32',
    },
    {
      isMe: true,
      content: {
        goods_id: 44,
        goods_pic:
          'http://img30.360buyimg.com/popWaterMark/jfs/t1/118268/24/20913/49337/6225c410Eb5b62c7d/68007ca7550b4244.jpg',
        title: '智能水牙线口腔清理正畸洁牙器洗牙智能水牙线口腔清理正畸洁牙器洗牙',
        inventory: 1491,
        sales: 5,
        price: 149,
      },
      messageType: 5,
      avatar:
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKDZPvXt08QV5TyoUTT5NMFX3j3p3ZKnfWjXiaUGTJYvbL0ZvRsd2IzFQgyvorAv5JwcazafpfhshQ/132',
      sendTime: '2022-04-22 16:32',
    },
    {
      isMe: true,
      content: {
        goods_id: 44,
        goods_pic:
          'http://img30.360buyimg.com/popWaterMark/jfs/t1/118268/24/20913/49337/6225c410Eb5b62c7d/68007ca7550b4244.jpg',
        title: '智能水牙线口腔清理正畸洁牙器洗牙智能水牙线口腔清理正畸洁牙器洗牙',
        inventory: 1491,
        sales: 5,
        price: 149,
      },
      messageType: 5,
      avatar:
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKDZPvXt08QV5TyoUTT5NMFX3j3p3ZKnfWjXiaUGTJYvbL0ZvRsd2IzFQgyvorAv5JwcazafpfhshQ/132',
      sendTime: '2022-04-22 16:32',
    },
    {
      isMe: true,
      content: {
        goods_id: 44,
        goods_pic:
          'http://img30.360buyimg.com/popWaterMark/jfs/t1/118268/24/20913/49337/6225c410Eb5b62c7d/68007ca7550b4244.jpg',
        title: '智能水牙线口腔清理正畸洁牙器洗牙智能水牙线口腔清理正畸洁牙器洗牙',
        inventory: 1491,
        sales: 5,
        price: 149,
      },
      messageType: 5,
      avatar:
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKDZPvXt08QV5TyoUTT5NMFX3j3p3ZKnfWjXiaUGTJYvbL0ZvRsd2IzFQgyvorAv5JwcazafpfhshQ/132',
      sendTime: '2022-04-22 16:32',
    },
  ]);
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
    <div class="h-[calc(80vh-270px)] overflow-y-auto p-2">
      <div class="py-2" v-for="(item, index) in messageList" :key="index + 'msg'">
        <p class="text-center text-gray-400">{{ item.sendTime }}</p>
        <div class="flex" :class="item.isMe ? 'flex-row-reverse' : ''">
          <Avatar :size="40" :src="item.avatar" />
          <!-- 文本类型 -->
          <template v-if="item.messageType == 1">
            <div
              class="max-w-[200px] rounded-b-lg shadow-2xl mt-2 py-2 px-4"
              :class="
                item.isMe
                  ? 'bg-blue-500 rounded-tl-lg text-white mr-2'
                  : 'bg-white rounded-tr-lg ml-2'
              "
            >
              {{ item.content }}
            </div>
          </template>
          <!-- 商品推送 -->
          <template v-if="item.messageType == 5">
            <div class="max-w-[300px] bg-white flex mr-2 p-2 rounded-lg shadow-sm">
              <img class="w-[70px] h-[70px] object-cover" :src="item.content?.goods_pic" />
              <div class="flex-1 overflow-hidden">
                <div class="truncate">{{ item.content?.title }}</div>
                <div class="text-xs text-gray-400 py-1">
                  <span>库存：</span>
                  <span>{{ item.content?.inventory }}</span>
                  <span>销量：</span>
                  <span>{{ item.content?.sales }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-red-500">￥{{ item.content?.price }}</span>
                  <span class="text-blue-500 cursor-pointer">查看商品 ></span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <SendMessageBox />
  </div>
</template>

<style scoped></style>
