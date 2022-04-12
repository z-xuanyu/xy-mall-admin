/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-06 10:12:18
 * @LastEditTime: 2022-04-12 16:21:56
 * @Description: banner 接口模块
 */
import {
  ChangeBannerStatus,
  CreateBannerParameters,
  QueryBannerParameters,
  UpdateBannerParameters,
} from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Banner = '/banner',
}

// banner 列表
export function getBannerList(params: QueryBannerParameters) {
  return defHttp.get({
    url: Api.Banner,
    params,
  });
}

// 添加banner
export function createBanner(params: CreateBannerParameters) {
  return defHttp.post({
    url: Api.Banner,
    params,
  });
}

/**
 * 更新banner信息
 *
 * @export
 * @param {string} id banner Id
 * @param {UpdateBannerParameters} params
 * @return {*}
 */
export function updateBanner(id: string, params: UpdateBannerParameters): Promise<any> {
  return defHttp.patch({
    url: `${Api.Banner}/${id}`,
    params,
  });
}

/**
 * 删除banner
 *
 * @export
 * @param {string} id banner iD
 * @return {*}  {Promise<any>}
 */
export function removeBanner(id: string): Promise<any> {
  return defHttp.delete({
    url: `${Api.Banner}/${id}`,
  });
}

// 改变banner 状态
export function changeBannerStatus(id: string, params: ChangeBannerStatus) {
  return defHttp.put({
    url: `${Api.Banner}/${id}/changeStatus`,
    params,
  });
}
