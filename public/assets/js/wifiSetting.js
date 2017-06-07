'use strict';

/*
 * 变量
 */
var myChart = echarts.init(document.getElementById('realTimePassengerFlow'));
 // 图表数据： [{value:["2/4",121]},{value:["3/4",22]}]
var pfData = [];

$(document).ready(function () {
	initPFChart();
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
			text: '动态数据 + 时间坐标轴'
		},
		tooltip: {
			trigger: 'axis',
			formatter: function (params) {
				params = params[0];
				//var date = new Date(params.name);
				//return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
				var d = new Date(params.value[0]);
				return '(' + d.toLocaleFormat().split(' ')[1] + '，' + params.value[1] + ')';

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

	myChart.setOption(option);

	setInterval(function () {
		$.ajax({
			type: 'get',
			url: '/graph/realTimePassengerflow.do',
			dataType: 'json',
		}).done(function (data) {
			console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
			pfData.push(data);
			myChart.setOption({
				series: [{
					data: pfData
        		}]
			});
				
			console.log(pfData);
		}).fail(function (xhr, status) {
			console.log('失败: ' + xhr.status + ', 原因: ' + status);
            myChart.setOption({
                series: [{
                    data: pfData
                }]
            });
		});


	}, 5000);

	
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