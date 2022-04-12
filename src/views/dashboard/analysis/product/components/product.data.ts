/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-12 10:41:57
 * @LastEditTime: 2022-04-12 10:51:54
 * @Description: Modify here please
 */

import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '商品图片',
    dataIndex: 'pic',
    width: 200,
    align: 'left',
  },
  {
    title: '商品名称',
    dataIndex: 'title',
    width: 200,
    align: 'left',
  },
  {
    title: '浏览量',
    dataIndex: 'views',
    width: 100,
    align: 'center',
  },
  {
    title: '访客数',
    dataIndex: 'number',
    width: 100,
    align: 'center',
  },
  {
    title: '加购件数',
    dataIndex: 'pic2',
    width: 100,
    align: 'center',
  },
  {
    title: '下单件数',
    dataIndex: 'pic3',
    width: 100,
    align: 'center',
  },
  {
    title: '支付件数',
    dataIndex: 'pic4',
    width: 200,
    align: 'left',
  },
  {
    title: '支付金额',
    dataIndex: 'pic5',
    width: 200,
    align: 'left',
  },
  {
    title: '毛利率(%)',
    dataIndex: 'pic6',
    width: 200,
    align: 'left',
  },
  {
    title: '收藏数',
    dataIndex: 'pic7',
    width: 200,
    align: 'left',
  },
  {
    title: '访客-支付转化率(%)',
    dataIndex: 'pic8',
    width: 200,
    align: 'left',
  },
];
