/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-28 14:51:56
 * @LastEditTime: 2022-04-07 11:25:32
 * @Description: Modify here please
 */
import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '收货地址',
    dataIndex: 'address',
    width: 80,
    align: 'center',
  },
  {
    title: '详细收货地址',
    dataIndex: 'detail',
    width: 80,
    align: 'center',
  },
  {
    title: '收货人手机号',
    dataIndex: 'phone',
    width: 80,
    align: 'center',
  },
  {
    title: '收货人名称',
    dataIndex: 'name',
    width: 80,
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 80,
    align: 'center',
  },
  {
    title: '创建时间',
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
    field: 'name',
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
