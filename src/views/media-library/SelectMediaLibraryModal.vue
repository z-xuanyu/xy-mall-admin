<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-08 15:02:59
 * @LastEditTime: 2022-06-13 18:26:20
 * @Description: Modify here please
-->

<script lang="ts" setup>
  import { ref, inject, watch } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import SelectMediaCard from './SelectMediaCard.vue';
  import LibraryCategoryTree from './LibraryCategoryTree.vue';
  import { Icon } from '@iconify/vue';

  const props = defineProps({
    // 是否多图
    multiple: {
      type: Boolean,
      default: false,
    },
    // 默认值
    dataVal: {
      type: Array,
      default: () => [],
    },
  });
  const [registerModal, { closeModal }] = useModalInner();
  // 是否替換图片
  const isReplace = inject('isReplace') as any;
  const currentDelIndex = inject('currentDelIndex') as any;
  const emit = defineEmits(['success', 'register']);
  const selectVal = ref<any>([]);
  const selectCardRef = ref<HTMLElement | null>(null);

  let selectCategoryId = ref<string | null>(null);
  //   选择分类
  function handleSelectCategory(categoryId: string) {
    selectCategoryId.value = categoryId;
  }

  //   选择中素材
  function handleSelectVal(val) {
    selectVal.value = val;
  }
  //   取消选中素材
  function handleDelSelectVal(id: string) {
    (selectCardRef.value as any).handleDelSelect(id);
  }
  //  确认
  function onConfirm() {
    emit('success', isReplace.value ? selectVal.value : [...props.dataVal, ...selectVal.value]);
    closeModal();
  }

  // 监听弹窗显隐
  function handleVisibleChange(val) {
    if (!val) {
      isReplace.value = false;
      (selectCardRef.value as any).fetch();
      (selectCardRef.value as any).resetSelectVal();
      selectVal.value = [];
    }
  }

  const mergeSelectVal = ref<any>([]);
  watch(
    () => currentDelIndex.value,
    () => {
      mergeSelectVal.value = [...props.dataVal, ...selectVal.value];
      mergeSelectVal.value.splice(currentDelIndex.value, 1);
    },
  );
</script>
<template>
  <BasicModal
    v-bind="$attrs"
    title="选择素材"
    @register="registerModal"
    width="1000px"
    @ok="onConfirm"
    @visible-change="handleVisibleChange"
  >
    <div class="flex space-x-5">
      <div class="w-[250px]">
        <LibraryCategoryTree @select="handleSelectCategory" :isSelectCard="true" />
      </div>
      <div class="flex-1">
        <SelectMediaCard
          @select="handleSelectVal"
          ref="selectCardRef"
          :categoryId="selectCategoryId"
          :multiple="multiple"
          :dataVal="dataVal"
        />
      </div>
    </div>
    <div
      class="border p-5 my-5 flex items-center space-x-5"
      v-if="(!isReplace && multiple) || !isReplace"
    >
      <span class="w-[40px]">已选图片</span>
      <div class="flex space-x-5">
        <div class="relative" v-for="item in selectVal" :key="item._id">
          <img class="w-[80px] h-[80px] object-cover rounded" :src="item.url" alt="" />
          <Icon
            icon="ci:off-outline-close"
            class="absolute -top-2 -right-2 cursor-pointer"
            width="20"
            color="red"
            @click="handleDelSelectVal(item._id)"
          />
        </div>
      </div>
    </div>
  </BasicModal>
</template>
