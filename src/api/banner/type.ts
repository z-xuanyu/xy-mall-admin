/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-06 10:12:25
 * @LastEditTime: 2022-01-06 10:20:50
 * @Description: Modify here please
 */

import { BasicPageParams } from '../model/baseModel';

export interface QueryBannerParameters extends BasicPageParams {
  name: string;
}

export interface CreateBannerParameters {
  name: string;
  type: number;
  image: string;
  url: string;
  productId?: string | null;
}

export type UpdateBannerParameters = CreateBannerParameters;
