/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-13 15:45:58
 * @LastEditTime: 2022-04-15 15:46:53
 * @Description: Modify here please
 */

import { BasicPageParams } from '../model/baseModel';

export interface CreateTagParmeters {
  name: string;
  description: string;
  type: number;
}

export interface GetTagParameters extends BasicPageParams {
  name?: string;
  type?: number;
}

export type UpdateTagParameters = CreateTagParmeters;
