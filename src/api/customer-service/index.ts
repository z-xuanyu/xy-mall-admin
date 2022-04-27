/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-22 10:34:00
 * @LastEditTime: 2022-04-26 10:51:48
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

/**
 * 删除客服
 *
 * @export
 * @param {string} id 客服id
 * @return {*}
 */
export function removeCustomerService(id: string) {
  return defHttp.delete({
    url: `${Api.customerService}/${id}`,
    method: 'DELETE',
  });
}

/**
 * 获取客服会话列表
 *
 * @export
 * @param {string} id 客服id
 * @return {*}
 */
export function getConversationRecord(id: string) {
  return defHttp.get({
    url: `${Api.customerService}/${id}/getConversationRecord`,
    method: 'GET',
  });
}

/**
 * 获取客服聊天记录
 *
 * @export
 * @param {string} id 客服id
 * @param {string} targetId 目标用户id
 * @return {*}
 */
export function getChatMessageList(id: string, targetId: string) {
  return defHttp.get({
    url: `${Api.customerService}/${id}/getChatMessageList`,
    method: 'GET',
    params: {
      targetId,
    },
  });
}
