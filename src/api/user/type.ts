/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-25 10:52:30
 * @LastEditTime: 2022-02-25 10:56:02
 * @Description: Modify here please
 */

import { BasicPageParams } from '../model/baseModel';

export interface GetMemberListParameters extends BasicPageParams {
  // 会员名称
  name: string;
}
