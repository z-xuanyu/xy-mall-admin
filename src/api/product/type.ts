/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-13 10:50:20
 * @LastEditTime: 2022-01-13 10:56:53
 * @Description: Modify here please
 */

import { BasicPageParams } from '../model/baseModel';

export interface GetProductParameters extends BasicPageParams {
  name: string;
}

export interface UpdateProductParameters {
  name: string;
}
