/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-07 15:50:08
 * @LastEditTime: 2022-05-05 11:17:17
 * @Description: Modify here please
 */
import {
  CreateMediaLibraryParameters,
  QueryMediaLibraryParameters,
  UploadFileParams,
} from './type';
import { getAppEnvConfig } from '/@/utils/env';
import { defHttp } from '/@/utils/http/axios';

const { VITE_GLOB_UPLOAD_URL } = getAppEnvConfig();

enum Api {
  MediaLibrary = '/mediaLibrary',
}

// 媒体文件列表
export function getMediaLibraryList(params: QueryMediaLibraryParameters) {
  return defHttp.get({
    url: Api.MediaLibrary,
    params,
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

// 文件上传
export function upload(params: UploadFileParams) {
  return defHttp.uploadFile(
    {
      url: VITE_GLOB_UPLOAD_URL,
    },
    params,
  );
}
