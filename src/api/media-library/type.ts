/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-07 15:50:14
 * @LastEditTime: 2022-06-27 11:44:40
 * @Description: Modify here please
 */

import { BasicPageParams } from '../model/baseModel';

export interface CreateMediaLibraryParameters {
  // 文件名称
  name: string;
  // 文件地址
  url: string;
  // 文件分类
  categoryId: string | null;
  // 存储类型
  storageType?: number;
}

export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}

export interface QueryMediaLibraryParameters extends BasicPageParams {
  categoryId?: string | null;
}
