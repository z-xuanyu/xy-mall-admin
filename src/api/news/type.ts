import { BasicPageParams } from '../model/baseModel';

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 14:00:40
 * @LastEditTime: 2022-01-06 10:18:26
 * @Description: Modify here please
 */
export interface QueryNewsParameters extends BasicPageParams {
  title: string;
}

export interface CreateNewsParameters {
  title: string;
  tags: Array<string>;
  content: string;
}

export type UpdateNewsParameters = CreateNewsParameters;
