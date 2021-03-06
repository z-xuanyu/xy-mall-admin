/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-17 09:57:43
 * @LastEditTime: 2022-04-12 15:31:27
 * @Description: Modify here please
 */

import { BasicPageParams } from '../model/baseModel';

export interface QueryClassifyNavigationParameters extends BasicPageParams {
  //   分类名称
  name: string;

  //   状态
  status: boolean;
}

export interface CreateClassifyNavigationParameters {
  //   分类名称
  name: string;

  // 分类图片
  pic: string;

  // 分类类型 1: 页面，2：外链网站
  type: number;

  // 页面路径
  pagePath: string;

  // 外链url
  url: string;

  // 备注
  remark: string;

  // 排序
  sort: number;
}

// 更新
export type UpdateClassifyNavigationParameters = CreateClassifyNavigationParameters;

// 改变状态
export interface ChangeClassifyNavigationStatusParameters {
  // 状态
  status: boolean;
}
