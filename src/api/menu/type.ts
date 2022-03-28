/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-28 10:03:31
 * @LastEditTime: 2022-03-28 16:08:29
 * @Description: Modify here please
 */
import { BasicPageParams } from '../model/baseModel';

export interface QueryMenuParameters extends BasicPageParams {
  // 菜单名称
  title?: string;
}

interface TagItem {
  //   是否显示小圆点
  dot: boolean;

  //   内容
  content: string;

  //   类型
  type: 'error' | 'primary' | 'warn' | 'success';
}

interface MetaItem {
  // 菜单栏icon
  icon: string;

  tag?: TagItem;

  // 是否禁用
  disabled?: boolean;

  // 是否隐藏菜单
  hideMenu?: boolean;

  // 菜单名称
  title: string;

  // 是否固定标签
  affix?: boolean;

  // 是否忽略KeepAlive缓存
  ignoreKeepAlive?: boolean;

  // 隐藏所有子菜单
  hideChildrenInMenu?: boolean;

  // 当前激活的菜单。用于配置详情页时左侧激活的菜单路径
  currentActiveMenu?: string;

  // 菜单排序，只对第一级有效
  orderNo?: number;
}

export interface AddMenuParameters {
  // 路由名称
  name: string;

  //   路由路径
  path: string;

  //  路由指定component 路径
  component: string;

  //   菜单mate
  meta: MetaItem;

  //   上级id
  parentId: null | string;
}

export type UpdateMenuParameters = AddMenuParameters;
