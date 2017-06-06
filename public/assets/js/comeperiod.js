'use strict';
var num = '20';


$(document).ready(function () {
	// 获取数据
	getCPTableData();
	//数据数目按钮
	$(".dropdown-menu li").click(function () {
		//$('#numbtn').text($(this).text());
		//$("#cptable  tr:not(:first)").empty("");  
		//getCPTableData($(this).text());
		num = $(this).text();
	});
	//确定按钮
	$('#okbtn').click(function () {
		getCPTableData();
	});
	//日期选择
	$('#sdatetimepicker').datetimepicker({
		format: "yyyy-mm-dd hh:ii",
		autoclose: true,
		todayBtn: true,
		language: 'zh-CN',
		pickerPosition: "bottom-left",
		locale: moment.locale('zh-cn')
	});
	$('#edatetimepicker').datetimepicker({
		format: "yyyy-mm-dd hh:ii",
		autoclose: true,
		todayBtn: true,
		language: 'zh-CN',
		pickerPosition: "bottom-left",
		locale: moment.locale('zh-cn')
	});

});


function getCPTableData() {
	var s_date_str = $('#sinput').val().split(' ')[0];
	var e_date_str = $('#einput').val().split(' ')[0];
	var curr_date = new Date();

	if (s_date_str === '' && e_date_str === '') {
		ajaxRequest(num, '', '');
	} else if (s_date_str === '' && e_date_str != '') {
		if (checkDateFormat(e_date_str)) {
			var e_date = new Date(e_date_str);
			if (e_date <= curr_date) {
				ajaxRequest(num, '', e_date_str);
			} else {
				alert('终止日期不应大于当前日期');
			}
		} else {
			alert('数据格式错误');
		}
	} else if (s_date_str != '' && e_date_str === '') {
		if(checkDateFormat(s_date_str)){
			ajaxRequest(num,s_date_str,'');
		}
	} else {
		if (checkDateFormat(s_date_str) && checkDateFormat(e_date_str)) { //检查格式
			var s_date = new Date(s_date_str);
			var e_date = new Date(e_date_str);
			
			if (s_date <= e_date) { //检查起始 终止
				
				if ((s_date <= curr_date) && (curr_date <= e_date)) { //检查起始 当天
					// Ajax请求
					ajaxRequest(num, s_date_str, e_date_str);
					
				} else {
					alert('日期范围有误');
				}
			} else {
				alert('起始日期不应大于终止日期');
			}
		} else {
			alert('数据格式错误');
		}
	}
}

/*向服务器发送ajax请求*/
function ajaxRequest(num_p, s_date_p, e_date_p) {
	$.ajax({
		type: 'post',
		url: '/table/comeperiod.do',
		dataType: 'json',
		data: {
			num: num_p,
			s_date: s_date_p,
			e_date: e_date_p
		}
	}).done(function (data) {
		console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
		setCPTable(data);
	}).fail(function (xhr, status) {

	});
}

function setCPTable(data) {
	var result = data.result;
	var tableDom = "";
	var eachTableDom = "";

	for (let i = 0; i < result.length; i++) {
		eachTableDom = "<tr>" +
			"<td style='text-align: center;'>" + (i + 1) + "</td>" + 　　"<td style='text-align: center;'>" + result[i].mac + "</td>" +
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


/*验证输入*/
function checkDateFormat(input) {
	var reg = /^(\d{1,})-(\d{1,})-(\d{1,})/;
	return reg.test(input);
}