/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 16:53:34
 * @LastEditTime: 2022-06-20 11:53:13
 * @Description: Modify here please
 */
import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';
import { Image } from 'ant-design-vue';
import { h } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 80,
    align: 'left',
  },
  {
    title: '缩略图',
    dataIndex: 'thumbnail',
    width: 50,
    align: 'center',
    customRender: ({ record }) => {
      return h(Image, {
        src: record.thumbnail,
        width: 50,
      });
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
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 180,
    customRender: ({ record }) => {
      return formatToDateTime(record.updatedAt);
    },
  },
];

//  搜索form
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '分类名称',
    component: 'Input',
    labelWidth: 80,
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请输入分类名称',
    },
  },
];
// 添加 form
export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
    colProps: {
      span: 24,
    },
    componentProps: {
      placeholder: '请输入分类名称',
    },
  },
  {
    field: 'parentId',
    label: '上级分类',
    component: 'TreeSelect',
    colProps: {
      span: 24,
    },
    componentProps: {
      placeholder: '请选择上级',
      fieldNames: {
        label: 'name',
        key: '_id',
        value: '_id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'thumbnail',
    label: '缩略图',
    component: 'Input',
    required: true,
    slot: 'thumbnail',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    required: true,
    componentProps: {
      placeholder: '请输入排序',
    },
  },
];
