'use strict';
var tableDom = "";
/*
 * 请求阈值
 */
$(document).ready(function () {
	$.ajax({
		type: 'get',
		url: '/data/getthreshold.do',
		dataType: 'json',
	}).done(function (data) {
		console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
		setThreshold(data);
	}).fail(function (xhr, status) {
		console.log('失败: ' + xhr.status + ', 原因: ' + status);
	});
});


function setThreshold(data) {
	var activity = data.activity;
	var deepjump = data.deepjump;

	setActivity(activity);
	setDeepJump(deepjump);

}

function setActivity(activity) {
	tableDom = "<tr>" +
		"<td>" + activity.h_m + "天/次（当前）</td>" +
		"<td>" + activity.m_l + "天/次（当前）</td>" +
		"<td>" + activity.l_s + "天/次（当前）</td>" +
		"</tr>";
	$('#activitytable tr:first').after(tableDom);

}

function setDeepJump(deepjump) {
	tableDom = "<tr>" +
		"<td>" + secondToFormat(deepjump.deep) + "（当前）</td>" +
		"<td>" + secondToFormat(deepjump.jump) + "（当前）</td>" +
		"</tr>";
	$('#deepjumptable tr:first').after(tableDom);
}

/*
 * 阈值设置
 */

function btn1Func() {
	var h_m = parseInt($('#h_m_text').val());
	var m_l = parseInt($('#m_l_text').val());
	var l_s = parseInt($('#l_s_text').val());
	if (checkIsNum(h_m) && checkIsNum(m_l) && checkIsNum(l_s)) {
		$.ajax({
			type: 'post',
			url: '/config/thresholdhmls.do',
			dataType: 'json',
			data: {
				h_m: h_m,
				m_l: m_l,
				l_s: l_s
			}
		}).done(function (data) {
			console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
			var result = data;
			if (result.result === "true") {
				$('#btn1Tip').text("配置成功");
				$('#activitytable tr:gt(0):eq(0)').remove();
				setActivity({
					h_m: h_m,
					m_l: m_l,
					l_s: l_s
				});

			}
		}).fail(function (xhr, status) {
			console.log('失败: ' + xhr.status + ', 原因: ' + status);
			$('#btn1Tip').text("配置失败");
		});
	}

}

function btn2Func() {
	var deep = $('#deep_text').val();
	var jump = $('#jump_text').val();
	var deep_sec = 0;
	var jump_sec = 0;
	var temp = [];

	if (checkFormat(deep) && checkFormat(jump)) {
		/*
		 * 转化为秒
		 */
		temp = deep.split("-");
		deep_sec = 3600 * parseInt(temp[0]) + 60 * parseInt(temp[1]) + parseInt(temp[2]);
		temp = jump.split("-");
		jump_sec = 3600 * parseInt(temp[0]) + 60 * parseInt(temp[1]) + parseInt(temp[2]);

		$.ajax({
			type: 'post',
			url: '/config/thresholddj.do',
			dataType: 'json',
			data: {
				deep: deep_sec,
				jump: jump_sec
			}
		}).done(function (data) {
			console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
			var result = data;
			if (result.result === "true") {
				$('#btn2Tip').text("配置成功");
				$('#deepjumptable tr:gt(0):eq(0)').remove();
				setDeepJump({
					deep: deep_sec,
					jump: jump_sec
				});
			}

		}).fail(function (xhr, status) {
			$('#btn2Tip').text("配置失败");
		});
	}
}


/*
 * Check Function
 */
function checkIsNum(input) {
	var reg = /^\d{1,}$/;
	return reg.test(input);
}

function checkFormat(input) {
	var reg = /^(\d{1,})-(\d{1,})-(\d{1,})/;
	return reg.test(input);
}

function secondToFormat(data) {
	var h = "";
	var m = "";
	var s = "";
	data = parseInt(data);
	
	if(Math.floor(data / 3600) === 0){ // < 一小时
		if(Math.floor(data / 60) === 0){ // <一分钟
			return data;
		}else{ // 一分钟 < data < 一小时
			m = Math.floor(data / 60);
			s = data - 60*m;
			return "0-"+m+"-"+s;
		}
	}else{ // > 一小时
		h = Math.floor(data / 3600);
		m = Math.floor((data - h*3600) / 60);
		s = data - h*3600 - m*60;
		return h + "-" + m + "-" + s;
	}
}