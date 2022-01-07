/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 11:11:58
 * @LastEditTime: 2022-01-06 10:17:41
 * @Description: Modify here please
 */

import { BasicPageParams } from '../model/baseModel';

export interface QueryadminParameters extends BasicPageParams {
  name: string;
  status: boolean;
}

export interface CreateAdminParmeters {
  name: string;
  email: string;
  password: string;
}

export interface UpdateAdminParmeters {
  name: string;
}
