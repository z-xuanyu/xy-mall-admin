/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 14:00:30
 * @LastEditTime: 2022-01-05 14:14:39
 * @Description: Modify here please
 */
import { CreateNewsParameters, QueryNewsParameters, UpdateNewsParameters } from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  News = '/news',
}

// 新闻列表
export function getNewsList(params: QueryNewsParameters) {
  return defHttp.get({
    url: Api.News,
    params,
  });
}

// 新建新闻资讯
export function createNews(params: CreateNewsParameters) {
  return defHttp.post({
    url: Api.News,
    params,
  });
}

/**
 * 更新新闻信息
 *
 * @export
 * @param {string} id 新闻id
 * @param {UpdateNewsParameters} params 参数对象
 * @return {*}
 */
export function updateNews(id: string, params: UpdateNewsParameters): Promise<any> {
  return defHttp.patch({
    url: `${Api.News}/${id}`,
    params,
  });
}

/**
 * 删除新闻
 *
 * @export
 * @param {string} id 新闻id
 * @return {*}
 */
export function removeNews(id: string): Promise<any> {
  return defHttp.delete({
    url: `${Api.News}/${id}`,
  });
}
