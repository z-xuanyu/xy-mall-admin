/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-25 10:52:30
 * @LastEditTime: 2022-07-08 14:10:58
 * @Description: Modify here please
 */

import { BasicPageParams } from '../model/baseModel';

export interface GetMemberListParameters extends BasicPageParams {
  // 会员名称
  name: string;
}

export interface GetMemberUserAddressListParameters {
  // 用户id
  userId: string;
}

export interface GetMemberViewHistoriesParameters extends BasicPageParams {
  // 用户id
  userId: string;
}

export type GetMemberCollectionsParameters = GetMemberViewHistoriesParameters;

// 编辑会员基本信息
export interface EditMemberBaseInfoParameters {
  // 用户昵称
  nickname: string;
  // 用户头像
  avatarUrl: string;
  // 用户邮箱
  email: string;
}
