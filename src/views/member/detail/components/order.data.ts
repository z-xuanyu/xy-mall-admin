/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-28 14:51:56
 * @LastEditTime: 2022-04-07 15:34:15
 * @Description: Modify here please
 */
import { h } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '订单ID',
    dataIndex: '_id',
    width: 80,
    align: 'center',
  },
  {
    title: '收货人',
    dataIndex: 'addressName',
    width: 80,
    align: 'center',
  },
  {
    title: '商品信息',
    dataIndex: 'info',
    width: 180,
    align: 'center',
    slots: {
      customRender: 'info',
    },
  },
  {
    title: '商品总价',
    dataIndex: 'totalPrice',
    width: 80,
    align: 'center',
    customRender: ({ record }) => {
      return h('span', { class: 'text-red-500' }, `￥${record.totalPrice}`);
    },
  },
  {
    title: '实付金额',
    dataIndex: 'payment',
    width: 80,
    align: 'center',
    customRender: ({ record }) => {
      return h('span', { class: 'text-red-500' }, `￥${record.payment}`);
    },
  },
  {
    title: '交易时间',
    dataIndex: 'createdAt',
    width: 100,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

//  搜索form
export const searchFormSchema: FormSchema[] = [
  {
    field: 'orderId',
    label: '订单ID',
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
      placeholder: '请输入订单ID',
    },
  },
  {
    field: 'addressName',
    label: '收货人',
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
      placeholder: '请输入收货人名称',
    },
  },
];
