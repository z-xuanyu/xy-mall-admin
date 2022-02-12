/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-02-12 14:40:01
 * @LastEditTime: 2022-02-12 14:57:10
 * @Description: Modify here please
 */

export interface Sku {
  //   规格名称
  skuName: string;

  //  规格值集合
  skuValues: Array<SkuData>;
}

export interface SkuData {
  // 规格值
  value: string;
  //   价格
  price: number | null;
  //   库存
  inventory: number | null;
  //   折扣价
  costPrice: number | null;
  //   重量
  weight: number | null;
  //  规格图片
  image: string;
  //   货号
  artNo: string;
}
