/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-02 15:57:44
 * @LastEditTime: 2022-04-07 10:40:29
 * @Description: Modify here please
 */

import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '单位名称',
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 200,
    align: 'left',
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
    label: '单位名称',
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
      placeholder: '请输入单位名称',
    },
  },
];

// 添加或者编辑
export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入单位名称',
    },
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    required: true,
    componentProps: {
      placeholder: '请输入排序',
      min: 1,
    },
  },
];
