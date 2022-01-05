/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 14:00:40
 * @LastEditTime: 2022-01-05 14:11:42
 * @Description: Modify here please
 */
export interface QueryNewsParameters {
  pageNumber: number;
  pageSize: number;
  title: string;
}

export interface CreateNewsParameters {
  title: string;
  tags: Array<string>;
  content: string;
}

export type UpdateNewsParameters = CreateNewsParameters;
