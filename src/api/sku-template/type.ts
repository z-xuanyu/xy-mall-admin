/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-20 16:00:34
 * @LastEditTime: 2022-01-20 16:02:50
 * @Description: Modify here please
 */
import { BasicPageParams } from '../model/baseModel';

export interface GetProductSkuTemplateParmeters extends BasicPageParams {
  // 名称
  name: string;
}

export interface CreateProductSkuTemplateParmeters {
  name: string;

  values: string[];
}

export type UpdateProductSkuTemplateParmeters = CreateProductSkuTemplateParmeters;
