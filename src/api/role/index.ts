/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-25 16:53:24
 * @LastEditTime: 2022-03-25 17:05:54
 * @Description: Modify here please
 */
import { AddRoleParameters, UpdateRoleParameters } from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Role = '/role',
}

// 获取角色列表
export function getRoles() {
  return defHttp.get({
    url: Api.Role,
    method: 'GET',
  });
}

// 添加角色
export function addRole(params: AddRoleParameters) {
  return defHttp.post({
    url: Api.Role,
    method: 'POST',
    params,
  });
}

// 更新角色
export function updateRole(id: string, params: UpdateRoleParameters) {
  return defHttp.patch({
    url: `${Api.Role}/${id}`,
    params,
  });
}

// 删除角色
export function removeRole(id: string) {
  return defHttp.delete({
    url: `${Api.Role}/${id}`,
  });
}
