'use strict';

/*
 * 变量
 */
var myChart1 = echarts.init(document.getElementById('realTimePassengerFlow'));
var myChart2 = echarts.init(document.getElementById('passengerFlow'));
var myChart3 = echarts.init(document.getElementById('enterFlow'));

// 图表数据： [{value:["2/4",121]},{value:["3/4",22]}]
var pfData = [];
var maxNumP = ["", 0]; //最大客流量值 [0]为时间，[1]为数据
var maxNumE = ["", 0]; //最大入店量值 [0]为时间，[1]为数据
var temp = 0;
var date = null;

$(document).ready(function () {
	initPFChart();
	initHeadChart();
});

/*
 * 实时客流图
 */

function initPFChart() {
	/*
	function randomData() {
		now = new Date(+now + oneDay);
		value = value + Math.random() * 21 - 10;
		return {
			//name: now.toString(),
			value: [
            	[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
				Math.round(value)
        	]
		}

	}


	var now = +new Date(1997, 9, 3);
	var oneDay = 24 * 3600 * 1000;
	var value = Math.random() * 1000;
	for (var i = 0; i < 10; i++) {
		data.push(randomData());
	}*/

	var option = {
		title: {
			text: ''
		},
		tooltip: {
			trigger: 'axis',
			formatter: function (params) {
				params = params[0];
				//var date = new Date(params.name);
				//return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
				date = new Date(params.value[0]);
				return date.toLocaleDateString() + ':' + params.value[1];

			},
			axisPointer: {
				animation: false
			}
		},
		xAxis: {
			type: 'time',
			splitLine: {
				show: false
			}
		},
		yAxis: {
			type: 'value',
			boundaryGap: [0, '100%'],
			splitLine: {
				show: false
			}
		},
		series: [{
			name: '模拟数据',
			type: 'line',
			showSymbol: false,
			hoverAnimation: false,
			data: pfData
    }]
	};

	myChart1.setOption(option);

	setInterval(function () {
		$.ajax({
			type: 'get',
			url: '/graph/realTimePassengerflow.do',
			dataType: 'json',
		}).done(function (data) {
			//console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
			setMax(data); //设置最大值

			pfData.push(data.p);
			myChart1.setOption({
				series: [{
					data: pfData
        		}]
			});

			setHeadChart(data); //设置顶部的图
			setTable(data); // 设置表格数据
		}).fail(function (xhr, status) {
			console.log('失败: ' + xhr.status + ', 原因: ' + status);
		});
	}, 5000);
}

//初始化顶部二图
function initHeadChart() {
	var option2 = {
		tooltip: {
			formatter: "{c}"
		},
		toolbox: {
			feature: {
				restore: {},
				saveAsImage: {}
			}
		},
		series: [
			{
				name: '客流量',
				type: 'gauge',
				detail: {
					formatter: '{value}'
				},
				data: [{
					value: 0,
					name: '客流量'
					}]
			}
    	]
	};
	myChart2.setOption(option2);

	var option3 = {
		tooltip: {
			formatter: "{c}"
		},
		toolbox: {
			feature: {
				restore: {},
				saveAsImage: {}
			}
		},
		series: [
			{
				name: '入店量',
				type: 'gauge',
				detail: {
					formatter: '{value}'
				},
				data: [{
					value: 0,
					name: '入店量'
					}]
			}
    	]
	};
	myChart3.setOption(option3);
}
//设置顶部二图
function setHeadChart(data) {

	myChart2.setOption({
		series: [
			{
				max: maxNumP[1],
				data: [{
						value: parseInt(data.p.value[1]),
						name: '客流量'
					}
				]
			}
		]
	});

	myChart3.setOption({
		series: [
			{
				max: maxNumE[1],
				data: [{
						value: parseInt(data.e),
						name: '入店量'
					}
				]
			}
		]
	});
}

function setMax(data) {
	date = new Date(data.p.value[0]);
	
	if (parseInt(data.p.value[1]) > maxNumP[1]) {
		maxNumP[0] = date.toLocaleDateString();
		maxNumP[1] = parseInt(data.p.value[1]);
	}
	if (parseInt(data.e) > maxNumE[1]) {
		maxNumE[0] = date.toLocaleDateString();
		maxNumE[1] = parseInt(data.e);
	}
	$('#maxP').text(maxNumP[1] + "(" + maxNumP[0] + ")");
	//$('#maxE').text(maxNumE[1] + "(" + maxNumE[0] + ")");
}

function setTable(data){
	var tableDom = "";
	var eachTableDom = "";
	date = new Date(data.p.value[0]);
	eachTableDom = "<tr>" + 
				   "<td style='text-align: center;'>" + date.toLocaleDateString() + "</td>" + 
				   "<td style='text-align: center;'>" + data.p.value[1] + "</td>" +
				　　"<td style='text-align: center;'>" + data.e  + "</td>" + 
				   "</tr>";
	if(document.getElementById("datatable").rows.length === 8){
		$('#datatable tr:gt(0):eq(0)').remove();
	}
	$('#datatable tr:last').after(eachTableDom);
	if(temp < maxNumP[1]){ //上升，图标是下降的时候换成上升图标
		//设置图标
		if($('#pi').hasClass('fa-level-down')){
			$('#pi').removeClass('fa-level-down');
			$('#pi').addClass('fa-level-up');
		}
	}else if(temp > maxNumP[1]){ //下降，图标是上升的时候才需要换成下降图标
		if($('#pi').hasClass('fa-level-up')){
			$('#pi').removeClass('fa-level-up');
			$('#pi').addClass('fa-level-down');
		}
		
	}
	temp = maxNumP[1];
	//console.log( document.getElementById("datatable").rows.length);
}





/*

function randomData() {

	now = new Date(+now + oneDay);
	value = value + Math.random() * 21 - 10;
	return {
		//name: now.toString(),
		value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
			Math.round(value)
        ]
	}

}

var data = [];
var now = +new Date(1997, 9, 3);
var oneDay = 24 * 3600 * 1000;
var value = Math.random() * 1000;
for (var i = 0; i < 10; i++) {
	data.push(randomData());
}

var option = {
	title: {
		text: '动态数据 + 时间坐标轴'
	},
	tooltip: {
		trigger: 'axis',
		formatter: function (params) {

			params = params[0];
			//console.log("params value " + params.value);
			//console.log("params value[0] " + params.value[0]);
			//console.log("params value[1] " + params.value[1]);
			var date = new Date(params.name);
			return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];

		},
		axisPointer: {
			animation: false
		}
	},
	xAxis: {
		type: 'time',
		splitLine: {
			show: false
		}
	},
	yAxis: {
		type: 'value',
		boundaryGap: [0, '100%'],
		splitLine: {
			show: false
		}
	},
	series: [{
		name: '模拟数据',
		type: 'line',
		showSymbol: false,
		hoverAnimation: false,
		data: data
    }]
};

myChart.setOption(option);

setInterval(function () {

	for (var i = 0; i < 5; i++) {
		data.shift();
		data.push(randomData());

	}

	myChart.setOption({
		series: [{
			data: data
        }]
	});
}, 10000);

console.log(data);
*/