/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-06 10:12:25
 * @LastEditTime: 2022-04-12 16:28:59
 * @Description: Modify here please
 */

import { BasicPageParams } from '../model/baseModel';

export interface QueryBannerParameters extends BasicPageParams {
  name: string;

  status: number;
}

export interface CreateBannerParameters {
  name: string;
  type: number;
  image: string;
  url: string;
  productId?: string | null;
}

export type UpdateBannerParameters = CreateBannerParameters;

export interface ChangeBannerStatus {
  // 状态： 1：禁用、2：正常
  status: number;
}
