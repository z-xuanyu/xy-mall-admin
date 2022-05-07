/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 11:08:31
 * @LastEditTime: 2022-05-06 17:52:15
 * @Description: Modify here please
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { Switch, Tag } from 'ant-design-vue';
import { formatToDateTime } from '/@/utils/dateUtil';
export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 160,
    align: 'left',
  },
  {
    title: '标签类型',
    dataIndex: 'type',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      return h(Tag, { color: 'success' }, { default: () => (record.type == 1 ? '产品' : '文章') });
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
    label: '标签名称',
    component: 'Input',
    labelWidth: 60,
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请输入标签名称',
    },
  },
  {
    field: 'type',
    label: '标签类型',
    component: 'Select',
    componentProps: {
      placeholder: '请选择标签类型',
      options: [
        { label: '产品', value: 1 },
        { label: '文章', value: 2 },
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
    label: '名称',
    component: 'Input',
    required: true,
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
    componentProps: {
      options: [
        { label: '产品', value: 1, key: 1 },
        { label: '文章', value: 2, key: 2 },
      ],
    },
  },
  {
    field: 'description',
    label: '描述',
    component: 'InputTextArea',
    required: true,
    colProps: {
      span: 24,
    },
  },
];
