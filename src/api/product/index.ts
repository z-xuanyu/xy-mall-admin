/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-13 10:50:13
 * @LastEditTime: 2022-02-24 17:15:51
 * @Description: Modify here please
 */
import {
  BatchUpdateStatusParameters,
  CreateProductParmeters,
  GetProductParameters,
  UpdateProductParameters,
  UpdateProductStatusParameters,
} from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Product = '/product',
  UpdateStatus = '/product/updateStatus',
  UpdateHotStatus = '/product/updateHotStatus',
  BatchUpdateHotStatus = '/product/batchUpdateHotStatus',
  UpdateTimeLimitStatus = '/product/updateTimeLimitStatus',
  BatchUpdateTimeLimitStatus = '/product/batchUpdateTimeLimitStatus',
}

// 获取产品列表
export function getProductList(params: GetProductParameters) {
  return defHttp.get({
    url: Api.Product,
    params,
  });
}

// 添加产品
export function createProduct(params: CreateProductParmeters) {
  return defHttp.post({
    url: Api.Product,
    params,
  });
}
/**
 * 获取产品信息
 *
 * @export
 * @param {string} id 产品id
 * @return {*}
 */
export function getProductInfo(id: string) {
  return defHttp.get({
    url: `${Api.Product}/${id}`,
  });
}

/**
 * 更新产品信息
 *
 * @export
 * @param {string} id 产品id
 * @param {UpdateProductParameters} params
 * @return {*}
 */
export function updateProduct(id: string, params: UpdateProductParameters) {
  return defHttp.patch({
    url: `${Api.Product}/${id}`,
    params,
  });
}

/**
 * 删除产品
 *
 * @export
 * @param {string} id 产品id
 * @return {*}
 */
export function removeProduct(id: string) {
  return defHttp.delete({
    url: `${Api.Product}/${id}`,
  });
}

// 更新商品上架下架状态
export function updateProductStatus(id: string, data: UpdateProductStatusParameters) {
  return defHttp.put({
    url: `${Api.UpdateStatus}/${id}`,
    data,
  });
}

// 更新商品热门推荐状态
export function updateHotStatus(id: string, data: UpdateProductStatusParameters) {
  return defHttp.put({
    url: `${Api.UpdateHotStatus}/${id}`,
    data,
  });
}

// 批量更新商品热门推荐状态
export function batchUpdateHotStatus(data: BatchUpdateStatusParameters) {
  return defHttp.put({
    url: Api.BatchUpdateHotStatus,
    data,
  });
}

// 更新商品限时精选状态
export function updateTimeLimitStatus(id: string, data: UpdateProductStatusParameters) {
  return defHttp.put({
    url: `${Api.UpdateTimeLimitStatus}/${id}`,
    data,
  });
}

// 批量更新商品限时精选状态
export function batchUpdateTimeLimitStatus(data: BatchUpdateStatusParameters) {
  return defHttp.put({
    url: Api.BatchUpdateTimeLimitStatus,
    data,
  });
}
