<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 14:18:10
 * @LastEditTime: 2022-05-06 17:57:07
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref, unref, computed } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { formSchema } from './news.data';
  import { createNews, updateNews } from '/@/api/news';
  import { getTagList } from '/@/api/tag';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const { createMessage } = useMessage();
  let newsId = ref<string>('');
  const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
    labelWidth: 120,
    showResetButton: false,
    showSubmitButton: false,
    schemas: formSchema,
    actionColOptions: {
      span: 24,
    },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    // 文章标题
    const tags = await getTagList({ type: 2 });

    updateSchema({
      field: 'tags',
      componentProps: {
        options: tags.items.map((item) => {
          return {
            label: item.name,
            value: item._id,
            key: item._id,
          };
        }),
      },
    });

    if (unref(isUpdate)) {
      // 新闻id
      newsId.value = data.record._id;
      setFieldsValue({
        ...data.record,
        tags: data.record.tags.map((item) => item._id),
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '添加新闻' : '编辑新闻'));

  // 保存
  const handleSubmit = async () => {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      if (!unref(isUpdate)) {
        // 添加新闻 api
        await createNews(values);
        createMessage.success('添加成功!');
      } else {
        // 编辑新闻 api
        await updateNews(newsId.value, values);
        createMessage.success('编辑成功!');
      }
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  };
</script>

<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :title="getTitle"
    :width="1000"
    showFooter
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
