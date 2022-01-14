/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-13 10:50:20
 * @LastEditTime: 2022-01-13 12:08:22
 * @Description: Modify here please
 */

import { BasicPageParams } from '../model/baseModel';

export interface GetProductParameters extends BasicPageParams {
  title: string;
}

// 产品规格类型
interface SkuType {
  id: number;
  name: string;
}

export interface CreateProductParmeters {
  title: string;
  pic: string;
  category: string;
  price: number;
  inventory: number;
  sales: number;
  views: number;
  sort: number;
  status: boolean;
  tags: [string];
  sku: [SkuType];
  description: string;
}
export type UpdateProductParameters = CreateProductParmeters;
