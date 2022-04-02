/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-02 16:23:13
 * @LastEditTime: 2022-04-02 16:34:02
 * @Description: Modify here please
 */
import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '优惠券名称',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: '优惠券类型',
    dataIndex: 'type',
    align: 'left',
  },
  {
    title: '面值',
    dataIndex: 'price',
    align: 'left',
  },
  {
    title: '领取方式',
    dataIndex: 'receiveType',
    align: 'left',
  },
  {
    title: '领取时间',
    dataIndex: 'receiveDate',
    align: 'left',
  },
  {
    title: '使用时间',
    dataIndex: 'useDate',
    align: 'left',
  },
  {
    title: '发布数量',
    dataIndex: 'useDate',
    align: 'left',
  },
  {
    title: '状态',
    dataIndex: 'status',
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
    label: '优惠券名称',
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 6 },
  },
];
