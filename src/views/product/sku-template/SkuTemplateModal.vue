<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-02 17:21:23
 * @LastEditTime: 2022-04-22 11:00:03
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './skuTemplate.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { InputSearch } from 'ant-design-vue';
  import { createProductSkuTemplate, updateProductSkuTemplate } from '/@/api/sku-template';

  const emit = defineEmits(['success', 'register']);

  const skuTemplateId = ref<string>('');
  const skuValues = ref<any>([]);
  const value = ref('');

  const { createMessage } = useMessage();
  const isUpdate = ref(true);
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 80,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    skuValues.value = [];
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      skuTemplateId.value = data.record._id;
      skuValues.value = data.record.values;
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增规格模板' : '编辑规格模板'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // 新增
      if (!unref(isUpdate)) {
        await createProductSkuTemplate(values);
        createMessage.success('添加成功!');
      } else {
        // 编辑
        await updateProductSkuTemplate(skuTemplateId.value, values);
        createMessage.success('编辑成功!');
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  function onAddSkuValue() {
    skuValues.value.push(value.value);
    setFieldsValue({
      values: skuValues.value,
    });
    value.value = '';
  }

  // 删除
  function onClose(index) {
    skuValues.value.splice(index, 1);
    setFieldsValue({
      values: skuValues.value,
    });
  }
</script>

<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #values>
        <div class="space-y-5">
          <InputSearch
            @search="onAddSkuValue"
            placeholder="请输入规格值"
            v-model:value="value"
            enter-button="添加"
          />
          <div class="flex space-x-2">
            <span
              class="border flex items-center px-2 py-1 rounded-sm"
              v-for="(item, index) in skuValues"
              :key="index"
            >
              <i class="w-3 h-3 inline-block bg-blue-600 rounded-full mr-2"></i> {{ item }}
              <i class="mx-2 cursor-pointer ml-3" @click="onClose(index)">x</i>
            </span>
          </div>
        </div>
      </template>
    </BasicForm>
  </BasicModal>
</template>

<style scoped></style>
