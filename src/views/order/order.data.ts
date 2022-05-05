/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-30 10:22:01
 * @LastEditTime: 2022-05-05 11:35:39
 * @Description: Modify here please
 */

import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';
import { h } from 'vue';
import { Icon } from '/@/components/Icon';
import { Tag } from 'ant-design-vue';
import { orderStatus, orderStatusTagColor } from '/@/enumMaps';

export const columns: BasicColumn[] = [
  {
    title: '订单编号',
    dataIndex: 'orderNo',
    width: 120,
    align: 'center',
    customRender: ({ record }) => {
      return record.orderNo ? record.orderNo : 'wx2022115447';
    },
  },
  {
    title: '订单类型',
    dataIndex: 'type',
    width: 60,
    align: 'center',
    customRender: ({ record }) => {
      return record.type == 1 ? '普通订单' : '积分兑换';
    },
  },
  {
    title: '用户名称',
    dataIndex: 'userName',
    width: 100,
    align: 'center',
    slots: {
      customRender: 'userName',
    },
  },
  {
    title: '商品信息',
    dataIndex: 'productInfo',
    width: 180,
    align: 'left',
    slots: {
      customRender: 'productInfo',
    },
  },
  {
    title: '订单总额',
    dataIndex: 'totalPrice',
    width: 60,
    align: 'center',
    customRender: ({ record }) => {
      return h('span', { class: 'text-red-500' }, `￥${record.totalPrice}`);
    },
  },
  {
    title: '实际支付',
    dataIndex: 'payment',
    width: 60,
    align: 'center',
    customRender: ({ record }) => {
      return h('span', { class: 'text-red-500' }, `￥${record.payment}`);
    },
  },
  {
    title: '支付方式',
    dataIndex: 'paymentType',
    width: 60,
    align: 'center',
    customRender: () => {
      return h(Icon, { icon: 'fa-brands:weixin', color: 'green' });
    },
  },
  {
    title: '订单来源',
    dataIndex: 'source',
    width: 60,
    align: 'center',
  },
  {
    title: '订单状态',
    dataIndex: 'status',
    width: 60,
    align: 'center',
    customRender: ({ record }) => {
      return h(
        Tag,
        { color: orderStatusTagColor[record.status] },
        { default: () => orderStatus[record.status] },
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
    field: 'orderNo',
    label: '订单编号',
    component: 'Input',
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请输入订单编号',
    },
  },
  {
    field: 'userName',
    label: '用户名称',
    component: 'Input',
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请输入用户名称',
    },
  },
  {
    field: 'productName',
    label: '商品名称',
    component: 'Input',
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请输入商品名称',
    },
  },
  {
    field: 'type',
    label: '订单类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '普通订单', value: 1 },
        { label: '积分兑换', value: 2 },
        { label: '秒杀订单', value: 3 },
        { label: '拼团订单', value: 4 },
      ],
    },
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
  },
  {
    field: 'status',
    label: '订单状态',
    component: 'Select',
    componentProps: {
      options: Object.keys(orderStatus).map((item) => ({ value: item, label: orderStatus[item] })),
    },
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
  },
  {
    field: 'paymentType',
    label: '支付方式',
    component: 'Select',
    componentProps: {
      options: [
        { label: '微信支付', value: 1 },
        { label: '支付宝', value: 2 },
        { label: '余额支付', value: 3 },
        { label: '积分兑换', value: 4 },
      ],
    },
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
  },
  {
    field: 'source',
    label: '订单来源',
    component: 'Input',
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请输入订单来源',
    },
  },
];
