/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-25 16:53:24
 * @LastEditTime: 2022-03-28 16:07:07
 * @Description: Modify here please
 */
import { AddRoleParameters, QueryRoleParameters, UpdateRoleParameters } from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Role = '/role',
}

// 获取角色列表
export function getRoles(params: QueryRoleParameters) {
  return defHttp.get({
    url: Api.Role,
    method: 'GET',
    params,
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
