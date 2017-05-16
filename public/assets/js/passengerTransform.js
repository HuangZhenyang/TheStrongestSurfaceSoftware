'use strict';
var myChart = echarts.init(document.getElementById('passengerTransform'));

$(document).ready(function () {
	initMyChart();
});

/*
 *	客流转化图	
 */
function initMyChart() {
	myChart.showLoading();

	$.get('/graph/realTimePassengerflow.do').done(function (data) {
		myChart.hideLoading();
		console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
		myChart.setOption(option = {
			title: {
				text: 'Sankey Diagram'
			},
			tooltip: {
				trigger: 'item',
				triggerOn: 'mousemove'
			},
			series: [
				{
					type: 'sankey',
					layout: 'none',
					data: data.nodes,
					links: data.links,
					itemStyle: {
						normal: {
							borderWidth: 1,
							borderColor: '#aaa'
						}
					},
					lineStyle: {
						normal: {
							color: 'source',
							curveness: 0.5
						}
					}
            }
        ]
		});
	}).fail(function (xhr, status) {
		console.log('失败: ' + xhr.status + ', 原因: ' + status);
	});
}