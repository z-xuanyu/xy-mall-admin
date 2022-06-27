<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-08 11:23:44
 * @LastEditTime: 2022-06-27 11:39:32
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref, onMounted, watch, inject } from 'vue';
  import { Card, Button, List, Upload } from 'ant-design-vue';
  import { upload, createMediaLibrary, getMediaLibraryList } from '/@/api/media-library';
  import { Icon } from '@iconify/vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  const ListItem = List.Item;

  const { createMessage } = useMessage();
  const props = defineProps({
    // 素材分类id
    categoryId: {
      type: [String],
      default: null,
    },
    // 是否多图
    multiple: {
      type: Boolean,
      default: false,
    },
    dataVal: {
      type: Array,
      default: () => [],
    },
  });

  // 是否替換图片
  const isReplace: any = inject('isReplace');
  // 替换当前item
  const currentIndex: any = inject('currentIndex');
  const emit = defineEmits(['select']);
  defineExpose({
    handleDelSelect,
    fetch,
    resetSelectVal,
  });
  const list = ref<any>([]);
  const loading = ref<boolean>(false);

  onMounted(() => {
    fetch();
  });

  // 监听分类 刷新
  watch([() => props.categoryId, () => isReplace.value], () => fetch());
  async function fetch() {
    const res = await getMediaLibraryList({ categoryId: props.categoryId });
    list.value = res.items.map((item) => {
      return { ...item, isSelect: false };
    });
    total.value = res.total;
  }

  //分页相关
  const page = ref(1);
  const pageSize = ref(36);
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
    fetch();
  }
  function pageSizeChange(_current, size) {
    pageSize.value = size;
    fetch();
  }

  // 上传前
  function beforeUpload(file) {
    loading.value = true;
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      createMessage.error('上传图片格式必须为JPG/PNG');
      loading.value = false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      createMessage.error('图片大小已超过2MB!');
      loading.value = false;
    }
  }
  // 上传接口
  async function handleUploadRequest(file) {
    const res = await upload({ file: file.file });
    if (res.data.result) {
      await createMediaLibrary({
        name: file.file.name,
        url: res.data.result.url,
        categoryId: props.categoryId,
        storageType: res.data.result.storageType,
      });
      fetch();
      createMessage.success('图片上传成功!');
    }
    loading.value = false;
  }
  // 点击选择
  function onClickSelect(item) {
    // 更新
    if (isReplace.value) {
      list.value.forEach((v) => {
        v._id == item._id ? (item.isSelect = !item.isSelect) : (v.isSelect = false);
      });
      // 替换
      let selectArr: any = [...props.dataVal];
      selectArr[currentIndex.value] = item;
      emit('select', selectArr);
    } else {
      // 添加
      if (!props.multiple) {
        list.value.forEach((v) => {
          v._id == item._id ? (item.isSelect = !item.isSelect) : (v.isSelect = false);
        });
        selectVal.value.length ? (selectVal.value[0] = item) : selectVal.value.push(item);
      } else {
        // 存在添加
        if (!item.isSelect) {
          selectVal.value.push(item);
        } else {
          // 去除
          selectVal.value.splice(
            selectVal.value.findIndex((v) => v?._id == item._id),
            1,
          );
        }
        item.isSelect = !item.isSelect;
      }
      emit('select', selectVal.value);
    }
  }
  // 选择中图片
  const selectVal = ref<any>([]);
  // 删除选择
  function handleDelSelect(id: string) {
    list.value.forEach((item) => {
      if (item._id == id) item.isSelect = false;
    });
    selectVal.value.splice(
      selectVal.value.findIndex((v) => v._id == id),
      1,
    );
    emit('select', selectVal.value);
  }
  // 重置选中值
  function resetSelectVal() {
    selectVal.value = [];
  }
</script>

<template>
  <Card title="全部">
    <div class="space-x-3 px-5">
      <Upload
        name="file"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        :customRequest="handleUploadRequest"
      >
        <Button size="small" :loading="loading" type="primary">上传图片</Button>
      </Upload>
    </div>

    <div class="p-5 list-card h-full">
      <List :grid="{ gutter: 10, column: 4 }" :data-source="list" :pagination="paginationProp">
        <template #renderItem="{ item }">
          <ListItem>
            <div
              class="h-[150px] relative overflow-hidden border rounded p-5"
              :class="item.isSelect && 'border-purple-700'"
              @click="onClickSelect(item)"
            >
              <img :src="item.url" class="w-full h-full overflow-hidden object-cover" />
              <div
                class="absolute top-2 left-2 w-5 h-5 rounded-full bg-purple-700"
                v-if="item.isSelect"
              >
                <Icon icon="teenyicons:tick-small-solid" width="20" color="#FFF" />
              </div>
            </div>
            <p class="truncate">{{ item.name }}</p>
          </ListItem>
        </template>
      </List>
    </div>
  </Card>
</template>

<style scoped>
  .list-card :deep(.ant-card-body) {
    padding: 5px 10px;
  }
  .list-card :deep(.ant-list-pagination) {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
