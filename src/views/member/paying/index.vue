<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-16 15:53:58
 * @LastEditTime: 2022-07-08 16:39:23
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ApiSelectUserCard } from '/@/components/Form';
  import { ref } from 'vue';

  const arr = ref<string[]>([]);
</script>

<template>
  <div>
    <h1>付费会员</h1>
    <ApiSelectUserCard v-model:value="arr" />
    {{ arr }}
  </div>
</template>

<style scoped></style>
