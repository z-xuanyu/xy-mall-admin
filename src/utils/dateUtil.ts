/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 14:44:22
 * @LastEditTime: 2022-04-08 14:19:56
 * @Description: Modify here please
 */
/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import moment from 'moment';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD ';

export function formatToDateTime(
  date: moment.MomentInput = undefined,
  format = DATE_TIME_FORMAT,
): string {
  return moment(date).format(format);
}

export function formatToDate(date: moment.MomentInput = undefined, format = DATE_FORMAT): string {
  return moment(date).format(format);
}

// 获取前30天时间集合
export function get30days() {
  const thrityMonth: any = [];
  for (let i = 0; i < 30; i++) {
    const dateStr = moment(new Date(new Date().setDate(new Date().getDate() - i))).format('MM/DD');
    thrityMonth.unshift(dateStr);
  }
  return thrityMonth;
}
export const dateUtil = moment;
