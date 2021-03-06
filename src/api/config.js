/*
 * @Author: 牛皓
 * @Date: 2020-08-10 18:20:30
 * @LastEditors: 牛皓
 * @LastEditTime: 2021-04-14 13:38:30
 * @FilePath: \BookSystem\src\api\config.js
 */
export const SERVER =  process.env.NODE_ENV === 'development' ? 'http://192.168.10.75:8980' : window.location.origin

export const API_CONFIG = {
	login:          	 ['/api/rays/login','post'],
	logout:          	 ['/api/rays/logout','post'],
	register:			 ['/api/rays/register','post'],
	// getBookList:		  ['/bi/bookStd/list','get'],
}