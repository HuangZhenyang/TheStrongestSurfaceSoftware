'use strict';

$(document).ready(function(){
	getCPTableData();
	$(".dropdown-menu li").click(function(){
    	alert($(this).text());
		getCPTableData($(this).text());
    });
});

function getCPTableData(){
	var num = arguments[0]?arguments[0]:10;
	console.log("num:" + num);
	$.ajax({
		type: 'post',
		url: '/table/comeperiod.do',
		dataType: 'json',
		data:{
			num: num
		}
	}).done(function(data){
		console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
		setCPTable(data);
	})
}

function setCPTable(data){

	var result = data.result;
	var tableDom = "";
	var eachTableDom = "";

	for(let i=0;i<result.length;i++){
		eachTableDom = "<tr>" +
					   "<td style='text-align: center;'>" + (i+1) + "</td>" + 
					　　"<td style='text-align: center;'>" + result[i].mac + "</td>" + 
					   "<td style='text-align: center;'>" + result[i].telbrand + "</td>" + 
					   "<td style='text-align: center;'>" + result[i].comeperiod + "</td>" + 
					   "<td style='text-align: center;'>" + result[i].staytime + "</td>" +
					   "<td style='text-align: center;'>" + result[i].frequency + "</td>" + 
					   "<td style='text-align: center;'>" + result[i].lasttime + "</td>" + 
					   "</tr>"
			
		tableDom += eachTableDom;
	}

	$('#cptable tbody').after(tableDom);
	
}