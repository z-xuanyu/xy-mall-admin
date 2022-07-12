/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-02 16:23:13
 * @LastEditTime: 2022-07-12 12:19:34
 * @Description: Modify here please
 */
import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';
import { useMessage } from '/@/hooks/web/useMessage';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';

// 列表字段
export const columns: BasicColumn[] = [
  {
    title: '优惠券名称',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: '优惠券类型',
    dataIndex: 'type',
    align: 'left',
  },
  {
    title: '面值',
    dataIndex: 'price',
    align: 'left',
  },
  {
    title: '领取方式',
    dataIndex: 'receiveType',
    align: 'left',
  },
  {
    title: '领取时间',
    dataIndex: 'receiveDate',
    align: 'left',
  },
  {
    title: '使用时间',
    dataIndex: 'useDate',
    align: 'left',
  },
  {
    title: '发布数量',
    dataIndex: 'publishCount',
    align: 'left',
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    customRender: ({ record }) => {
      return h(Switch, {
        checked: record.status,
        checkedChildren: '开启',
        unCheckedChildren: '关闭',
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
    labelWidth: 80,
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请输入优惠券名称',
    },
  },
  {
    field: 'type',
    label: '类型',
    component: 'Select',
    labelWidth: 80,
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请选择优惠券类型',
      options: [
        {
          label: '满减券',
          value: '1',
        },
        {
          label: '折扣券',
          value: '2',
        },
        {
          label: '免费券',
          value: '3',
        },
      ],
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    labelWidth: 80,
    colProps: {
      xxl: 4,
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
    },
    componentProps: {
      placeholder: '请选择状态',
      options: [
        {
          label: '未发布',
          value: '1',
        },
        {
          label: '已发布',
          value: '2',
        },
        {
          label: '已使用',
          value: '3',
        },
        {
          label: '已过期',
          value: '4',
        },
      ],
    },
  },
];

// 添加或者编辑form
export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
    colProps: {
      span: 16,
    },
    componentProps: {
      placeholder: '请输入优惠券名称',
    },
  },
  {
    label: '发送方式',
    field: 'receiveType',
    component: 'RadioGroup',
    required: true,
    colProps: {
      span: 24,
    },
    defaultValue: '1',
    componentProps: {
      options: [
        {
          label: '手动领取',
          value: '1',
        },
        {
          label: '新人券',
          value: '2',
        },
        {
          label: '赠送券',
          value: '3',
        },
        {
          label: '会员券',
          value: '4',
        },
      ],
    },
  },
  {
    label: '类型',
    field: 'type',
    component: 'RadioGroup',
    defaultValue: '1',
    colProps: {
      span: 24,
    },
    componentProps: {
      options: [
        {
          label: '通用券',
          value: '1',
        },
        {
          label: '品类券',
          value: '2',
        },
        {
          label: '商品券',
          value: '3',
        },
      ],
    },
  },
  {
    label: '面值',
    field: 'price',
    component: 'InputNumber',
    colProps: {
      span: 24,
    },
    componentProps: {
      placeholder: '请输入面值',
      style: 'width: 200px',
    },
  },
  {
    label: '使用门槛',
    field: 'useCondition',
    component: 'RadioGroup',
    defaultValue: '1',
    colProps: {
      span: 24,
    },
    componentProps: ({ formActionType }) => {
      return {
        options: [
          {
            label: '无门槛',
            value: '1',
          },
          {
            label: '有门槛',
            value: '2',
          },
        ],
        onChange: (value) => {
          const { updateSchema } = formActionType;
          // 门槛金额显示
          updateSchema({
            field: 'conditionPrice',
            required: value.target.value === '2',
            show: value.target.value === '2',
          });
        },
      };
    },
  },
  {
    label: '门槛金额',
    field: 'conditionPrice',
    component: 'InputNumber',
    colProps: {
      span: 24,
    },
    componentProps: {
      placeholder: '填写优惠券的最低消费金额',
      style: 'width: 200px',
    },
    show: false,
  },
  {
    label: '使用时间',
    field: 'useDate',
    component: 'RadioGroup',
    defaultValue: '1',
    colProps: {
      span: 24,
    },
    componentProps: ({ formActionType }) => {
      return {
        options: [
          {
            label: '天数',
            value: '1',
          },
          {
            label: '时间段',
            value: '2',
          },
        ],
        onChange: (value) => {
          const { updateSchema } = formActionType;
          // 显示天数
          updateSchema({
            field: 'day',
            required: value.target.value === '1',
            show: value.target.value === '1',
          });
          // 显示时间段
          updateSchema({
            field: 'time',
            required: value.target.value === '2',
            show: value.target.value === '2',
          });
        },
      };
    },
  },
  {
    label: '天数',
    field: 'day',
    component: 'InputNumber',
    required: true,
    colProps: {
      span: 24,
    },
    componentProps: {
      placeholder: '领取后多少天内有效',
      style: 'width: 200px',
    },
  },
  {
    label: '时间段',
    field: 'time',
    component: 'RangePicker',
    colProps: {
      span: 24,
    },
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
    },
    show: false,
  },
  {
    label: '是否限量',
    field: 'isLimit',
    component: 'RadioGroup',
    defaultValue: '1',
    colProps: {
      span: 24,
    },
    componentProps: ({ formActionType }) => {
      return {
        options: [
          {
            label: '否',
            value: '1',
          },
          {
            label: '是',
            value: '2',
          },
        ],
        onChange: (value) => {
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'limitNum',
            required: value.target.value === '2',
            show: value.target.value === '2',
          });
        },
      };
    },
  },
  {
    label: '限量数量',
    field: 'limitNum',
    component: 'InputNumber',
    colProps: {
      span: 24,
    },
    componentProps: {
      placeholder: '填写优惠券的发布数量',
      style: 'width: 200px',
    },
    show: false,
  },
  {
    label: '状态',
    field: 'status',
    component: 'RadioGroup',
    defaultValue: '1',
    colProps: {
      span: 24,
    },
    componentProps: {
      options: [
        {
          label: '开启',
          value: '1',
        },
        {
          label: '关闭',
          value: '2',
        },
      ],
    },
  },
];
// 模拟数据
export function getCunponList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: '优惠券名称',
          type: '满减券',
          price: '100',
          receiveType: '按用户领取',
          receiveDate: '2020-04-02',
          useDate: '2020-04-02',
          status: '已发布',
          publishCount: '100',
          createdAt: '2020-04-02',
        },
        {
          id: 2,
          name: '优惠券名称',
          type: '满减券',
          price: '100',
          receiveType: '按用户领取',
          receiveDate: '2020-04-02',
          useDate: '2020-04-02',
          status: '已发布',
          publishCount: '10',
          createdAt: '2020-04-02',
        },
      ]);
    }, 1000);
  });
}
