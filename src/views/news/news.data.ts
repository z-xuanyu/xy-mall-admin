/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 14:21:43
 * @LastEditTime: 2022-05-06 17:57:40
 * @Description: Modify here please
 */

import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { Tinymce } from '/@/components/Tinymce';
import { formatToDateTime } from '/@/utils/dateUtil';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
export const columns: BasicColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
    width: 160,
    align: 'left',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      return h(
        'div',
        { class: 'space-x-2' },
        record.tags.map((item) => h(Tag, { color: '#2db7f5' }, { default: () => item.name })),
      );
    },
  },
  {
    title: '内容要摘',
    dataIndex: 'content',
    width: 200,
    align: 'left',
    slots: { customRender: 'content' },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

//  搜索form
export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    labelWidth: 50,
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请输入新闻标题',
    },
  },
];

// 添加 form
export const formSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    required: true,
    colProps: {
      span: 24,
    },
    componentProps: {
      placeholder: '请填写新闻标题',
    },
  },
  {
    field: 'tags',
    component: 'Select',
    label: '标签',
    colProps: {
      span: 8,
    },
    componentProps: {
      placeholder: '请选择新闻标签',
      mode: 'multiple',
      options: [],
    },
    rules: [
      {
        required: true,
        message: '请选择标签',
        type: 'array',
      },
    ],
  },
  {
    field: 'content',
    component: 'Input',
    label: '新闻内容',
    defaultValue: '新闻内容',
    rules: [{ required: true }],
    colProps: {
      span: 24,
    },
    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
        height: 800,
      });
    },
  },
];
