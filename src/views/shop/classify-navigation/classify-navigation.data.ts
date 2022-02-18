/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-17 09:54:46
 * @LastEditTime: 2022-02-18 15:29:50
 * @Description: Modify here please
 */

import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';
import { Switch, Image, Tag } from 'ant-design-vue';
import { h } from 'vue';
import { useMessage } from '/@/hooks/web/useMessage';

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
    labelWidth: 50,
    colProps: { span: 4 },
  },
  {
    field: 'type',
    label: '跳转类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '页面', value: 1 },
        { label: '网址', value: 2 },
      ],
    },
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
    label: '导航名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'pic',
    label: '导航图片',
    component: 'Input',
    required: true,
    slot: 'pic',
  },
  {
    field: 'type',
    label: '类型',
    component: 'Select',
    required: true,
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
  },
  {
    field: 'url',
    label: '网页地址',
    component: 'Input',
    required: false,
    show: false,
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    required: true,
  },
];
