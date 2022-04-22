/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-22 10:34:06
 * @LastEditTime: 2022-04-22 10:43:22
 * @Description: Modify here please
 */

import { BasicPageParams } from '../model/baseModel';

// 客服列表
export interface GetCustomerServicesParameters extends BasicPageParams {
  // 客服名称
  name: string;
}

// 添加客服
export interface CreateCustomerServiceParameters {
  // 名称
  name: string;

  // 账号(手机号)
  phone: string;

  // 密码
  password: string;

  // 头像
  avatar: string;

  // 状态
  status: boolean;
}

// 更新
export type UpdateCustomerServiceParameters = CreateCustomerServiceParameters;
