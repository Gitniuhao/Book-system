/*
 * @Author: 牛皓
 * @Date: 2020-08-10 18:20:30
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-03 09:23:39
 * @FilePath: \Book-system\src\api\config.js
 */
export const SERVER = 'http://192.168.10.75:8980'
// export const SERVER =  process.env.NODE_ENV === 'development' ?'http://192.168.10.75:8060' : window.location.origin + '/raysbi'

export const API_CONFIG = {
	login:          	 ['/api/rays/login','post'],
	logout:          	 ['/api/rays/logout','post'],
	register:			 ['/api/rays/register','post'],
	// getBookList:		  ['/bi/bookStd/list','get'],
}