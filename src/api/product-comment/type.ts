/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-29 15:45:40
 * @LastEditTime: 2022-03-29 18:04:22
 * @Description: Modify here please
 */

import { BasicPageParams } from '../model/baseModel';

export interface QueryProductCommentParameters extends BasicPageParams {
  // 用户名称
  userName?: string;

  // 商品名称
  productName?: string;
}

export interface ReplyProductCommentParameters {
  // 回复内容
  content?: string;
}
