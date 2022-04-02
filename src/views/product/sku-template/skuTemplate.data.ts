/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-20 15:31:12
 * @LastEditTime: 2022-04-02 17:35:36
 * @Description: Modify here please
 */
import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '规格名',
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: '规格值',
    dataIndex: 'values',
    width: 200,
    align: 'left',
    customRender: ({ record }) => {
      return record.values.join('、');
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
    label: '规格名',
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

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '规格名称',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入名称',
    },
  },
  {
    field: 'values',
    label: '规格值',
    required: true,
    slot: 'values',
    component: 'Input',
  },
];
