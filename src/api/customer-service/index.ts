/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-22 10:34:00
 * @LastEditTime: 2022-04-22 10:48:48
 * @Description: 客服管理接口
 */
import {
  CreateCustomerServiceParameters,
  GetCustomerServicesParameters,
  UpdateCustomerServiceParameters,
} from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  customerService = 'customerService',
}

// 获取客服列表
export function getCustomerServices(params: GetCustomerServicesParameters) {
  return defHttp.get({
    url: Api.customerService,
    method: 'GET',
    params,
  });
}

// 添加客服
export function createCustomerService(params: CreateCustomerServiceParameters) {
  return defHttp.post({
    url: Api.customerService,
    method: 'POST',
    params,
  });
}

// 更新客服
export function updateCustomerService(id: string, params: UpdateCustomerServiceParameters) {
  return defHttp.patch({
    url: `${Api.customerService}/${id}`,
    method: 'PATCH',
    params,
  });
}

// 删除客服
export function removeCustomerService(id) {
  return defHttp.delete({
    url: `${Api.customerService}/${id}`,
    method: 'DELETE',
  });
}
