/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-28 10:03:21
 * @LastEditTime: 2022-03-28 16:09:04
 * @Description: Modify here please
 */
import { AddMenuParameters, QueryMenuParameters, UpdateMenuParameters } from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Menu = '/menu',
}

// 获取菜单列表
export function getMenus(params: QueryMenuParameters) {
  return defHttp.get({
    url: Api.Menu,
    params,
  });
}

// 添加菜单
export function addMenu(params: AddMenuParameters) {
  return defHttp.post({
    url: Api.Menu,
    params,
  });
}

// 更新菜单信息
export function updateMenu(id: string, params: UpdateMenuParameters) {
  return defHttp.patch({
    url: `${Api.Menu}/${id}`,
    params,
  });
}

// 删除菜单
export function removeMenu(id: string) {
  return defHttp.delete({
    url: `${Api.Menu}/${id}`,
  });
}
