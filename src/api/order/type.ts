/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-30 10:32:59
 * @LastEditTime: 2022-03-30 14:25:08
 * @Description: Modify here please
 */

import { BasicPageParams } from '../model/baseModel';

export interface QueryOrderParameters extends BasicPageParams {
  // 用户名称
  userName?: string;
}
