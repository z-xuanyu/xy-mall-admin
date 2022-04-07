/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-30 10:32:59
 * @LastEditTime: 2022-04-07 15:03:35
 * @Description: Modify here please
 */

import { BasicPageParams } from '../model/baseModel';

export interface QueryOrderParameters extends BasicPageParams {
  // 用户名称
  userName?: string;
}

export interface GetUserOrdersParameters extends BasicPageParams {
  // 会员id
  userId: string;

  // 订单id
  orderId: string;

  // 收货人名称
  addressName: string;
}
