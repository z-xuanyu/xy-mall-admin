<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-08 17:35:14
 * @LastEditTime: 2022-01-11 11:23:01
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref, watch, provide } from 'vue';
  import { Icon } from '@iconify/vue';
  import { Image } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import SelectMediaLibraryModal from './SelectMediaLibraryModal.vue';
  const [register, { openModal }] = useModal();

  const props = defineProps({
    modelValue: {
      type: [String, Array],
      default: () => [],
    },
    // 是否多图上传
    multiple: {
      type: Boolean,
      default: false,
    },
  });

  const dataVal = ref(props.modelValue);
  const isReplace = ref(false);
  const currentIndex = ref(0); // 替换当前的index
  const currentDelIndex = ref(0); // 删除选择项index

  provide('currentIndex', currentIndex);
  provide('isReplace', isReplace);
  provide('currentDelIndex', currentDelIndex);

  const emit = defineEmits(['update:modelValue']);

  //   确认
  function handleSuccess(val) {
    dataVal.value = JSON.parse(JSON.stringify(val.map((item) => (item?.url ? item.url : item))));
  }

  // 替换图片
  function handleReplaceImage(index) {
    currentIndex.value = index;
    isReplace.value = true;
    openModal();
  }

  // 删除图片
  function handleDelImage(index) {
    currentDelIndex.value = index;
    dataVal.value.splice(index, 1);
  }
  //   响应式监听
  watch(
    () => dataVal.value,
    () => {
      emit(
        'update:modelValue',
        dataVal.value.map((item) => (item?.url ? item.url : item)),
      );
    },
  );
</script>

<template>
  <div class="upload-image">
    <div class="flex space-x-3">
      <template v-if="dataVal">
        <!-- 多图上传 -->
        <template v-if="multiple">
          <div
            class="w-28 relative photo h-28 overflow-hidden cursor-pointer rounded"
            v-for="(item, index) in dataVal"
            :key="item"
          >
            <Image class="object-cover" :src="item" />
            <div class="hidden active">
              <div
                class="
                  absolute
                  space-x-2
                  bottom-0
                  right-0
                  text-white
                  flex
                  justify-center
                  left-0
                  bg-gray-400
                "
              >
                <span @click="handleReplaceImage(index)">替换</span>
                <span>|</span>
                <span @click="handleDelImage(index)">删除</span>
              </div>
            </div>
          </div>
        </template>
        <!-- 单图 -->
        <div class="w-28 relative photo h-28 overflow-hidden cursor-pointer rounded" v-else>
          <Image class="object-cover" :src="dataVal[0]" />
          <div class="hidden active">
            <div
              class="
                absolute
                space-x-2
                bottom-0
                right-0
                text-white
                flex
                justify-center
                left-0
                bg-gray-400
              "
            >
              <span @click="openModal">替换</span>
              <span>|</span>
              <span>删除</span>
            </div>
          </div>
        </div>
      </template>

      <div
        @click="openModal"
        v-if="!dataVal || multiple"
        class="
          w-28
          h-28
          border-width-2 border-dashed border-gray-300
          rounded-md
          flex
          justify-center
          items-center
          cursor-pointer
        "
      >
        <div class="text-center">
          <div class="flex justify-center">
            <Icon icon="fluent:add-24-filled" />
          </div>
          <p>添加图片</p>
        </div>
      </div>
    </div>
    <SelectMediaLibraryModal
      @register="register"
      @success="handleSuccess"
      :multiple="multiple"
      :dataVal="dataVal"
    />
  </div>
</template>

<style scoped>
  .photo:hover .active {
    display: block;
  }
  .upload-image :deep(.ant-image),
  :deep(.ant-image-img) {
    height: 100%;
    width: 100%;
  }
</style>
