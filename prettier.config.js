/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 14:44:20
 * @LastEditTime: 2022-05-07 14:31:56
 * @Description: prettier.config.js 配置文件
 */
module.exports = {
  printWidth: 100, //一行的字符数，如果超过会进行换行，默认为80
  tabWidth: 2, // 一个 tab 代表几个空格数，默认为 2 个
  useTabs: false, //是否使用 tab 进行缩进，默认为false，表示用空格进行缩减
  semi: true, // 行尾是否使用分号，默认为true
  vueIndentScriptAndStyle: true,
  singleQuote: true, // 字符串是否使用单引号，默认为 false，使用双引号
  trailingComma: 'all',
  proseWrap: 'never',
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'auto',
};
