/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-17 09:54:46
 * @LastEditTime: 2022-05-06 11:59:38
 * @Description: Modify here please
 */

import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';
import { Switch, Image, Tag } from 'ant-design-vue';
import { h } from 'vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { changeClassifyNavigationStatus } from '/@/api/classify-navigation';

export const columns: BasicColumn[] = [
  {
    title: '导航名称',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: '导航图片',
    dataIndex: 'pic',
    width: 160,
    align: 'center',
    customRender: ({ record }) => {
      return h(Image, {
        src: record.pic,
        width: 50,
      });
    },
  },
  {
    title: '跳转类型',
    dataIndex: 'type',
    width: 160,
    align: 'center',
    customRender: ({ record }) => {
      return h(Tag, { color: 'success' }, { default: () => (record.type == 1 ? '页面' : '网址') });
    },
  },
  {
    title: '跳转地址',
    dataIndex: 'jumpUrl',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      return record.type == 1 ? record.pagePath : record.url;
    },
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 80,
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 160,
    align: 'center',
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
          await changeClassifyNavigationStatus(record._id, { status: checked });
          record.status = checked;
          record.pendingStatus = false;
          createMessage.success(`状态更改成功!`);
        },
      });
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 160,
    align: 'center',
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
    label: '导航名称',
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
      placeholder: '请输入导航名称',
    },
  },
  {
    field: 'type',
    label: '跳转类型',
    component: 'Select',
    componentProps: {
      placeholder: '请输选择类型',
      options: [
        { label: '页面', value: 1 },
        { label: '网址', value: 2 },
      ],
    },
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: true },
        { label: '停用', value: false },
      ],
    },
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
  },
];

// 添加 form
export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '导航名称',
    component: 'Input',
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'pic',
    label: '导航图片',
    component: 'Input',
    required: true,
    slot: 'pic',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'type',
    label: '类型',
    component: 'Select',
    required: true,
    colProps: {
      span: 24,
    },
    componentProps: ({ formActionType }) => {
      return {
        options: [
          { label: '页面', value: 1, key: 1 },
          { label: '网址', value: 2, key: 2 },
        ],
        onChange: (value: any) => {
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'pagePath',
            show: value == 1,
            required: value == 1,
          });

          updateSchema({
            field: 'url',
            show: value == 2,
            required: value == 2,
          });
        },
      };
    },
  },
  {
    field: 'pagePath',
    label: '页面路径',
    component: 'Input',
    required: false,
    show: false,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'url',
    label: '网页地址',
    component: 'Input',
    required: false,
    show: false,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    required: true,
    defaultValue: 1,
    colProps: {
      span: 24,
    },
    componentProps: {
      min: 1,
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    required: true,
    colProps: {
      span: 24,
    },
  },
];
