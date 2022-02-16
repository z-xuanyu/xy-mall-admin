<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-08 11:23:44
 * @LastEditTime: 2022-02-16 12:16:24
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { Card, Button, List, Image, Upload, Popconfirm } from 'ant-design-vue';
  import { Icon } from '@iconify/vue';
  import {
    upload,
    createMediaLibrary,
    getMediaLibraryList,
    removeMediaLibrary,
  } from '/@/api/media-library';
  import { useMessage } from '/@/hooks/web/useMessage';

  const ListItem = List.Item;
  const CardMeta = Card.Meta;

  const { createMessage } = useMessage();
  const props = defineProps({
    categoryId: {
      type: [String, null],
      default: null,
    },
    dataVal: {
      type: Array,
      default: () => [],
    },
  });
  const list = ref([]);
  const loading = ref<boolean>(false);

  onMounted(() => {
    fetch();
  });

  // 监听分类 刷新
  watch(
    () => props.categoryId,
    () => fetch(),
  );
  async function fetch() {
    const res = await getMediaLibraryList({ categoryId: props.categoryId });
    list.value = res.items;
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
    console.log(file, 1111);
    const res = await upload({ file: file.file });
    if (res.data.result) {
      await createMediaLibrary({
        name: file.file.name,
        url: res.data.result,
        categoryId: props.categoryId,
      });
      fetch();
      createMessage.success('图片上传成功!');
    }
    loading.value = false;
  }

  // 删除素材
  async function handleDelMedia(id) {
    await removeMediaLibrary(id);
    createMessage.success('删除成功!');
    fetch();
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
      <List
        :grid="{ gutter: 10, xs: 2, sm: 2, md: 2, lg: 3, xl: 6, xxl: 9 }"
        :data-source="list"
        :pagination="paginationProp"
      >
        <template #renderItem="{ item }">
          <ListItem class="md:h-[800px] h-[450px]">
            <Card>
              <template #cover>
                <div class="h-[180px] overflow-hidden">
                  <Image :src="item.url" />
                </div>
              </template>

              <CardMeta>
                <template #title>
                  <div class="flex justify-between items-center">
                    <h6 class="w-20 truncate">{{ item.name }}</h6>
                    <div class="flex space-x-2 cursor-pointer">
                      <Popconfirm title="您确认要删除该素材?" @confirm="handleDelMedia(item._id)">
                        <Icon icon="carbon:delete" width="20" />
                      </Popconfirm>
                    </div>
                  </div>
                </template>
              </CardMeta>
            </Card>
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
