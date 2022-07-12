/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-07-12 15:18:26
 * @LastEditTime: 2022-07-12 15:31:14
 * @Description: 领取记录弹出层
 */

import { BasicColumn } from '/@/components/Table';
import { Avatar } from 'ant-design-vue';
import { h } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'userName',
    align: 'center',
  },
  {
    title: '用户头像',
    dataIndex: 'userAvatar',
    align: 'center',
    customRender: ({ record }) => {
      return h(Avatar, {
        src: record.userAvatar,
      });
    },
  },
  {
    title: '领取时间',
    dataIndex: 'receiveDate',
    align: 'left',
  },
];

// 模拟获取领取记录数据
export const getReceiveRecordData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          userName: '张三',
          userAvatar: 'https://avatars1.githubusercontent.com/u/12097?s=460&v=4',
          receiveDate: '2020-07-12 15:18:26',
        },
        {
          userName: '李四',
          userAvatar: 'https://avatars1.githubusercontent.com/u/12097?s=460&v=4',
          receiveDate: '2020-07-12 15:18:26',
        },
        {
          userName: '王五',
          userAvatar: 'https://avatars1.githubusercontent.com/u/12097?s=460&v=4',
          receiveDate: '2020-07-12 15:18:26',
        },
      ]);
    }, 1000);
  });
};
