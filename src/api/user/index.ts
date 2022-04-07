/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-25 10:52:24
 * @LastEditTime: 2022-04-07 17:26:59
 * @Description: Modify here please
 */
import {
  GetMemberCollectionsParameters,
  GetMemberListParameters,
  GetMemberUserAddressListParameters,
  GetMemberViewHistoriesParameters,
} from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Member = '/user',
  MemberAddress = '/user-address',
}

// 获取会员列表
export function getMemberList(params: GetMemberListParameters) {
  return defHttp.get({
    url: Api.Member,
    params,
  });
}

// 获取会员地址列表
export function getMemberUserAddressList(params: GetMemberUserAddressListParameters) {
  return defHttp.get({
    url: Api.MemberAddress,
    params,
  });
}

// 获取用户浏览记录
export function getMemberViewHistories(params: GetMemberViewHistoriesParameters) {
  return defHttp.get({
    url: `${Api.Member}/${params.userId}/viewHistories`,
    params,
  });
}

// 获取用户商品收藏列表
export function getMemberCollections(params: GetMemberCollectionsParameters) {
  return defHttp.get({
    url: `${Api.Member}/${params.userId}/collections`,
    params,
  });
}
