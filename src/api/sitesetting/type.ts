/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-14 18:00:40
 * @LastEditTime: 2022-04-14 18:04:32
 * @Description: Modify here please
 */

export interface aliOssType {
  // 存储空间名称
  bucket: string;

  // 请输入存储源(Region)
  region: string;

  // 是否自定义域名
  delivery: boolean;

  // 自定义域名
  domain: string;

  // AccessKey ID
  accessKeyId: string;

  // accessKeySecret
  accessKeySecret: string;
}

export interface UpdateFileStorageSiteParameters {
  // 存储方式： 1：本地， 2：阿里oss
  mode: number;

  aliOss: aliOssType;
}
