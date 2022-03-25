<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-25 16:49:06
 * @LastEditTime: 2022-03-25 18:22:18
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { computed, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTree } from '/@/components/Tree/index';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './role.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { addRole, updateRole } from '/@/api/role';

  const emits = defineEmits(['success', 'register']);

  const { createMessage } = useMessage();
  const roleId = ref(null);
  const menuList = ref([]);
  const isUpdate = ref(true);
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 80,
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    if (!menuList.value.length) {
      //   const menuListRes = await getMenuList();
      //   state.menuList = list2tree(menuListRes);
    }
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      roleId.value = data.record._id;
      setFieldsValue({
        ...data.record,
      });
    }
  });
  const getTitle = computed(() => (!unref(isUpdate) ? '添加角色' : '编辑角色'));
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // 新增
      if (!unref(isUpdate)) {
        await addRole(values);
        createMessage.success('添加成功');
      } else {
        // 编辑
        await updateRole(roleId.value, values);
        createMessage.success('更新成功');
      }
      closeModal();
      emits('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #menuIds="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="menuList"
          :replaceFields="{ title: 'name', key: '_id' }"
          checkable
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>

<style scoped></style>
