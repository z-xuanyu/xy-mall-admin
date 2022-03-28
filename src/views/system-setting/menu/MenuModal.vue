<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-28 10:28:02
 * @LastEditTime: 2022-03-28 15:00:36
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { getMenus, addMenu, updateMenu } from '/@/api/menu';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { TransformTreeArr } from '/@/utils';

  const emits = defineEmits(['success', 'register']);

  const menuId = ref(null);

  const { createMessage } = useMessage();
  const isUpdate = ref(true);
  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      menuId.value = data.record._id;
      setFieldsValue({
        ...data.record,
        ...data?.record?.meta,
      });
    }
    const menus = await getMenus();
    const menuTree = TransformTreeArr(
      menus.items.map((item) => ({ ...item, title: item.meta.title })),
    );
    updateSchema({
      field: 'parentId',
      componentProps: { treeData: menuTree },
    });
  });
  const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      const data = {
        component: values.component,
        path: values.path,
        parentId: values.parentId,
        meta: {
          title: values.title,
          icon: values.icon,
          orderNo: values.orderNo,
          ignoreKeepAlive: values.ignoreKeepAlive,
          hideMenu: values.hideMenu,
        },
      };
      // 新增
      if (!unref(isUpdate)) {
        await addMenu(data);
        createMessage.success('添加成功!');
      } else {
        // 编辑
        await updateMenu(menuId.value, data);
        createMessage.success('编辑成功!');
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
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<style scoped></style>
