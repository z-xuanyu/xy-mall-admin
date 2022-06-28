/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-06-28 11:16:43
 * @LastEditTime: 2022-06-28 11:39:37
 * @Description: 会员编辑
 */
import { FormSchema } from '/@/components/Form';
export const formSchema: FormSchema[] = [
  {
    field: 'nickName',
    label: '昵称',
    component: 'Input',
    required: true,
    colProps: {
      span: 24,
    },
    rules: [{ trigger: 'blur', max: 8, message: '昵称不能超过8个字符' }],
    componentProps: {
      placeholder: '请输入昵称',
    },
  },
  {
    field: 'email',
    label: 'Email',
    component: 'Input',
    required: true,
    dynamicDisabled: false,
    colProps: {
      span: 24,
    },
    rules: [
      { required: true, message: '请输入邮箱', trigger: 'change' },
      { type: 'email', message: '请输入正确的邮箱', trigger: 'change' },
    ],
    componentProps: {
      placeholder: '邮箱',
      maxlength: 50,
    },
  },
  {
    field: 'avatarUrl',
    label: '头像',
    component: 'Input',
    required: true,
    slot: 'avatarUrl',
    colProps: {
      span: 24,
    },
    rules: [{ required: true, trigger: 'blur', message: '请选择头像' }],
  },
];
