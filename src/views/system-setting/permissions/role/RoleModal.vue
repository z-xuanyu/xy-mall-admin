<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-25 16:49:06
 * @LastEditTime: 2022-05-07 11:40:43
 * @Description: 添加角色
-->
<script setup lang="ts">
  import { computed, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTree } from '/@/components/Tree/index';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './role.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { addRole, updateRole } from '/@/api/role';
  import { getMenus } from '/@/api/menu';
  import { TransformTreeArr } from '/@/utils';

  const emits = defineEmits(['success', 'register']);

  const { createMessage } = useMessage();
  const roleId = ref<string | null>(null);
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
      const menuListRes = await getMenus({ pageNumber: 1, pageSize: 100 });
      menuList.value = TransformTreeArr(
        menuListRes.map((item) => ({ ...item, title: item.meta.title })),
      );
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
        await updateRole(roleId.value as string, values);
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
        <div class="h-auto border rounded-sm">
          <BasicTree
            v-model:value="model[field]"
            :treeData="menuList"
            :fieldNames="{ title: 'title', key: '_id' }"
            checkable
          />
        </div>
      </template>
    </BasicForm>
  </BasicModal>
</template>

<style scoped></style>
