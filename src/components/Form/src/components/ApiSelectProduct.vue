<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-06-10 14:43:08
 * @LastEditTime: 2022-06-10 16:42:39
 * @Description: 选择商品卡片组件封装
-->
<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue';
  import type { PropType } from 'vue';
  import { Modal, Card, List, Row, Col, ListItem, Avatar, Empty } from 'ant-design-vue';
  import { Icon } from '@iconify/vue';
  import { isFunction } from '/@/utils/is';
  import { FormSchema } from '../types/form';
  import BasicForm from '../BasicForm.vue';

  interface GoodsItem {
    _id: string;
    pic: string;
    title: string;
    price: number;
  }

  const props = defineProps({
    value: {
      type: String,
      default: '',
    },
    api: { type: Function as PropType<(arg?: Recordable) => Promise<Recordable>> },
  });

  const emit = defineEmits(['update:value']);

  const visible = ref(false);
  const defaultValue = ref(props.value);

  //  下面是商品卡片列表逻辑
  //  选择卡片内容区域
  //

  // 搜索
  const FormSchemas: FormSchema[] = [
    {
      field: 'title',
      label: '商品标题',
      component: 'Input',
      labelWidth: 80,
      componentProps: {
        placeholder: '请输入搜索商品标题',
      },
    },
  ];

  // 确认搜索
  function handleSearchSubmit(values) {
    fetch({ title: values.title });
  }

  const loading = ref<boolean>(false);
  const list = ref<Array<GoodsItem>>([]);

  const prefixCls = ref<string>('list-card');

  // 分页
  const page = ref<number>(1);
  const pageSize = ref<number>(12);
  const total = ref<number>(0);
  const paginationProp = ref({
    showSizeChanger: false,
    showQuickJumper: true,
    pageSize,
    current: page,
    total,
    showTotal: (total: number) => `总 ${total} 条`,
    onChange: pageChange,
    onShowSizeChange: pageSizeChange,
  });

  function pageChange(p: number, pz: number) {
    loading.value = true;
    page.value = p;
    pageSize.value = pz;
    fetch();
  }
  function pageSizeChange(_current: number, size: number) {
    loading.value = true;
    pageSize.value = size;
    fetch();
  }
  onMounted(() => {
    fetch();
  });

  // 请求接口
  async function fetch(p = {}) {
    const { api } = props;
    if (!api || !isFunction(api)) return;
    const result = await api({
      pageNumber: page.value,
      pageSize: pageSize.value,
      ...p,
    });
    total.value = result.total;
    list.value = result.items;
    loading.value = false;
  }

  // 确认选择
  function handleOk() {
    visible.value = false;
    emit('update:value', defaultValue.value);
  }

  // 选中商品图片
  const selectProductPic = computed(() => {
    const item = list.value.find((item) => item._id === defaultValue.value);
    return item ? item.pic : '';
  });
  // 如果关闭弹出未选择确认，恢复默认
  function afterClose() {
    defaultValue.value = props.value;
  }

  // 选择确认后,想清除
  function handleCloseValue() {
    defaultValue.value = '';
  }
</script>

<template>
  <div>
    <div class="w-[110px] h-[110px] rounded-lg cursor-pointer" @click="visible = !visible">
      <div class="w-full h-full relative" v-if="selectProductPic">
        <img :src="selectProductPic" class="w-full h-full object-center" alt="" />
        <Icon
          icon="eva:close-circle-outline"
          class="absolute text-2xl -top-2 -right-4"
          @click.stop="handleCloseValue"
        />
      </div>

      <p
        class="border-dashed border-2 w-full flex justify-center items-center h-full rounded-lg"
        v-else
      >
        <Icon icon="ic:outline-photo-size-select-large" class="text-2xl" />
      </p>
    </div>
    <Modal
      v-model:visible="visible"
      width="1000px"
      title="选择商品"
      @ok="handleOk"
      :afterClose="afterClose"
    >
      <div class="p-4" :class="prefixCls">
        <!-- 搜索表单 -->
        <div class="form-wrapper">
          <BasicForm
            :labelWidth="80"
            :schemas="FormSchemas"
            :actionColOptions="{ span: 24 }"
            @submit="handleSearchSubmit"
          />
        </div>
        <!-- 列表 -->
        <List :pagination="paginationProp" :loading="loading">
          <Row :gutter="16">
            <template v-for="item in list" :key="item._id">
              <Col :span="12">
                <ListItem>
                  <Card
                    :hoverable="true"
                    :class="`${prefixCls}__card`"
                    :style="{ border: defaultValue === item._id ? '1px solid #1890ff' : '' }"
                    @click="defaultValue = item._id"
                  >
                    <div class="flex">
                      <div :class="`${prefixCls}__card-title`">
                        <Avatar
                          shape="square"
                          :size="100"
                          class="border-2 border-gray-300"
                          :src="item.pic"
                        />
                      </div>
                      <div
                        :class="`${prefixCls}__card-detail`"
                        class="flex flex-col justify-between"
                      >
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
      </div>
    </Modal>
  </div>
</template>

<style scoped lang="less">
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
