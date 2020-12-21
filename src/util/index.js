import {message} from 'antd'
class Storage{
	constructor(name){
		this.name = 'storage';
	}
	//设置缓存
	setItem(params){
		let obj = {
			name:'',
			value:'',
			expires:"",
			startTime:new Date().getTime()//记录何时将值存入缓存，毫秒级
		}
		let options = {};
		//将obj和传进来的params合并
		Object.assign(options,obj,params);
		if(options.expires){
		//如果options.expires设置了的话
		//以options.name为key，options为值放进去
			window.localStorage.setItem(options.name,JSON.stringify(options));
		}else{
		//如果options.expires没有设置，就判断一下value的类型
			   let type = Object.prototype.toString.call(options.value);
			   //如果value是对象或者数组对象的类型，就先用JSON.stringify转一下，再存进去
			if(Object.prototype.toString.call(options.value) == '[object Object]'){
				options.value = JSON.stringify(options.value);
			}
			if(Object.prototype.toString.call(options.value) == '[object Array]'){
				options.value = JSON.stringify(options.value);
			}
			window.localStorage.setItem(options.name,options.value);
		}
	}
	//拿到缓存
	getItem(name){
			let item = window.localStorage.getItem(name);
			//先将拿到的试着进行json转为对象的形式
			if(item){
				try{
					item = JSON.parse(item);
				}catch(error){
				//如果不行就不是json的字符串，就直接返回
					item = item;
				}
				//如果有startTime的值，说明设置了失效时间
				if(item.startTime){
					let date = new Date().getTime();
					//何时将值取出减去刚存入的时间，与item.expires比较，如果大于就是过期了，如果小于或等于就还没过期
					if(date - item.startTime > item.expires){
					//缓存过期，清除缓存，返回false
						window.localStorage.removeItem(name);
						window.location.href = '/paltform/login'  
						// return false;
					}else{
					//缓存未过期，返回值
						return item.value;
					}
				}else{
				//如果没有设置失效时间，直接返回值
					return item.value;
				}
			}else{
				return null
			}			
		
	}
	//移出缓存
	removeItem(name){
		window.localStorage.removeItem(name);
	}
	//移出全部缓存
	clear(){
		window.localStorage.clear();
	}
}

let storage = new Storage();
export const setItem = (itemData)=>{//设置缓存
	storage.setItem(itemData)
}
export const getItem = (name)=>{//获取缓存
	return storage.getItem(name)
}
export const removeItem = (name)=>{//删除缓存
	storage.removeItem(name)
}
export const formatMoney=(value)=> {//处理金额	
	var param = {};
	var k = 10000,
		sizes = ['', '万','亿'],
		i;
		if(value < k){
			value = parseFloat((value + "").replace(/[^\d\.-]/g, "")).toFixed(2) + ""; //将金额转成比如 123.45的字符串
			var valueArr = value.split(".")[0].split("").reverse() //将字符串的数变成数组
			const valueFloat = value.split(".")[1]; // 取到小数点后的值
			let valueString = "";
			for (let i = 0; i < valueArr.length; i++) {
				valueString += valueArr[i] + ((i + 1) % 3 == 0 && (i + 1) != valueArr.length ? "," : ""); //循环 取数值并在每三位加个','
			}
			const money = valueString.split("").reverse().join("") + "." + valueFloat; //拼接上小数位
			param.value = money
			param.unit=''
		}else{
			i = Math.floor(Math.log(value) / Math.log(k));
			param.value = ((value / Math.pow(k, i))).toFixed(2);
			param.unit = sizes[i];			
		}
	
	return "￥"+param.value + param.unit;
}

export const formatNUmber=(value)=> {//处理数字	
	var param = {};
	var k = 10000,
		sizes = ['', '万','亿'],
		i;
		if(value < k){
			value = parseFloat((value + "").replace(/[^\d\.-]/g, "")).toFixed(2) + ""; //将金额转成比如 123.45的字符串
			var valueArr = value.split(".")[0].split("").reverse() //将字符串的数变成数组
			const valueFloat = value.split(".")[1]; // 取到小数点后的值
			let valueString = "";
			for (let i = 0; i < valueArr.length; i++) {
				valueString += valueArr[i] + ((i + 1) % 3 == 0 && (i + 1) != valueArr.length ? "," : ""); //循环 取数值并在每三位加个','
			}
			const values = valueString.split("").reverse().join("") + "." + valueFloat; //拼接上小数位
			param.value = values
			param.unit=''
		}else{
			i = Math.floor(Math.log(value) / Math.log(k));
			param.value = ((value / Math.pow(k, i))).toFixed(2);
			param.unit = sizes[i];			
		}
	
	return param.value + param.unit;
}

export const ErrorMessage = ()=>{//处理后台失败信息
	message.error('服务器返回数据失败，请稍后重试~')
}


export const judgeTime = ()=>{
	const now = new Date(),hour = now.getHours() 
	if(hour < 6){return"凌晨好！"} 
	else if (hour < 9){return"早上好！"} 
	else if (hour < 12){return"上午好！"} 
	else if (hour < 14){return"中午好！"} 
	else if (hour < 17){return"下午好！"} 
	else if (hour < 19){return"傍晚好！"} 
	else if (hour < 22){return"晚上好！"} 
	else {return"你好！"} 
}

export const cutImageUrl = (imgUrl) =>{
	return imgUrl.substr(imgUrl.indexOf(":")+1)
}

export const JudgeDataSource = (dataSource)=>{
	if(dataSource == '中国图书网'){
		return 'http://www.bookschina.com/'
	}else if(dataSource == '豆瓣图书'){ 
		return 'https://book.douban.com'
	}else if(dataSource == '当当网'){
		return 'http://www.dangdang.com'
	}else if(dataSource == '京东图书'){
		return 'https://www.jd.com'
	}else if(dataSource == 'RAYS图书'){
		return 'https://rays.5rs.me/'
	}else if(dataSource == '中国图书库'){
		return 'http://www.cnpub.com.cn'
	}else if(dataSource == '开卷网'){
		return 'http://www.openbookdata.com.cn'
	}else{
		return null
	}
}
export const JudgeWeb = (web)=>{
	if(web == 'http://www.bookschina.com/'){
		return '中国图书网'
	}else if(web == 'https://book.douban.com'){ 
		return '豆瓣图书'
	}else if(web == 'http://www.dangdang.com'){
		return '当当网'
	}else if(web == 'https://www.jd.com'){
		return '京东图书'
	}else if(web == 'https://rays.5rs.me/'){
		return 'RAYS图书'
	}else if(web == 'http://www.cnpub.com.cn'){
		return '中国图书库'
	}else if(web == 'http://www.openbookdata.com.cn'){
		return '开卷网'
	}
}
export const TransformUrl = (url)=>{	
	let Reg =/'.hoguu.com:18000'/ig
	if(Reg.test(url)){
		let newUrl = url.replace(Reg,``)
		let reg = new RegExp('http://','ig')
		let returnUrl = newUrl.replace(reg,`https://file.raysgo.com/oss/imgdownload/`)
		return returnUrl;
	}else{
		return url;
	}		
}




