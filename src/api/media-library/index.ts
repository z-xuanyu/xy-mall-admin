/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-07 15:50:08
 * @LastEditTime: 2022-01-07 15:54:31
 * @Description: Modify here please
 */
import { CreateMediaLibraryParameters } from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  MediaLibrary = '/media-library',
}

// 媒体文件列表
export function getMediaLibraryList() {
  return defHttp.get({
    url: Api.MediaLibrary,
  });
}

// 添加媒体文件
export function createMediaLibrary(params: CreateMediaLibraryParameters) {
  return defHttp.post({
    url: Api.MediaLibrary,
    params,
  });
}

// 更新媒体文件
export function updateMediaLibrary(id: string, params: CreateMediaLibraryParameters) {
  return defHttp.patch({
    url: `${Api.MediaLibrary}/${id}`,
    params,
  });
}

// 删除媒体文件
export function removeMediaLibrary(id: string) {
  return defHttp.delete({
    url: `${Api.MediaLibrary}/${id}`,
  });
}
