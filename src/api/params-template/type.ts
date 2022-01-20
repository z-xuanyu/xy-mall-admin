/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-20 15:41:26
 * @LastEditTime: 2022-01-20 16:05:14
 * @Description: Modify here please
 */

import { BasicPageParams } from '../model/baseModel';

interface ParamsValue {
  name: string;
  value: string;
}

export interface GetProductParamsTemplateParmeters extends BasicPageParams {
  // 名称
  name: string;
}

export interface CreateProductParamsTemplateParmeters {
  name: string;

  params: ParamsValue[];
}

export type UpdateProductParamsTemplateParmeters = CreateProductParamsTemplateParmeters;
