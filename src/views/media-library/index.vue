<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-07 12:15:32
 * @LastEditTime: 2022-01-07 18:14:09
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { Card, Button, List, Image } from 'ant-design-vue';
  import { Icon } from '@iconify/vue';
  import LibraryCategoryTree from './LibraryCategoryTree.vue';
  import { grid } from './data';
  const ListItem = List.Item;
  const CardMeta = Card.Meta;

  const list = ref([1, 2, 3]);

  const height = computed(() => {
    return `h-${120 - grid.value * 6}`;
  });

  onMounted(() => {
    fetch();
  });

  async function fetch() {
    console.log('请求接口');
    total.value = list.value.length;
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
</script>

<template>
  <div class="media-library-page p-5">
    <div class="flex space-x-5">
      <div class="bg-white w-[350px]">
        <LibraryCategoryTree />
      </div>
      <div class="flex-1 bg-white">
        <Card title="全部">
          <div class="space-x-3 px-5">
            <Button size="small" type="primary">上传图片</Button>
          </div>

          <div class="p-5 list-card h-full">
            <List
              :grid="{ gutter: 5, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: grid }"
              :data-source="list"
              :pagination="paginationProp"
            >
              <template #renderItem="{ item }">
                <ListItem>
                  <Card>
                    <template #cover>
                      <div :class="height">
                        <Image
                          src="http://demo.leadshop.vip/upload/image/2021/12/17/c40806088cace98dee4a871401be34e5.jpeg"
                        />
                      </div>
                    </template>
                    <template #actions>
                      <span>删除</span>
                    </template>

                    <CardMeta>
                      <template #title>
                        <div class="flex justify-between items-center">
                          <h6 class="w-20 truncate">文件名文件名文件名文件名文件名{{ item }}</h6>
                          <div class="flex space-x-2 cursor-pointer"
                            ><Icon icon="carbon:edit" width="20" /><Icon
                              icon="carbon:delete"
                              width="20"
                          /></div>
                        </div>
                      </template>
                    </CardMeta>
                  </Card>
                </ListItem>
              </template>
            </List>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .list-card :deep(.ant-card-body) {
    padding: 5px 10px;
  }
</style>
