/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-25 10:52:24
 * @LastEditTime: 2022-02-25 10:56:17
 * @Description: Modify here please
 */
import { GetMemberListParameters } from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Member = '/user',
}

// 获取会员列表
export function getMemberList(params: GetMemberListParameters) {
  return defHttp.get({
    url: Api.Member,
    params,
  });
}
