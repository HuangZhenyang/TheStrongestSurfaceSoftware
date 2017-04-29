"use strict";

/*
* 实时（每隔很短的时间向服务器请求数据）
*/
var passengerFlowData = []; //用于存取数据 [['1997/07/06', 626],['1992/01/06',677]]

$(function(){
	setInterval(function(){
		getPassengerFlowData();
	},3000);
})

var getPassengerFlowData = function(){
	$.ajax({
		type:"get",
		url:"passengerFlowData.do",
		dataType:"json",
		
	}).done((data)=>{
		//data: {time:'1997/05/07',value:753}
		console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
		var result = data;
		var tempList = [];
		tempList.push(result.time);
		tempList.push(result.value);
		passengerFlowData.push(tempList);
	}).fail((xhr, status)=>{
		console.log('失败: ' + xhr.status + ', 原因: ' + status);
	});
}