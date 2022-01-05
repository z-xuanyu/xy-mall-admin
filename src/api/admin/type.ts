/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 11:11:58
 * @LastEditTime: 2022-01-05 12:13:14
 * @Description: Modify here please
 */

export interface QueryadminParameters {
  name: string;
  status: boolean;
  pageNumber: number;
  pageSize: number;
}

export interface CreateAdminParmeters {
  name: string;
  email: string;
  password: string;
}

export interface UpdateAdminParmeters {
  name: string;
}
