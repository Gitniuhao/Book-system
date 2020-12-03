/*
 * @Author: 牛皓
 * @Date: 2020-11-27 10:47:02
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-11-27 15:01:31
 * @FilePath: \rays\src\pages\login\store\actionTypes.js
 */
//action的type即使组件内和reducer内不相同页不会报错，抽取出来重新赋值可以避免这种错误并且促会错会报错容易修改
export const LOGIN_REQUEST_START = 'Login@login_reuqest_start'
export const LOGIN_REQUEST_DONE = 'Login@login_reuqest_done'