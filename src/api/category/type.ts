/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 16:38:30
 * @LastEditTime: 2022-01-05 16:49:42
 * @Description: Modify here please
 */

export interface QueryCategoryParameters {
  pageNumber: number;
  pageSize: number;
  name: string;
}

export interface CreateCategoryParameters {
  name: string;
  sort: number;
  parentId?: null | string;
}

export type UpdateCategoryParameters = CreateCategoryParameters;
