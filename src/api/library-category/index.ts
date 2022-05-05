/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-07 15:35:24
 * @LastEditTime: 2022-05-05 11:16:36
 * @Description: Modify here please
 */

import { CreateLibraryCategoryParameters } from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  LibraryCategory = '/libraryCategory',
}

// 文件分类列表
export function getLibraryCategoryList() {
  return defHttp.get({
    url: Api.LibraryCategory,
  });
}

// 添加文件分类
export function createLibraryCategory(params: CreateLibraryCategoryParameters) {
  return defHttp.post({
    url: Api.LibraryCategory,
    params,
  });
}

// 更新文件分类
export function updateLibraryCategory(id: string, params: CreateLibraryCategoryParameters) {
  return defHttp.patch({
    url: `${Api.LibraryCategory}/${id}`,
    params,
  });
}

// 删除文件分类
export function removeLibraryCategory(id: string) {
  return defHttp.delete({
    url: `${Api.LibraryCategory}/${id}`,
  });
}
