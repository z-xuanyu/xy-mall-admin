/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 14:44:20
 * @LastEditTime: 2022-04-28 15:03:09
 * @Description: Modify here please
 */
export interface BasicPageParams {
  pageNumber?: number;
  pageSize?: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}
