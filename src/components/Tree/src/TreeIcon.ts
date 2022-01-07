/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 14:44:21
 * @LastEditTime: 2022-01-07 16:56:03
 * @Description: Modify here please
 */
import type { VNode, FunctionalComponent } from 'vue';

import { h } from 'vue';
import { isString } from '@vue/shared';
import { Icon } from '/@/components/Icon';

export const TreeIcon: FunctionalComponent = ({ icon }: { icon: VNode | string }) => {
  if (!icon) return null;
  if (isString(icon)) {
    return h(Icon, { icon, class: 'mr-1' });
  }
  return Icon;
};
