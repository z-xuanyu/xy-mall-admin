/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-20 15:41:17
 * @LastEditTime: 2022-01-20 15:59:49
 * @Description: Modify here please
 */

import {
  CreateProductParamsTemplateParmeters,
  GetProductParamsTemplateParmeters,
  UpdateProductParamsTemplateParmeters,
} from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  getProductParamsTemplate = '/product-param',
}

// 新增参数模板
export function createProductParamsTemplate(params: CreateProductParamsTemplateParmeters) {
  return defHttp.post({
    url: Api.getProductParamsTemplate,
    params,
  });
}

// 获取参数模板列表
export function getProductParamsTemplateList(params: GetProductParamsTemplateParmeters) {
  return defHttp.get({
    url: Api.getProductParamsTemplate,
    params,
  });
}

// 参数模板详细
export function getProductParamsTemplateInfo(id: string) {
  return defHttp.get({
    url: `${Api.getProductParamsTemplate}/${id}`,
  });
}

// 更新参数模板信息
export function updateProductParamsTemplate(
  id: string,
  params: UpdateProductParamsTemplateParmeters,
) {
  return defHttp.patch({
    url: `${Api.getProductParamsTemplate}/${id}`,
    params,
  });
}

// 删除参数模板
export function removeProductParamsTemplate(id: string) {
  return defHttp.delete({
    url: `${Api.getProductParamsTemplate}/${id}`,
  });
}
