/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-29 15:36:06
 * @LastEditTime: 2022-03-29 18:13:17
 * @Description: Modify here please
 */

import { BasicColumn, FormSchema, TableImg } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';
import { Rate } from 'ant-design-vue';
import { h } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '用户名称',
    dataIndex: 'userName',
    width: 200,
    align: 'center',
    customRender: ({ record }) => {
      return record.user.name;
    },
  },
  {
    title: '商品信息',
    dataIndex: 'productInfo',
    width: 200,
    align: 'left',
    slots: {
      customRender: 'productInfo',
    },
  },
  {
    title: '评分星级',
    dataIndex: 'rate',
    width: 200,
    align: 'center',
    customRender: ({ record }) => {
      return h(Rate, { value: record.rate, disabled: true });
    },
  },
  {
    title: '内容',
    dataIndex: 'content',
    width: 200,
    align: 'center',
  },
  {
    title: '评论图片',
    dataIndex: 'images',
    width: 200,
    align: 'center',
    customRender: ({ record }) => {
      return h(TableImg, { imgList: record.images, size: 100 });
    },
  },
  {
    title: '评论时间',
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
    field: 'userName',
    label: '用户名称',
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 4 },
    componentProps: {
      placeholder: '请输入用户名称',
    },
  },
  {
    field: 'productName',
    label: '商品名称',
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 4 },
    componentProps: {
      placeholder: '请输入商品标题名称',
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'replyContent',
    label: '回复评论',
    component: 'InputTextArea',
    required: true,
    componentProps: {
      placeholder: '请输入回复的内容...',
      rows: 8,
    },
  },
];
