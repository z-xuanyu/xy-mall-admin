/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-25 10:52:24
 * @LastEditTime: 2022-06-28 11:03:48
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
  MemberAddress = '/userAddress',
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

/**
 * 获取用户订单信息
 *
 * @export
 * @param {string} id 用户id
 * @param {number} status 订单状态
 * @return {*}
 */
export function getMemberOrder(id: string, status: number) {
  return defHttp.get({
    url: `${Api.Member}/${id}/orderList`,
    params: {
      status,
    },
  });
}

/**
 *  删除会员信息
 *
 * @export
 * @param {string} id 会员ID
 * @return {*}
 */
export function deleteMember(id: string) {
  return defHttp.delete({
    url: `${Api.Member}/${id}`,
  });
}
