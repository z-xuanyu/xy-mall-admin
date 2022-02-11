/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 11:08:31
 * @LastEditTime: 2022-02-11 17:37:58
 * @Description: Modify here please
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { Switch, Tag } from 'ant-design-vue';
import { formatToDateTime } from '/@/utils/dateUtil';
import { RoleEnum } from '/@/enums/roleEnum';
import { roleTypeMap } from '/@/enumMaps';

// 获取角色选项
function getRoleOptions() {
  const roleOption: any = [];
  for (const key in RoleEnum) {
    const item = {
      label: roleTypeMap[RoleEnum[key]],
      value: RoleEnum[key],
      key: RoleEnum[key],
    };
    roleOption.push(item);
  }

  return roleOption;
}

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 160,
    align: 'left',
  },
  {
    title: '角色',
    dataIndex: 'roles',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      return h(
        'div',
        {
          class: 'space-x-2',
        },
        record.roles.map((item) =>
          h(Tag, { color: 'success' }, { default: () => roleTypeMap[item] }),
        ),
      );
    },
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
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const { createMessage } = useMessage();
          setTimeout(() => {
            createMessage.success(`状态更改成功!`);
            record.status = checked;
            record.pendingStatus = false;
          }, 1000);
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
    label: '名称',
    component: 'Input',
    labelWidth: 50,
    colProps: { span: 4 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: true },
        { label: '停用', value: false },
      ],
    },
    colProps: { span: 4 },
  },
];

// 添加 form
export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    rules: [
      { required: true },
      {
        message: '请输入正确的邮箱',
        pattern:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
    ],
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'roles',
    label: '角色',
    component: 'Select',
    required: true,
    componentProps: {
      placeholder: '请选择角色',
      mode: 'multiple',
      options: getRoleOptions(),
    },
  },
];
