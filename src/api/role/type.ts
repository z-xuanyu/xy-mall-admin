/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-25 16:53:33
 * @LastEditTime: 2022-03-25 17:03:53
 * @Description: Modify here please
 */

export interface AddRoleParameters {
  // 名称
  name: string;

  // 标识
  label: string;

  // 备注
  remark: string;

  // 关联菜单
  menus: string[];
}

// 更新
export type UpdateRoleParameters = AddRoleParameters;
