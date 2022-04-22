/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-22 10:28:13
 * @LastEditTime: 2022-04-22 11:37:06
 * @Description: Modify here please
 */
import { Switch, Avatar } from 'ant-design-vue';
import { RuleObject } from 'ant-design-vue/lib/form/interface';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useMessage } from '/@/hooks/web/useMessage';
import { formatToDateTime } from '/@/utils/dateUtil';
import { h } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '客服名称',
    dataIndex: 'name',
    width: 200,
    align: 'center',
  },
  {
    title: '客服头像',
    dataIndex: 'avatar',
    width: 200,
    align: 'center',
    customRender: ({ record }) => {
      return h(Avatar, { src: record.avatar, size: 50 });
    },
  },
  {
    title: '客服账号(手机号)',
    dataIndex: 'phone',
    width: 200,
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange: async (checked: boolean) => {
          record.pendingStatus = true;
          const { createMessage } = useMessage();
          // await changeBannerStatus(record._id, { status: checked ? 2 : 1 });
          record.status = checked;
          record.pendingStatus = false;
          createMessage.success(`状态更改成功!`);
        },
      });
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

//  搜索form
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '客服名称',
    component: 'Input',
    labelWidth: 70,
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请输入客服名称',
    },
  },
];

let password = '';

const validatePass = async (_rule: RuleObject, value: string) => {
  if (!value) return Promise.reject('请输入密码');
  password = value;
  return Promise.resolve();
};
const validatePass2 = async (_rule: RuleObject, value: string) => {
  if (!value) return Promise.reject('请再次输入密码');
  if (password !== value) return Promise.reject('两次输入密码不一致');
  return Promise.resolve();
};

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '客服名称',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入设置客服名称',
    },
  },
  {
    field: 'phone',
    label: '手机号(账号)',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入登录客服账号',
    },
  },
  {
    field: 'password',
    label: '账号密码',
    component: 'InputPassword',
    required: true,
    componentProps: {
      placeholder: '请输入设置账号密码',
    },
    rules: [
      { required: true, validator: validatePass, trigger: 'change' },
      { min: 6, max: 20, message: '请输入6~20位密码' },
    ],
  },
  {
    field: 'password2',
    label: '确认密码',
    component: 'InputPassword',
    required: true,
    rules: [{ required: true, validator: validatePass2, trigger: 'change' }],
    componentProps: {
      placeholder: '请再次确认密码',
    },
  },
  {
    field: 'avatar',
    label: '客服头像',
    component: 'Input',
    required: true,
    slot: 'avatar',
  },
];
