/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-28 14:51:56
 * @LastEditTime: 2022-02-28 15:15:33
 * @Description: Modify here please
 */
import { BasicColumn } from '/@/components/Table';
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
