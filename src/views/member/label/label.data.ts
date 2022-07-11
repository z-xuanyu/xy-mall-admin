/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-07-11 09:57:06
 * @LastEditTime: 2022-07-11 15:56:36
 * @Description: Modify here please
 */

import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';
import { ref, h } from 'vue';

// 标签类型
export const memberLabelType = ref(1);

// 表格列表
export const columns: BasicColumn[] = [
  {
    title: '标签名称',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: '用户数',
    dataIndex: 'userCount',
    width: 160,
    align: 'left',
  },
  {
    title: '打标条件',
    dataIndex: 'condition',
    width: 160,
    align: 'left',
    ifShow: () => {
      return memberLabelType.value === 2; // 自动标签显示
    },
    customRender: ({ record }) => {
      return h('div', [
        h('p', { class: 'p-0 m-0' }, `满足条件：${record.condition}`),
        h(
          'p',
          { class: 'text-gray-400 p-0 m-0 text-sm' },
          '指定消费时间/购买指定商品/指定消费金额/指定消费次数',
        ),
      ]);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 160,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

// 搜索
export const searchSchema: FormSchema[] = [
  {
    field: 'name',
    label: '标签名称',
    component: 'Input',
    labelWidth: 60,
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请输入标签名称',
    },
  },
  {
    field: 'type',
    label: '标签类型',
    component: 'Select',
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    defaultValue: 1,
    componentProps: {
      placeholder: '请选择标签类型',
      options: [
        { label: '手动标签', value: 1 },
        { label: '自动标签', value: 2 },
      ],
      onChange: (value: number) => {
        memberLabelType.value = value;
      },
    },
  },
];

// 添加或者编辑
export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: '标签类型',
    component: 'ApiRadioGroup',
    colProps: {
      span: 24,
    },
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '手动标签', value: 1 },
        { label: '自动标签', value: 2 },
      ],
    },
  },
  {
    field: 'name',
    label: '标签名称',
    component: 'Input',
    required: true,
    colProps: {
      span: 12,
    },
    componentProps: {
      placeholder: '请输入标签名称',
    },
  },
  {
    field: 'autoType',
    label: '自动标签类型',
    component: 'ApiRadioGroup',
    colProps: {
      span: 24,
    },
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '满足所有条件', value: 1 },
        { label: '满足任一条件', value: 2 },
      ],
    },
  },
  {
    field: 'consumeTime',
    label: '消费时间',
    component: 'RangePicker',
    colProps: {
      span: 12,
    },
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
    },
  },
  {
    label: '累计消费次数',
    field: 'consumeCount',
    component: 'InputNumber',
    colProps: {
      span: 24,
    },
    componentProps: {
      placeholder: '请输入累计消费次数',
    },
  },
  {
    label: '累计消费金额',
    field: 'consumeAmount',
    component: 'InputNumber',
    colProps: {
      span: 24,
    },
    componentProps: {
      placeholder: '请输入累计消费金额',
    },
  },
  {
    field: 'categoryId',
    label: '购买指定分类',
    component: 'TreeSelect',
    colProps: {
      span: 12,
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
    label: '用户剔除',
    field: 'users',
    component: 'Input',
    slot: 'users',
  },
];

// 模拟数据
export function getUserLabels() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        [
          {
            id: 1,
            name: '标签1',
            type: 1,
            userCount: 10,
            condition: '手动标签',
            createdAt: '2020-07-11 09:57:06',
          },
          {
            id: 2,
            name: '标签2',
            type: 2,
            userCount: 20,
            condition: '自动标签',
            createdAt: '2020-07-11 09:57:06',
          },
          {
            id: 3,
            name: '标签3',
            type: 1,
            userCount: 30,
            condition: '手动标签',
            createdAt: '2020-07-11 09:57:06',
          },
          {
            id: 4,
            name: '标签4',
            type: 2,
            userCount: 40,
            condition: '自动标签',
            createdAt: '2020-07-11 09:57:06',
          },
        ].filter((item) => item.type === memberLabelType.value),
      );
    }, 1000);
  });
}
