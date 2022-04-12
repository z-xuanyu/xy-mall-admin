import { BasicColumn, FormSchema } from '/@/components/Table';

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-18 16:47:57
 * @LastEditTime: 2022-04-12 15:52:33
 * @Description: Modify here please
 */

import { Tag } from 'ant-design-vue';
import { h } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '商品',
    dataIndex: 'info',
    width: 200,
    align: 'left',
    slots: { customRender: 'info' },
  },
  {
    title: '价格',
    dataIndex: 'price',
    width: 160,
    align: 'center',
    slots: { customRender: 'price' },
  },
  {
    title: '库存',
    dataIndex: 'inventory',
    width: 50,
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 200,
    align: 'center',
    customRender: ({ record }) => {
      return h(
        Tag,
        { color: record.status ? 'green' : 'red' },
        { default: () => (record.status ? '上架中' : '已下架') },
      );
    },
  },
  {
    title: '数据统计',
    dataIndex: 'statistical',
    width: 100,
    align: 'center',
    slots: { customRender: 'statistical' },
  },
  {
    title: '热门推荐',
    width: 60,
    dataIndex: 'isHot',
    slots: { customRender: 'isHot' },
  },
  {
    title: '标签',
    dataIndex: 'tags',
    width: 100,
    align: 'center',
    customRender: ({ record }) => {
      return h(
        'div',
        {
          class: 'space-x-2',
        },
        record.tags.map((item) => h(Tag, { color: 'blue' }, { default: () => item.name })),
      );
    },
  },
];

//  搜索form
export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '商品标题',
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
      placeholder: '请输入商品标题',
    },
  },
];
