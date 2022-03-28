/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-25 16:53:33
 * @LastEditTime: 2022-03-28 16:12:49
 * @Description: Modify here please
 */

import { BasicPageParams } from '../model/baseModel';

export interface QueryRoleParameters extends BasicPageParams {
  // 角色名称
  name?: string;
}

export interface AddRoleParameters {
  // 名称
  name: string;

  // 标识
  label: string;

  // 备注
  remark: string;

  // 关联菜单
  menuIds: string[];
}

// 更新
export type UpdateRoleParameters = AddRoleParameters;
