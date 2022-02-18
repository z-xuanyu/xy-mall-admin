/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-17 09:57:33
 * @LastEditTime: 2022-02-17 10:19:23
 * @Description: Modify here please
 */

import {
  CreateClassifyNavigationParameters,
  QueryClassifyNavigationParameters,
  UpdateClassifyNavigationParameters,
} from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  classifyNavigation = '/classify-navigation',
}

// 获取分类导航列表
export function getClassifyNavigationList(params: QueryClassifyNavigationParameters) {
  return defHttp.get({
    url: Api.classifyNavigation,
    params,
  });
}

// 新增分类导航
export function createClassifyNavigation(params: CreateClassifyNavigationParameters) {
  return defHttp.post({
    url: Api.classifyNavigation,
    params,
  });
}

// 更新分类导航
export function updateClassifyNavigation(id: string, params: UpdateClassifyNavigationParameters) {
  return defHttp.patch({
    url: `${Api.classifyNavigation}/${id}`,
    params,
  });
}

export function removeClassifyNavigation(id: string) {
  return defHttp.delete({
    url: `${Api.classifyNavigation}/${id}`,
  });
}
