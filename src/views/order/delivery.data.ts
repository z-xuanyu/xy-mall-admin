/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-05-05 11:47:59
 * @LastEditTime: 2022-05-05 12:22:51
 * @Description: Modify here please
 */

import { FormSchema } from '/@/components/Form';

// 添加 form
export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: '选择类型',
    component: 'RadioGroup',
    required: true,
    defaultValue: 1,
    colProps: { span: 24 },
    componentProps: {
      options: [
        {
          label: '发货',
          value: 1,
        },
        {
          label: '送货',
          value: 2,
        },
        {
          label: '无需配送',
          value: 3,
        },
      ],
    },
  },
  {
    field: 'deliveryType',
    label: '发货类型',
    component: 'RadioGroup',
    defaultValue: 1,
    required: true,
    colProps: { span: 24 },
    componentProps: {
      options: [
        { label: '手动填写', value: 1, key: 1 },
        { label: '电子面单打印', value: 2, key: 2 },
      ],
    },
  },
  {
    field: 'courierCompany',
    label: '快递公司',
    component: 'Select',
    required: true,
    colProps: { span: 24 },
    componentProps: {
      placeholder: '请选择快递公司',
      options: [
        { label: '中通快递', value: 1, key: 1 },
        { label: '圆通快递', value: 2, key: 2 },
        { label: '顺丰快递', value: 3, key: 3 },
        { label: '京东快递', value: 4, key: 4 },
        { label: '韵达快递', value: 5, key: 5 },
      ],
    },
  },
  {
    field: 'courierNo',
    label: '快递单号',
    required: true,
    component: 'Input',
    colProps: { span: 24 },
    componentProps: {
      placeholder: '请输入快递单号',
    },
  },
];
