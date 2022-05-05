/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-03-29 15:45:35
 * @LastEditTime: 2022-05-05 11:15:47
 * @Description: Modify here please
 */
import { QueryProductCommentParameters, ReplyProductCommentParameters } from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  ProductComment = '/productComment',
}

// 获取商品评论列表
export function getProductComments(params: QueryProductCommentParameters) {
  return defHttp.get({
    url: Api.ProductComment,
    params,
  });
}

// 回复商品评论
export function replyProductComment(id: string, params: ReplyProductCommentParameters) {
  return defHttp.patch({
    url: `${Api.ProductComment}/${id}/reply`,
    params,
  });
}

// 删除商品评论
export function removeProductComment(id: string) {
  return defHttp.delete({
    url: `${Api.ProductComment}/${id}`,
  });
}
