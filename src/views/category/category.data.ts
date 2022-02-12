/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 16:53:34
 * @LastEditTime: 2022-02-12 17:18:28
 * @Description: Modify here please
 */
import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    width: 80,
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 50,
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
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 180,
    customRender: ({ record }) => {
      return formatToDateTime(record.updatedAt);
    },
  },
];

//  搜索form
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '分类名称',
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 4 },
  },
];
// 添加 form
export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '分类名称',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入分类名称',
    },
  },
  {
    field: 'parentId',
    label: '上级分类',
    component: 'TreeSelect',
    componentProps: {
      placeholder: '请选择上级',
      replaceFields: {
        title: 'name',
        key: '_id',
        value: '_id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    required: true,
    componentProps: {
      placeholder: '请输入排序',
    },
  },
];
