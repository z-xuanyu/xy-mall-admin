/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-14 17:38:15
 * @LastEditTime: 2022-04-14 18:10:36
 * @Description: Modify here please
 */
import { UpdateFileStorageSiteParameters } from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  fileStorage = '/settings/fileStorage',
}

// 获取文件存储设置信息
export function getFileStorage() {
  return defHttp.get({
    url: Api.fileStorage,
  });
}

// 更新文件存储设置信息
export function updateFileStorageSite(params: UpdateFileStorageSiteParameters) {
  return defHttp.put({
    url: Api.fileStorage,
    params,
  });
}
