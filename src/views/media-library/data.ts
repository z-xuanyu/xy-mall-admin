/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-07 15:00:28
 * @LastEditTime: 2022-01-07 17:45:38
 * @Description: Modify here please
 */
import { ref } from 'vue';
import { FormSchema } from '/@/components/Form';
//每行个数
export const grid = ref(9);
// slider属性
export const useSlider = (min = 6, max = 12) => {
  // 每行显示个数滑动条
  const getMarks = () => {
    const l = {};
    for (let i = min; i < max + 1; i++) {
      l[i] = {
        style: {
          color: '#fff',
        },
        label: i,
      };
    }
    return l;
  };
  return {
    min,
    max,
    marks: getMarks(),
    step: 1,
  };
};

// 转化树形结构数组

export function TransformTreeArr(arr = [], parentId = null) {
  if (!Array.isArray(arr)) return;
  return arr
    .filter((item: any) => item.parentId == parentId)
    .map((childItem: any) =>
      TransformTreeArr(arr, childItem._id).length
        ? {
            ...childItem,
            children: TransformTreeArr(arr, childItem._id),
          }
        : { ...childItem },
    );
}

// 文件分类 formSchema

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
];
