/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 11:09:20
 * @LastEditTime: 2022-02-25 10:12:57
 * @Description: 管理员api模块
 */
import {
  CreateAdminParmeters,
  QueryadminParameters,
  UpdateAdminParmeters,
  UpdateStatusParmeters,
} from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Admin = '/admin',
  updateStatus = '/admin/updateStatus',
}

// 管理员列表
export function getAdminList(params: QueryadminParameters) {
  return defHttp.get({
    url: Api.Admin,
    params,
  });
}

// 创建管理员
export function createAdmin(params: CreateAdminParmeters) {
  return defHttp.post({
    url: Api.Admin,
    params,
  });
}

/**
 * 更新管理员
 *
 * @export
 * @param {string} id 管理员id
 * @param {UpdateAdminParmeters} params 参数对象
 * @return {*}
 */
export function updateAdmin(id: string, params: UpdateAdminParmeters): Promise<any> {
  return defHttp.patch({
    url: `${Api.Admin}/${id}`,
    params,
  });
}

/**
 * 删除管理员
 *
 * @export
 * @param {string} id 管理员id
 * @return {*}
 */
export function removeAdmin(id: string): Promise<any> {
  return defHttp.delete({
    url: `${Api.Admin}/${id}`,
  });
}

// 更新管理状态
export function updateStatus(id: string, params: UpdateStatusParmeters) {
  return defHttp.put({
    url: `${Api.updateStatus}/${id}`,
    params,
  });
}
