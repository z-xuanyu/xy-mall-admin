<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 11:35:23
 * @LastEditTime: 2022-05-07 11:30:49
 * @Description: 添加管理员
-->
<script setup lang="ts">
  import { ref, unref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './admin.data';
  import { createAdmin, updateAdmin } from '/@/api/admin';
  import { getRoles } from '/@/api/role';
  import { Row, Col, CheckboxGroup, Checkbox } from 'ant-design-vue';

  const emit = defineEmits(['success', 'register']);
  const adminId = ref<string | null>(null);
  const roleList = ref<any>([]);
  const isUpdate = ref(true);
  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 60,
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    const roleListRes = await getRoles({ pageNumber: 1, pageSize: 100 });
    roleList.value = roleListRes.items;

    if (unref(isUpdate)) {
      adminId.value = data.record._id;
      setFieldsValue({
        ...data.record,
        roleIds: data.record.roleIds.map((item: any) => item._id),
      });
    }
    // 如果编辑不显示密码输入框
    updateSchema({
      field: 'password',
      required: !unref(isUpdate),
      show: !unref(isUpdate),
    });
  });
  const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // 新增
      if (!unref(isUpdate)) {
        await createAdmin(values);
      } else {
        // 编辑
        const data = {
          name: values.name,
          email: values.email,
          roles: values.roles,
        };
        await updateAdmin(adminId.value as string, data);
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #roleIds="{ model, field }">
        <CheckboxGroup class="w-full" v-model:value="model[field]">
          <Row>
            <Col :span="8" v-for="item in roleList" :key="item._id">
              <Checkbox :value="item._id">{{ item.name }}</Checkbox>
            </Col>
          </Row>
        </CheckboxGroup>
      </template>
    </BasicForm>
  </BasicModal>
</template>

<style scoped></style>
