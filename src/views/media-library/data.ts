/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-07 15:00:28
 * @LastEditTime: 2022-05-07 10:50:25
 * @Description: Modify here please
 */
import { FormSchema } from '/@/components/Form';

// 文件分类 formSchema

// 添加 form
export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '分类名称',
    component: 'Input',
    required: true,
    colProps: {
      span: 24,
    },
    componentProps: {
      placeholder: '请输入分类名称',
    },
  },
  {
    field: 'parentId',
    label: '上级分类',
    component: 'TreeSelect',
    colProps: {
      span: 24,
    },
    componentProps: {
      placeholder: '请选择上级',
      fieldNames: {
        label: 'name',
        key: '_id',
        value: '_id',
      },
      getPopupContainer: () => document.body,
    },
  },
];
