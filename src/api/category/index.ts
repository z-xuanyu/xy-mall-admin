/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 16:38:24
 * @LastEditTime: 2022-01-05 16:53:05
 * @Description: Modify here please
 */
import {
  CreateCategoryParameters,
  QueryCategoryParameters,
  UpdateCategoryParameters,
} from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Category = '/category',
}

// 分类列表
export function getCategoryList(params: QueryCategoryParameters) {
  return defHttp.get({
    url: Api.Category,
    params,
  });
}

// 创建分类
export function createCategory(params: CreateCategoryParameters) {
  return defHttp.post({
    url: Api.Category,
    params,
  });
}

/**
 * 更新分类信息
 *
 * @export
 * @param {string} id 分类id
 * @param {UpdateCategoryParameters} params
 * @return {*}
 */
export function updateCategory(id: string, params: UpdateCategoryParameters): Promise<any> {
  return defHttp.patch({
    url: `${Api.Category}/${id}`,
    params,
  });
}

/**
 * 删除分类
 *
 * @export
 * @param {string} id 分类id
 * @return {*}  {Promise<any>}
 */
export function removeCategory(id: string): Promise<any> {
  return defHttp.delete({
    url: `${Api.Category}/${id}`,
  });
}
