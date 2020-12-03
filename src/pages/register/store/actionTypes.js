/*
 * @Author: 牛皓
 * @Date: 2020-11-27 10:50:03
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-11-27 14:56:15
 * @FilePath: \rays\src\pages\register\store\actionTypes.js
 */
//action的type即使组件内和reducer内不相同页不会报错，抽取出来重新赋值可以避免这种错误并且促会错会报错容易修改
export const REGISTER_REQUEST_START = 'register@REGISTER_reuqest_start'
export const REGISTER_REQUEST_DONE = 'register@REGISTER_reuqest_done'