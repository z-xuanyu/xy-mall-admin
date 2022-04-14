<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-16 15:27:23
 * @LastEditTime: 2022-04-14 18:09:40
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { RadioGroup, Radio, Form, FormItem, Input, Switch } from 'ant-design-vue';
  import { getFileStorage, updateFileStorageSite } from '/@/api/sitesetting/index';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { ref, reactive, onMounted } from 'vue';
  const { createMessage } = useMessage();
  const value = ref(1);

  const formState = reactive({
    name: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  });

  const aliOssForm = ref({
    domain: '',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
    region: '',
    delivery: false,
  });

  const labelCol = ref({
    style: {
      width: '150px',
    },
  });

  const wrapperCol = ref({
    span: 4,
  });
  async function onSubmit() {
    const data = {
      mode: value.value,
      aliOss: aliOssForm.value,
    };
    await updateFileStorageSite(data);
    createMessage.success('更新成功!');
  }

  onMounted(() => {
    fetchApi();
  });

  async function fetchApi() {
    const res = await getFileStorage();
    const { mode, aliOss } = res;
    value.value = ~~mode;
    aliOssForm.value.bucket = aliOss.bucket;
    aliOssForm.value.region = aliOss.region;
    aliOssForm.value.accessKeyId = aliOss.accessKeyId;
    aliOssForm.value.accessKeySecret = aliOss.accessKeySecret;
  }
</script>

<template>
  <div class="rounded-sm shadow mb-5 bg-white">
    <h1 class="text-lg p-2 border-b">存储设置</h1>
    <div class="px-2 pb-4">
      <div class="flex items-center my-4 p-2">
        <span class="w-[100px]">存储位置</span>
        <RadioGroup v-model:value="value">
          <Radio :value="1">本地服务器</Radio>
          <Radio :value="2">阿里云OSS</Radio>
          <!-- <Radio :value="3">七牛云存储</Radio> -->
        </RadioGroup>
      </div>
      <div class="pl-27" v-if="value === 1"> 选择存储到本地服务器，无需配置信息 </div>
      <!-- 阿里oss -->
      <div class="pl-20 mt-10" v-if="value === 2">
        <Form :model="aliOssForm" :label-col="labelCol" :wrapper-col="wrapperCol">
          <FormItem label="存储空间名称(Bucket)">
            <Input placeholder="请输入存储空间名称" v-model:value="aliOssForm.bucket" />
          </FormItem>
          <FormItem label="源(Region)">
            <Input placeholder="请输入存储源(Region)" v-model:value="aliOssForm.region" />
          </FormItem>
          <FormItem label="使用自定义域名">
            <Switch v-model:checked="aliOssForm.delivery" />
          </FormItem>
          <FormItem label="域名(Endpoint)">
            <Input placeholder="请输入域名" disabled v-model:value="aliOssForm.domain" />
            <p class="mt-1 text-xs text-gray-400"
              >示例: http://oss-xx-xxx-1.aliyuncs.com 或 http://mydomain.com</p
            >
          </FormItem>
          <FormItem label="AccessKey ID">
            <Input placeholder="请输入AccessKey ID" v-model:value="aliOssForm.accessKeyId" />
          </FormItem>
          <FormItem label="AccessKey Secret">
            <Input
              placeholder="请输入AccessKey Secret"
              v-model:value="aliOssForm.accessKeySecret"
            />
          </FormItem>
        </Form>
      </div>
      <!-- 七牛云 -->
      <div class="pl-20 mt-10" v-if="value === 3">
        <Form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
          <FormItem label="存储空间名称(Bucket)">
            <Input placeholder="请输入存储空间名称" v-model:value="formState.name" />
          </FormItem>
          <FormItem label="绑定域名">
            <Input placeholder="请输入域名" v-model:value="formState.name" />
            <p class="mt-1 text-xs text-gray-400"
              >示例: http://oss-xx-xxx-1.aliyuncs.com 或 http://mydomain.com</p
            >
          </FormItem>
          <FormItem label="AccessKey(AK)">
            <Input placeholder="请输入AccessKey(AK)" v-model:value="formState.name" />
          </FormItem>
          <FormItem label="SecretKey(SK)">
            <Input placeholder="请输入SecretKey(SK)" v-model:value="formState.name" />
          </FormItem>
        </Form>
      </div>
      <a-button class="ml-57 mt-5" type="primary" @click="onSubmit">保存</a-button>
    </div>
  </div>
</template>

<style scoped></style>
