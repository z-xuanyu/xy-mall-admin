<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-25 15:18:48
 * @LastEditTime: 2022-04-07 17:19:32
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Card, List, Row, Col, ListItem, Avatar, Empty } from 'ant-design-vue';
  import { getMemberViewHistories } from '/@/api/user';

  const props = defineProps({
    userId: {
      type: String,
      default: '',
    },
  });

  const loading = ref(false);
  const list = ref([]);

  const prefixCls = ref('list-card');

  // 分页
  const page = ref(1);
  const pageSize = ref(12);
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
    loading.value = true;
    page.value = p;
    pageSize.value = pz;
    fetch();
  }
  function pageSizeChange(_current, size) {
    loading.value = true;
    pageSize.value = size;
    fetch();
  }
  onMounted(() => {
    fetch();
  });

  // 请求接口
  async function fetch(p = {}) {
    const result = await getMemberViewHistories({
      userId: props.userId,
      pageCount: page.value,
      pageSize: pageSize.value,
      ...p,
    });
    total.value = result.totalCount;
    list.value = result.items;
    loading.value = false;
  }
</script>

<template>
  <List :pagination="paginationProp" :loading="loading">
    <Row :gutter="16">
      <template v-for="item in list" :key="item.authId">
        <Col :xs="24" :sm="12" :xl="8" :xxl="6">
          <ListItem>
            <Card :hoverable="true" :class="`${prefixCls}__card`">
              <div class="flex">
                <div :class="`${prefixCls}__card-title`">
                  <Avatar
                    shape="square"
                    :size="100"
                    class="border-2 border-gray-300"
                    :src="item.pic"
                  />
                </div>
                <div :class="`${prefixCls}__card-detail`" class="flex flex-col justify-between">
                  <p>{{ item.title }}</p>
                  <p>
                    <span class="text-red-500">￥</span>
                    <span class="text-red-500 text-lg">{{ item.price }}</span>
                  </p>
                </div>
              </div>
            </Card>
          </ListItem>
        </Col>
      </template>
    </Row>
    <div v-if="!list.length && !loading" class="w-full text-center">
      <Empty />
    </div>
  </List>
</template>
<style lang="less" scoped>
  .list-card {
    &__link {
      margin-top: 10px;
      font-size: 14px;
      a {
        margin-right: 30px;
      }
      span {
        margin-left: 5px;
      }
    }
    &__card {
      width: 100%;
      margin-bottom: -8px;
      .ant-card-body {
        padding: 16px;
      }
      &-detail {
        padding-top: 5px;
        padding-left: 20px;
        font-size: 14px;
        color: @text-color-secondary;
      }
    }
  }
</style>
