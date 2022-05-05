/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-30 10:32:52
 * @LastEditTime: 2022-05-05 11:12:19
 * @Description: Modify here please
 */
import { GetUserOrdersParameters, QueryOrderParameters } from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Order = '/order',
}

// 订单列表
export function getOrderList(params: QueryOrderParameters) {
  return defHttp.get({
    url: Api.Order,
    params,
  });
}

/**
 * 删除订单
 *
 * @export
 * @param {string} id 订单id
 * @return {*}
 */
export function removeOrder(id: string) {
  return defHttp.delete({
    url: `${Api.Order}/${id}`,
  });
}

// 获取用户订单列表
export function getUserOrders(params: GetUserOrdersParameters) {
  return defHttp.get({
    url: `${Api.Order}/byUser`,
    params,
  });
}
