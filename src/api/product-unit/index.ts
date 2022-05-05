/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-07 10:12:22
 * @LastEditTime: 2022-05-05 11:17:58
 * @Description: Modify here please
 */
import {
  CreateProductUnitParameters,
  GetProductUnitParameters,
  UpdateProductUnitParameters,
} from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  ProductUnit = '/productUnit',
}

// 获取商品单位列表
export function getProductUnits(params: GetProductUnitParameters) {
  return defHttp.get({
    url: Api.ProductUnit,
    params,
  });
}

// 添加商品单位
export function createProductUnit(params: CreateProductUnitParameters) {
  return defHttp.post({
    url: Api.ProductUnit,
    params,
  });
}

// 更新商品单位
export function updateProductUnit(id: string, params: UpdateProductUnitParameters) {
  return defHttp.patch({
    url: `${Api.ProductUnit}/${id}`,
    params,
  });
}

// 删除商品单位
export function removeProductUnit(id: string) {
  return defHttp.delete({
    url: `${Api.ProductUnit}/${id}`,
  });
}
