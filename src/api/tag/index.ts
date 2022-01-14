/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-13 10:50:13
 * @LastEditTime: 2022-01-13 15:49:51
 * @Description: Modify here please
 */
import { CreateTagParmeters, GetTagParameters, UpdateTagParameters } from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Tag = '/tag',
}

// 获取标签列表
export function getTagList(params: GetTagParameters) {
  return defHttp.get({
    url: Api.Tag,
    params,
  });
}

// 添加标签
export function createTag(params: CreateTagParmeters) {
  return defHttp.post({
    url: Api.Tag,
    params,
  });
}
/**
 * 获取标签信息
 *
 * @export
 * @param {string} id 标签id
 * @return {*}
 */
export function getTagInfo(id: string) {
  return defHttp.get({
    url: `${Api.Tag}/${id}`,
  });
}

/**
 * 更新标签信息
 *
 * @export
 * @param {string} id 标签id
 * @param {UpdateTagParameters} params
 * @return {*}
 */
export function updateTag(id: string, params: UpdateTagParameters) {
  return defHttp.patch({
    url: `${Api.Tag}/${id}`,
    params,
  });
}

/**
 * 删除标签
 *
 * @export
 * @param {string} id 标签id
 * @return {*}
 */
export function removeTag(id: string) {
  return defHttp.delete({
    url: `${Api.Tag}/${id}`,
  });
}
