/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 16:38:30
 * @LastEditTime: 2022-04-15 15:31:51
 * @Description: Modify here please
 */

import { BasicPageParams } from '../model/baseModel';

export interface QueryCategoryParameters extends BasicPageParams {
  name?: string;
}

export interface CreateCategoryParameters {
  name: string;
  sort: number;
  parentId?: null | string;
}

export type UpdateCategoryParameters = CreateCategoryParameters;
