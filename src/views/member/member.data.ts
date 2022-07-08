/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 12:26:06
 * @LastEditTime: 2022-07-08 14:36:00
 * @Description: 会员列表
 */

import { Tag, Avatar } from 'ant-design-vue';
import { h } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '昵称',
    dataIndex: 'nickName',
    width: 80,
    align: 'center',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 80,
    align: 'center',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 80,
    align: 'center',
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    width: 80,
    align: 'center',
    customRender: ({ record }) => {
      return h(Avatar, { src: record.avatarUrl, size: 50 });
    },
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 80,
    align: 'center',
    customRender: ({ record }) => {
      return h(
        Tag,
        { color: record.gender == 1 ? 'blue' : record.gender == 2 ? 'cyan' : 'default' },
        { default: () => (record.gender == 1 ? '男' : record.gender == 2 ? '女' : '无') },
      );
    },
  },
  {
    title: '消费金额',
    dataIndex: 'consumptionAmount',
    width: 80,
    align: 'center',
  },
  {
    title: '消费次数',
    dataIndex: 'consumptionCount',
    width: 80,
    align: 'center',
  },
  {
    title: '登录数次',
    dataIndex: 'loginCount',
    width: 80,
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    align: 'center',
    customRender: ({ record }) => {
      return h(
        Tag,
        { color: record.status ? 'success' : 'error' },
        { default: () => (record.status ? '正常' : '禁用') },
      );
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 100,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 100,
    customRender: ({ record }) => {
      return formatToDateTime(record.updatedAt);
    },
  },
];

//  搜索form
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '用户昵称',
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
      placeholder: '请输入会员名称',
    },
  },
  {
    field: 'phone',
    label: '手机号',
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
      placeholder: '请输入手机号',
    },
  },
  {
    field: 'email',
    label: '邮箱',
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
      placeholder: '请输入邮箱',
    },
  },
  {
    field: 'gener',
    label: '性别',
    component: 'Select',
    labelWidth: 80,
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请选择性别',
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
        { label: '无', value: 0 },
      ],
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    labelWidth: 80,
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请选择状态',
      options: [
        { label: '正常', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
  {
    field: 'source',
    label: '用户来源',
    component: 'Select',
    labelWidth: 80,
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请选择来源',
      options: [
        { label: '公众号', value: 1 },
        { label: '小程序', value: 2 },
        { label: 'APP', value: 3 },
        { label: '其他', value: 4 },
      ],
    },
  },
];
