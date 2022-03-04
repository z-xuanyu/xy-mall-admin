<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-04 14:05:47
 * @LastEditTime: 2022-03-04 18:00:11
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { useSocketStoreWithOut } from '/@/store/modules/socket';
  const useSocketState = useSocketStoreWithOut();
  import { ref } from 'vue';
  import {
    InputSearch,
    List,
    Button,
    ListItem,
    ListItemMeta,
    Avatar,
    Textarea,
  } from 'ant-design-vue';
  import { SendOutlined } from '@ant-design/icons-vue';

  const value = ref('');
  const sendCotent = ref('');
  const data = ref([
    {
      title: '霸欲、天下',
    },
    {
      title: '素子花开  ',
    },
    {
      title: '一鹿陪你走过晗冬',
    },
    {
      title: '寂寞↗已成空',
    },
  ]);

  function handleClickSearch() {}

  function handleSend() {
    useSocketState.socket.emit('sendMessage', {
      userId: '6218492e30fcf580690cc847',
      adminId: '61d502c9ccea3f676c52368a',
      content: sendCotent.value,
    });
  }
</script>

<template>
  <div class="mx-[200px] mt-10 shadow-lg flex bg-white">
    <div class="w-[380px] border-r h-[1000px] p-5">
      <InputSearch
        v-model:value="value"
        placeholder="请输入搜索关键词"
        enter-button="搜索"
        @search="handleClickSearch"
      />

      <div class="mt-5">
        <List item-layout="horizontal" :data-source="data">
          <template #renderItem="{ item }">
            <ListItem>
              <div class="cursor-pointer w-full">
                <ListItemMeta description="你好，在吗？">
                  <template #title>
                    <div class="flex w-full justify-between">
                      <h4>{{ item.title }}</h4>
                      <span class="font-thin text-xs text-gray-400">2022/03/03</span>
                    </div>
                  </template>
                  <template #avatar>
                    <Avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                  </template>
                </ListItemMeta>
              </div>
            </ListItem>
          </template>
        </List>
      </div>
    </div>
    <div class="flex-1 flex flex-col">
      <h5 class="border-b py-3 text-center">正在和“素子花开”聊天中</h5>
      <div class="flex flex-1 flex-col justify-between">
        <div class="content">
          <!-- 聊天信息 -->
          <div class="flex">
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <div class="ml-1">
              <h3>素子花开</h3>
              <div class="content bg-gray-200 rounded-tr-lg rounded-b p-2 px-5"> 2121212121 </div>
            </div>
          </div>
          <div class="flex flex-row-reverse">
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <div class="mr-1 text-right">
              <h3>素子花开</h3>
              <div class="content bg-blue-500 text-white rounded-tl-lg rounded-b p-2 px-5">
                2121212121
              </div>
            </div>
          </div>
        </div>
        <div class="send-box relative">
          <Textarea
            v-model:value="sendCotent"
            class="h-[120px]"
            placeholder="请输入聊天内容"
            allow-clear
          />
          <div class="absolute bottom-5 right-5">
            <Button type="primary" shape="circle" @click="handleSend">
              <template #icon>
                <SendOutlined />
              </template>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
