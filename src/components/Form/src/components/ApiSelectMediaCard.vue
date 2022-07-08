<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-07-04 10:33:59
 * @LastEditTime: 2022-07-08 11:39:07
 * @Description: 媒体文件选择卡
-->

<script setup lang="ts">
  import { ref, onMounted,watchEffect, computed } from 'vue';
  import type { PropType } from 'vue';
  import { Modal,Tree, type TreeProps, List,ListItem, Image, message } from 'ant-design-vue';
  import { Icon } from '@iconify/vue';
  import { isFunction,isArray } from '/@/utils/is';
  import { TransformTreeArr } from '/@/utils';
  const props = defineProps({
    value: {
      type: [String, Array],
      default: '',
    },
    // 文件分类api
    categoryApi: { type: Function as PropType<(arg?: Recordable) => Promise<Recordable>> },
    // 文件库api
    api: { type: Function as PropType<(arg?: Recordable) => Promise<Recordable>> },
    // 是否多选
    isMultiple: { type: Boolean, default: false },
    // 高度
    height: { type: Number, default: 100 },
    // 宽度
    width: { type: Number, default: 100 },
  });

  const emit = defineEmits(['update:value']);

  const visible = ref(false);
  const imgData = ref<any>([]);
  const treeData = ref<TreeProps['treeData']>([]);
  const selectImg = ref<string | string[]>('');
  // 是否替换图片
  const isReplace = ref(false);
  // 替换下标
  const replaceIndex = ref<number>(0);

  onMounted(() => {
    fetchCategory()
    fetch()
  });
  watchEffect(()=>{
    selectImg.value = props.value as string | string[];
  })

  const getImgStyles = computed(()=>{
    return {
      height: props.height + 'px',
      width: props.width + 'px',
    }
  })

  // 获取文件分类
  async function fetchCategory() {
    const { categoryApi } = props;
    if (!categoryApi || !isFunction(categoryApi)) return;
    const res:any = await categoryApi();
    treeData.value = TransformTreeArr(res)
  }

  // 获取文件库
  async function fetch(p = {}) {
    const { api } = props;
    if (!api || !isFunction(api)) return;
    const result = await api({
      pageNumber: page.value,
      pageSize: pageSize.value,
      ...p,
    });
    imgData.value = result.items.map(item=>({...item, isSelected: false}));
    total.value = result.total;
  }

  //  分页相关
  const page = ref(1);
  const pageSize = ref(15);
  const total = ref(0);
  const paginationProp = ref({
    showSizeChanger: false,
    showQuickJumper: true,
    pageSize,
    current: page,
    total,
    showTotal: (total) => `总 ${total} 条`,
    onChange: pageChange,
    onShowSizeChange: pageSizeChange,
  });

  function pageChange(p, pz) {
    page.value = p;
    pageSize.value = pz;
  }
  function pageSizeChange(_current, size) {
    pageSize.value = size;
  }
  // 打开选择文件弹窗
  function handleOpen() {
    if(isArray(selectImg.value) && !props.isMultiple) return message.warning('请传入isMultiple为true');
    if(!isArray(selectImg.value) && props.isMultiple) return message.warning('v-model:value请绑定数组类型数据');
    // 重置选中
    imgData.value.forEach(i => (i.isSelected = false));
    visible.value = true;
  }

  // 点击选择分类
  function handleSelectCategory(value) {
    fetch({
      categoryId: value[0],
    });
  }

  // 选中图片
  function handleSelectImg(item: any) {
    const { isMultiple } = props;
    // 是否替换图片
    if(isReplace.value) {
        if(isMultiple) {
           (selectImg.value as Array<string>)[replaceIndex.value] = item.url;
        } else {
            selectImg.value = item.url;
        }
      imgData.value.forEach(i => (i._id == item._id ? i.isSelected = true : i.isSelected = false));

      return false;
    }
    // 添加图片
    if (isMultiple) {
      // 未选择添加
      if(!item.isSelected) {
        selectImg.value = [...(selectImg.value as string[]), item.url]
      }else {
        // 已选择删除
        selectImg.value = (selectImg.value as string[]).filter(v=>v !== item.url)
      }
      item.isSelected = !item.isSelected;
    } else {
      selectImg.value = item.url;
      imgData.value.forEach(i => (i._id == item._id ? i.isSelected = true : i.isSelected = false));
    }
  }

  // 替换图片
  function handleReplaceImage(index?: number) {
    // 重置选中
    imgData.value.forEach(i => (i.isSelected = false));
    isReplace.value = true;
    visible.value = true;
    replaceIndex.value = index || 0;
  }

  // 删除图片
  function handleDelImage(index: number) {
    if(props.isMultiple) {
      (selectImg.value as Array<string>).splice(index, 1);
    } else {
      selectImg.value = '';
    }
  }

  // 点击确认按钮
  function handleOk() {
    visible.value = false;
    isReplace.value = false;
    emit('update:value', selectImg.value);
  }

  // 关闭弹窗
  function onClose() {
    console.log(props.value,'5454564');
    visible.value = false;
    isReplace.value = false;
    selectImg.value = props.value as string | string[];
  }
</script>

<template>
  <div class="select-media-page">
    <!-- 选中框 -->
    <div class="flex" :class="isArray(selectImg) ? 'space-x-2' : ''">
      <!-- 单图 -->
      <div
        v-if="!isArray(selectImg) && !isMultiple && selectImg"
        class="overflow-hidden rounded-md relative group"
        :style="getImgStyles"
      >
        <Image :width="width" :height="height" :src="(selectImg as string)" />
        <div
          class="
            absolute
            text-center
            space-x-2
            bottom-0
            right-0
            text-white
            hidden
            flex
            justify-center
            left-0
            bg-gray-400
            group-hover:block
          "
        >
          <span @click="handleReplaceImage(0)">替换</span>
          <span>|</span>
          <span @click="handleDelImage(0)">删除</span>
        </div>
      </div>
      <!-- 多图 -->
      <template v-if="isArray(selectImg) && isMultiple">
        <div
          class="overflow-hidden rounded-md relative group"
          :style="getImgStyles"
          v-for="(item, index) in selectImg"
          :key="index"
        >
          <Image :width="width" :height="height" :src="item" />
          <div
            class="
              absolute
              text-center
              space-x-2
              bottom-0
              right-0
              text-white
              hidden
              flex
              justify-center
              left-0
              bg-gray-400
              group-hover:block
            "
          >
            <span @click="handleReplaceImage(index)">替换</span>
            <span>|</span>
            <span @click="handleDelImage(index)">删除</span>
          </div>
        </div>
      </template>
      <!-- 添加框 -->
      <div
        class="
          text-center
          rounded-md
          border
          bg-white
          cursor-pointer
          flex
          justify-center
          items-center
          border-width-2 border-dashed border-gray-300
        "
        :style="getImgStyles"
        @click="handleOpen"
        v-if="!selectImg.length || isMultiple"
      >
        <Icon :width="20" icon="fluent:add-24-filled" />
      </div>
    </div>
    <!-- 弹出选择 -->
    <Modal
      v-model:visible="visible"
      width="1200px"
      title="选择素材"
      @ok="handleOk"
      @cancel="onClose"
      :maskClosable="false"
    >
      <div class="bg-gray-100">
        <div class="flex w-full">
          <!-- 分类 -->
          <div class="w-[250px] h-[650px] mr-5 bg-white py-4 px-2">
            <Tree
              :tree-data="treeData"
              show-icon
              :fieldNames="{ children: 'children', title: 'name', key: '_id' }"
              @select="handleSelectCategory"
            >
              <template #icon>
                <svg
                  t="1657095876684"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2874"
                  width="20"
                  height="20"
                >
                  <path
                    d="M918.673 883H104.327C82.578 883 65 867.368 65 848.027V276.973C65 257.632 82.578 242 104.327 242h814.346C940.422 242 958 257.632 958 276.973v571.054C958 867.28 940.323 883 918.673 883z"
                    fill="#FFE9B4"
                    p-id="2875"
                  />
                  <path
                    d="M512 411H65V210.37C65 188.597 82.598 171 104.371 171h305.92c17.4 0 32.71 11.334 37.681 28.036L512 411z"
                    fill="#FFB02C"
                    p-id="2876"
                  />
                  <path
                    d="M918.673 883H104.327C82.578 883 65 865.42 65 843.668V335.332C65 313.58 82.578 296 104.327 296h814.346C940.422 296 958 313.58 958 335.332v508.336C958 865.32 940.323 883 918.673 883z"
                    fill="#FFCA28"
                    p-id="2877"
                  />
                </svg>
              </template>
            </Tree>
          </div>
          <!-- 素材卡片 -->
          <div class="flex-1 bg-white p-4 h-[650px]">
            <List
              :grid="{ gutter: 10, column: 5 }"
              :data-source="imgData"
              :pagination="paginationProp"
              style="height: 100%"
            >
              <template #renderItem="{ item }">
                <ListItem>
                  <div
                    class="rounded-sm box-border relative"
                    :class="item.isSelected ? 'border-2 border-purple-500' : ''"
                    @click="handleSelectImg(item)"
                  >
                    <img
                      class="cursor-pointer h-[170px] w-full object-cover"
                      :preview="false"
                      :src="item.url"
                    />
                    <!-- 选中图片 -->
                    <div
                      class="absolute top-2 right-2 w-5 h-5 rounded-full bg-purple-700"
                      v-if="item.isSelected"
                    >
                      <Icon icon="teenyicons:tick-small-solid" width="20" color="#FFF" />
                    </div>
                  </div>
                </ListItem>
              </template>
            </List>
          </div>
        </div>
        <!-- 选中区域 -->
        <div class="border mt-4 p-4 bg-white flex items-center h-[120px]" v-if="!isReplace">
          <div class="mr-4">已选图片</div>
          <div class="flex-1 flex space-x-4">
            <!-- 单图 -->
            <img
              class="rounded-md w-[80px] h-[80px] object-cover"
              v-if="!isArray(selectImg) && !isMultiple && selectImg.length"
              :src="(selectImg as string)"
            />
            <!-- 多图 -->
            <template v-if="isArray(selectImg) && isMultiple">
              <img
                class="rounded-md w-[80px] h-[80px] object-cover"
                v-for="(item, index) in selectImg"
                :key="index"
                :src="item"
              />
            </template>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style lang="less" scoped></style>
