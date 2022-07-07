<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-16 15:53:58
 * @LastEditTime: 2022-07-07 17:35:25
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ApiSelectMediaCard } from '/@/components/Form';
  import { getMediaLibraryList } from '/@/api/media-library';
  import { getLibraryCategoryList } from '/@/api/library-category';
  import { ref } from 'vue';

  const defaultUrl = ref(
    'http://nestshop.oss-cn-shenzhen.aliyuncs.com/images/00fba5b8-5aae-466f-9eba-8551d039080b.jpg',
  );
  const arr = ref<string[]>([]);
</script>

<template>
  <div>
    <h1>付费会员</h1>
    <ApiSelectMediaCard
      :api="getMediaLibraryList"
      :category-api="getLibraryCategoryList"
      v-model:value="defaultUrl"
    />

    {{ defaultUrl }}
    {{ arr }}
  </div>
</template>

<style scoped></style>
