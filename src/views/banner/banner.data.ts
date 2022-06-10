/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-05 11:08:31
 * @LastEditTime: 2022-06-10 14:52:14
 * @Description: Modify here please
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { Switch, Image, Tag } from 'ant-design-vue';
import { formatToDateTime } from '/@/utils/dateUtil';
import { bannerTypeMap } from '/@/enumMaps';
import { changeBannerStatus } from '/@/api/banner';

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
      return record.product ? record.product.title : '无';
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
        checked: record.status == 2,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange: async (checked: boolean) => {
          record.pendingStatus = true;
          const { createMessage } = useMessage();
          await changeBannerStatus(record._id, { status: checked ? 2 : 1 });
          record.status = checked ? 2 : 1;
          record.pendingStatus = false;
          createMessage.success(`状态更改成功!`);
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
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请输入名称',
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: 2 },
        { label: '停用', value: 1 },
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
    component: 'Select',
    label: '类型',
    required: true,
    colProps: {
      span: 24,
    },
    componentProps: ({ formActionType }) => {
      return {
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
        onChange: (value: any) => {
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'url',
            show: value == 1,
            required: value == 1,
          });

          updateSchema({
            field: 'product',
            show: value == 2,
            required: value == 2,
          });
        },
      };
    },
  },
  {
    field: 'image',
    label: '图片',
    component: 'Input',
    required: true,
    slot: 'image',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'url',
    label: '链接',
    component: 'Input',
    show: false,
    required: false,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'product',
    label: '关联商品',
    component: 'Input',
    show: false,
    required: false,
    slot: 'product',
    colProps: {
      span: 24,
    },
  },
];
