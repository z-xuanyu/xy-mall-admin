/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 14:44:20
 * @LastEditTime: 2022-05-09 16:31:12
 * @Description: 后台用户登录
 */
import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/auth/admin/login',
  GetUserInfo = '/auth/admin/info',
  GetPermCode = '/auth/admin/getPermCode',
  GetCaptcha = '/auth/admin/getCaptcha',
}

/**
 * @description: 管理员用户登录
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 管理员用户信息
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

// 获取权限码
export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

// 获取验证码
export function getCaptcha() {
  return defHttp.get({ url: Api.GetCaptcha });
}
