/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 14:21:43
 * @LastEditTime: 2022-05-06 16:11:20
 * @Description: 产品模块配置项
 */

import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { Tinymce } from '/@/components/Tinymce';
import { formatToDateTime } from '/@/utils/dateUtil';
import { Tag, Image } from 'ant-design-vue';

const errorImage =
  'data:image/png;base64,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';

import { h } from 'vue';
export const columns: BasicColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
    width: 200,
    align: 'left',
  },
  {
    title: '封面图',
    dataIndex: 'pic',
    width: 160,
    align: 'center',
    customRender: ({ record }) => {
      return h(Image, { src: record.pic, width: 50, fallback: errorImage });
    },
  },
  {
    title: '分类',
    dataIndex: 'category',
    width: 200,
    align: 'center',
    customRender: ({ record }) => {
      return h(Tag, { color: 'cyan' }, { default: () => record.category.name });
    },
  },
  {
    title: '标签',
    dataIndex: 'tags',
    width: 200,
    align: 'left',
    customRender: ({ record }) => {
      return h(
        'div',
        {
          class: 'space-x-2',
        },
        record.tags.map((item) => h(Tag, { color: 'blue' }, { default: () => item.name })),
      );
    },
  },
  {
    title: '价格',
    dataIndex: 'price',
    width: 160,
    align: 'center',
  },
  {
    title: '库存',
    dataIndex: 'inventory',
    width: 160,
    align: 'center',
  },
  {
    title: '销量',
    dataIndex: 'sales',
    width: 200,
    align: 'center',
  },
  {
    title: '浏览量',
    dataIndex: 'views',
    width: 200,
    align: 'center',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 200,
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 200,
    align: 'center',
    customRender: ({ record }) => {
      return h(
        Tag,
        { color: record.status ? 'green' : 'red' },
        { default: () => (record.status ? '上架中' : '已下架') },
      );
    },
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
    field: 'name',
    label: '商品标题',
    component: 'Input',
    labelWidth: 70,
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请输入商品标题',
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
      span: 12,
    },
  },
  {
    field: 'subTitle',
    label: '副标题',
    component: 'Input',
    required: true,
    colProps: {
      span: 12,
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
      placeholder: '请选择标签',
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
    field: 'category',
    label: '分类',
    component: 'TreeSelect',
    required: true,
    colProps: {
      span: 8,
    },
    componentProps: {
      placeholder: '请选择分类',
      fieldNames: {
        label: 'name',
        key: '_id',
        value: '_id',
        children: 'children',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'pic',
    label: '封面图',
    component: 'Input',
    required: true,
    slot: 'pic',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'skuType',
    label: '选择规格',
    component: 'RadioGroup',
    required: true,
    defaultValue: 1,
    colProps: {
      span: 24,
    },
    componentProps: ({ formActionType }) => {
      return {
        options: [
          {
            label: '单规格',
            value: 1,
          },
          {
            label: '多规格',
            value: 2,
          },
        ],
        onChange: (value: any) => {
          const { updateSchema } = formActionType;

          updateSchema({
            field: 'skus',
            required: value.target.value === 2,
            ifShow: value.target.value === 2,
          });

          updateSchema({
            field: 'price',
            show: value.target.value !== 2,
            required: value.target.value !== 2,
          });

          updateSchema({
            field: 'costPrice',
            show: value.target.value !== 2,
            required: value.target.value !== 2,
          });

          updateSchema({
            field: 'inventory',
            show: value.target.value !== 2,
            required: value.target.value !== 2,
          });
        },
      };
    },
  },
  {
    field: 'skus',
    component: 'Input',
    label: '规格',
    slot: 'skus',
    required: false,
    ifShow: false,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'bannerImg',
    label: '轮播图',
    component: 'Input',
    required: true,
    slot: 'bannerImg',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'price',
    label: '售价',
    component: 'InputNumber',
    required: true,
    componentProps: {
      placeholder: '请输入售价',
    },
    show: true,
  },
  {
    field: 'costPrice',
    label: '折扣价',
    component: 'InputNumber',
    required: true,
    componentProps: {
      placeholder: '请输入折扣价',
    },
    show: true,
  },
  {
    field: 'inventory',
    label: '库存',
    component: 'InputNumber',
    required: true,
    componentProps: {
      placeholder: '请输入库存',
    },
    show: true,
  },
  {
    field: 'status',
    label: '是否上架',
    component: 'Switch',
    defaultValue: true,
    required: true,
  },
  {
    field: 'description',
    component: 'Input',
    label: '产品描述',
    defaultValue: '描述',
    colProps: {
      span: 24,
    },
    rules: [{ required: true }],
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
