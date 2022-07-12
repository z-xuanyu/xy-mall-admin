/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-07-12 12:22:36
 * @LastEditTime: 2022-07-12 14:33:54
 * @Description: Modify here please
 */

import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Icon } from '@iconify/vue';
// 表格列配置
export const columns: BasicColumn[] = [
  {
    title: '优惠券名称',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: '领取人',
    dataIndex: 'receiveUser',
    width: 160,
    align: 'center',
  },
  {
    title: '面值',
    dataIndex: 'price',
    width: 160,
    align: 'center',
  },
  {
    title: '最低消费',
    dataIndex: 'minConsume',
    width: 160,
    align: 'center',
  },
  {
    title: '开始使用时间',
    dataIndex: 'startDate',
    width: 160,
    align: 'center',
  },
  {
    title: '结束使用时间',
    dataIndex: 'endDate',
    width: 160,
    align: 'center',
  },
  {
    title: '获取方式',
    dataIndex: 'receiveType',
    width: 160,
    align: 'center',
  },
  {
    title: '是否可用',
    dataIndex: 'canUse',
    align: 'center',
    width: 80,
    customRender: () => {
      return h(Icon, { icon: 'dashicons:yes', color: 'rgb(0, 146, 220)', class: 'm-auto' });
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 160,
    align: 'center',
  },
];

// 搜索表单配置
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '优惠券名称',
    component: 'Input',
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请输入优惠券名称',
    },
  },
  {
    field: 'receiveUser',
    label: '领取人',
    component: 'Input',
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请输入领取人',
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
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
        {
          label: '全部',
          value: '',
        },
        {
          label: '可用',
          value: '1',
        },
        {
          label: '不可用',
          value: '0',
        },
      ],
    },
  },
];

// 模拟数据
export function getCouponRecord() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        new Array(10).fill({
          id: 1,
          name: '新人专享50元',
          receiveUser: '阿宇_Coder',
          price: '50.00',
          minConsume: '0.00',
          startDate: '2022-07-12 12:21',
          endDate: '2022-07-17 12:21',
          receiveType: '手动领取',
          canUse: '是否可用',
          status: '未使用',
        }),
      );
    }, 1000);
  });
}
