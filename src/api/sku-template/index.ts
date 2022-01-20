/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-20 15:41:17
 * @LastEditTime: 2022-01-20 16:03:05
 * @Description: Modify here please
 */

import {
  CreateProductSkuTemplateParmeters,
  GetProductSkuTemplateParmeters,
  UpdateProductSkuTemplateParmeters,
} from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  getProductSkuTemplate = '/product-sku',
}

// 新增规格模板
export function createProductSkuTemplate(params: CreateProductSkuTemplateParmeters) {
  return defHttp.post({
    url: Api.getProductSkuTemplate,
    params,
  });
}

// 获取规格模板列表
export function getProductSkuTemplateList(params: GetProductSkuTemplateParmeters) {
  return defHttp.get({
    url: Api.getProductSkuTemplate,
    params,
  });
}

// 规格模板详细
export function getProductSkuTemplateInfo(id: string) {
  return defHttp.get({
    url: `${Api.getProductSkuTemplate}/${id}`,
  });
}

// 更新规格模板信息
export function updateProductSkuTemplate(id: string, params: UpdateProductSkuTemplateParmeters) {
  return defHttp.patch({
    url: `${Api.getProductSkuTemplate}/${id}`,
    params,
  });
}

// 删除规格模板
export function removeProductSkuTemplate(id: string) {
  return defHttp.delete({
    url: `${Api.getProductSkuTemplate}/${id}`,
  });
}
