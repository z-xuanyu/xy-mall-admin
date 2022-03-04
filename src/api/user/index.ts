/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-25 10:52:24
 * @LastEditTime: 2022-02-28 15:22:38
 * @Description: Modify here please
 */
import { GetMemberListParameters, GetMemberUserAddressListParameters } from './type';
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
