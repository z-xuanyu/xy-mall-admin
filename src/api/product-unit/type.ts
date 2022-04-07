/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-07 10:12:28
 * @LastEditTime: 2022-04-07 10:45:57
 * @Description: Modify here please
 */
import { BasicPageParams } from '../model/baseModel';

export interface GetProductUnitParameters extends BasicPageParams {
  name: string;
}

export interface CreateProductUnitParameters {
  name: string;

  sort: number;
}

export type UpdateProductUnitParameters = CreateProductUnitParameters;
