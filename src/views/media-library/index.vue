<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-07 12:15:32
 * @LastEditTime: 2022-01-11 11:09:32
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref } from 'vue';
  import LibraryCategoryTree from './LibraryCategoryTree.vue';
  import MediaLibraryCard from './MediaLibraryCard.vue';
  import UploadImage from './UploadImage.vue';
  const categoryId = ref<string | null>(null);
  const testUrl = ref([
    'http://nestshop.oss-cn-shenzhen.aliyuncs.com/c6540eef1a44231634caad49118994bb.jpg',
  ]);
  // 选中分类筛选媒体素材文件
  function handleSelect(id) {
    categoryId.value = id;
  }
</script>

<template>
  <div class="media-page">
    <div class="media-library-page p-5">
      <div class="md:flex md:space-x-5">
        <div class="bg-white md:w-[350px]">
          <LibraryCategoryTree @select="handleSelect" />
        </div>
        <div class="flex-1 mt-5 md:mt-0 bg-white">
          <MediaLibraryCard :categoryId="categoryId" />
        </div>
      </div>
      <UploadImage :multiple="true" v-model="testUrl" />
    </div>
  </div>
</template>
