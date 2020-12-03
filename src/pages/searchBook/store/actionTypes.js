/*
 * @Author: 牛皓
 * @Date: 2020-11-27 10:47:01
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-01 16:55:01
 * @FilePath: \Book-system\src\pages\searchBook\store\actionTypes.js
 */
//action的type即使组件内和reducer内不相同页不会报错，抽取出来重新赋值可以避免这种错误并且促会错会报错容易修改
export const SET_BOOK_LIST = "searchBook@book_list"
export const SET_BOOK_DETAIL = "searchBook@book_detail"
export const PAGE_REQUEST_START = "searchBoo@page_request_start"
export const PAGE_REQUEST_DONE = "searchBoo@page_request_done"
