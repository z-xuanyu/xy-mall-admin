/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-25 16:44:53
 * @LastEditTime: 2022-05-07 11:34:45
 * @Description: Modify here please
 */
import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';
export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: '角色标识',
    dataIndex: 'label',
    width: 160,
    align: 'left',
  },
  {
    title: '角色备注',
    dataIndex: 'remark',
    width: 160,
    align: 'left',
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
    label: '角色名称',
    component: 'Input',
    labelWidth: 80,
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请输入角色名称',
    },
  },
];

// 添加 form
export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
    required: true,
    colProps: {
      span: 24,
    },
    componentProps: {
      placeholder: '请输入角色名称',
    },
  },
  {
    field: 'label',
    label: '角色标识',
    component: 'Input',
    required: true,
    colProps: {
      span: 24,
    },
    componentProps: {
      placeholder: '请输入角色名称',
    },
  },
  {
    field: 'remark',
    label: '角色备注',
    component: 'InputTextArea',
    colProps: {
      span: 24,
    },
    required: true,
    componentProps: {
      placeholder: '请输入角色的备注',
    },
  },
  {
    field: 'menuIds',
    label: '权限菜单',
    component: 'Input',
    slot: 'menuIds',
    colProps: {
      span: 24,
    },
  },
];
