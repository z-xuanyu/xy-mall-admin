/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-13 10:50:13
 * @LastEditTime: 2022-01-13 15:46:25
 * @Description: Modify here please
 */
import { CreateProductParmeters, GetProductParameters, UpdateProductParameters } from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Product = '/product',
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
