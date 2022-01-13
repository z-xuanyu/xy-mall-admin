/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 11:08:31
 * @LastEditTime: 2022-01-11 17:04:30
 * @Description: Modify here please
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { Switch, Image, Tag } from 'ant-design-vue';
import { formatToDateTime } from '/@/utils/dateUtil';
import { bannerTypeMap } from '/@/enumMaps';
export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 50,
    align: 'center',
    customRender: ({ record }) => {
      return h(Tag, { color: '#108ee9' }, { default: () => bannerTypeMap[record.type] });
    },
  },
  {
    title: 'Banner图',
    dataIndex: 'image',
    width: 160,
    align: 'center',
    customRender: ({ record }) => {
      return h(Image, {
        src: record.image,
        width: 50,
      });
    },
  },
  {
    title: '链接',
    dataIndex: 'url',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      return record.url ? h('a', { href: record.url, target: '_blank' }, record.url) : '无';
    },
  },
  {
    title: '关联商品',
    dataIndex: 'productId',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      return record.productId ? '关联产品' : '无';
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
        { label: '启用', value: 2 },
        { label: '停用', value: 1 },
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
    field: 'type',
    component: 'Select',
    label: '类型',
    componentProps: {
      options: [
        {
          label: '外链',
          value: 1,
          key: '1',
        },
        {
          label: '关联商品',
          value: 2,
          key: '2',
        },
        {
          label: '无',
          value: 3,
          key: '3',
        },
      ],
    },
  },
  {
    field: 'image',
    label: '图片',
    component: 'Input',
    required: true,
    slot: 'image',
  },
  {
    field: 'url',
    label: '链接',
    component: 'Input',
    required: true,
  },
];
