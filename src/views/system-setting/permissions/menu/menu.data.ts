/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-28 10:27:38
 * @LastEditTime: 2022-05-07 14:37:32
 * @Description: Modify here please
 */
import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { formatToDateTime } from '/@/utils/dateUtil';
import { Icon } from '/@/components/Icon';
import { Tag } from 'ant-design-vue';
const viewObj = import.meta.glob('../../../../views/**/index.{vue,tsx}');
const views = Object.keys(viewObj);
const componenOptions = views
  .filter((item) => !item.includes('/sys/'))
  .map((v) => ({
    value: v.split('../../../../views')[1].split('.vue')[0],
    label: v.split('../../../../views')[1].split('.vue')[0],
  }));

componenOptions.push({
  value: 'LAYOUT',
  label: 'LAYOUT',
});
export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'title',
    width: 180,
    align: 'left',
    customRender: ({ record }) => {
      return record?.meta?.title;
    },
  },
  {
    title: 'icon',
    dataIndex: 'icon',
    width: 40,
    align: 'center',
    customRender: ({ record }) => {
      return h(Icon, { icon: record?.meta?.icon, size: 24 });
    },
  },
  {
    title: '节点路由',
    dataIndex: 'path',
    width: 80,
    align: 'center',
  },
  {
    title: '路由缓存',
    dataIndex: 'ignoreKeepAlive',
    width: 80,
    align: 'center',
    customRender: ({ record }) => {
      return h(
        Tag,
        { color: !record?.meta?.ignoreKeepAlive ? 'success' : 'error' },
        { default: () => (!record?.meta?.ignoreKeepAlive ? '是' : '否') },
      );
    },
  },
  {
    title: '组件路径',
    dataIndex: 'component',
    width: 180,
    align: 'center',
  },
  {
    title: '排序号',
    dataIndex: 'orderNo',
    width: 40,
    align: 'center',
    customRender: ({ record }) => {
      return record?.meta?.orderNo;
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
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
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
    label: '菜单名称',
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 4 },
  },
];
// 添加 form
export const formSchema: FormSchema[] = [
  {
    field: 'path',
    label: '路由路径',
    helpMessage: ['说明：页面访问的URL地址。', '注意：路径要以 / 开头，例如：/user'],
    component: 'Input',
    required: true,
    colProps: { span: 24 },
    componentProps: {
      placeholder: '请输入路由路径,例如：/user',
    },
    rules: [
      {
        pattern: /\/[a-z]/i,
        message: '必须是/开头,字母命名路径',
        trigger: 'change',
      },
    ],
  },
  {
    field: 'title',
    label: '菜单名称',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
    componentProps: {
      placeholder: '请输入菜单名称',
    },
  },
  {
    field: 'component',
    label: '组件路径',
    helpMessage: ['说明：路由组件文件Path路径。'],
    component: 'Select',
    colProps: { span: 24 },
    required: true,
    componentProps: {
      placeholder: '请选择组件路径',
      options: componenOptions,
    },
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    colProps: { span: 24 },
    componentProps: {
      placeholder: '请选择上级',
      fieldNames: {
        label: 'title',
        key: '_id',
        value: '_id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'icon',
    label: '菜单图标',
    component: 'IconPicker',
    colProps: { span: 24 },
    required: true,
  },
  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    colProps: { span: 24 },
    required: true,
    componentProps: {
      placeholder: '请输入排序',
    },
  },
  {
    field: 'ignoreKeepAlive',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    defaultValue: false,
    colProps: { span: 24 },
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
  },
  {
    field: 'hideMenu',
    label: '隐藏菜单',
    component: 'RadioButtonGroup',
    defaultValue: false,
    colProps: { span: 24 },
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
  },
];
