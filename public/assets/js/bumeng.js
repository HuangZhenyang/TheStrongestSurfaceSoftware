"use strict";
var ledgerFlag = false;
var isUpdateTrade = false;
var pageDone = false;
var pageInterDone = false;
$(function(){
	getNodeCount();
	getUserCount();
	getTradeCount();
	getLedgerSequence();
	renderLedger();
	setInterval(function() {
		if(ledgerFlag) {
			if($(".sequenceTable").children().length >= 6) {
				ledgerFlag = false;
				updateLedgerTab();
			}
		}
	}, 3000);
	renderTrade();
	setInterval(function() {
		if(isUpdateTrade) {
			isUpdateTrade = false;
			updateTrade();
		}
	}, 3000);
	//加载进度条
	$(".progress-strip").animate({'width': '88%'}, 3000);
	var progressInter = setInterval(function(){
		if(pageDone) {
			$(".progress-strip").animate({'width': '100%'}, 200);
			pageInterDone = true;
			clearInterval(progressInter);
		}
	}, 0);
	var pageInter = setInterval(function(){
		if(pageInterDone) {
			$(".progress-wrap").hide();
			clearInterval(pageInter);
		}
	}, 1200);
})
	
//一定周期内用户数量
var getUserCount = function() {
	pageDone = false;
	$.ajax({
		type:"get",
		url:config.bumeng_public + "user/v1/count",
		dataType:"json",
		success:function(returnData) {
			if(returnData.err_code == "0") {
				pageDone = true;
				var total_count = returnData.data.totalCount;
				var set_count = $(".userNum-total").numberAnimate({num:total_count, speed:2000});
				setInterval(function() {
					$.ajax({
						type:"get",
						url:config.bumeng_public + "user/v1/count",
						dataType:"json",
						success:function(returnData) {
							total_count = returnData.data.totalCount;
							set_count.resetData(total_count);
						}
					});
				},2000);
			}
		}
	});
}

//一定周期内交易数量
var getTradeCount = function() {
	pageDone = false;
	$.ajax({
		type:"get",
		url:config.bumeng_public + "transaction/v1/txFrequencyCount",
		dataType:"json",
		success:function(returnData) {
			if(returnData.err_code == "0") {
				pageDone = true;
				var hour_count = returnData.data.hourCount;
				var set_count = $(".tradeNum-24h").numberAnimate({num:hour_count, speed:2000});
				setInterval(function() {
					$.ajax({
						type:"get",
						url:config.bumeng_public + "transaction/v1/txFrequencyCount",
						dataType:"json",
						success:function(returnData) {
							hour_count = returnData.data.hourCount;
							set_count.resetData(hour_count);
						}
					});
				},2000);
			}
		}
	});
}

//当前区块高度
var getLedgerSequence = function() {
	pageDone = false;
	$.ajax({
		type:"get",
		url:config.bumeng_public + "block/v1/history",
		data:{"size":1},
		dataType: "json",
		success: function(returnData) {
			if(returnData.err_code == "0") {
				pageDone = true;
				var ledger_seq = returnData.data[0].ledger_sequence;
				var set_ledger_content_seq = $(".recent-ledger-content").numberAnimate({num:ledger_seq, speed:2000});
				var set_ledger_seq = $(".recent-ledger").numberAnimate({num:ledger_seq, speed:2000});
				setInterval(function(){
					$.ajax({
						type:"get",
						url:config.bumeng_public + "block/v1/history",
						data:{"size":1},
						dataType: "json",
						success: function(returnData) {
							if(returnData.err_code == "0") {
								ledger_seq = returnData.data[0].ledger_sequence;
								set_ledger_content_seq.resetData(ledger_seq);
								set_ledger_seq.resetData(ledger_seq);
							}
						}
					});	
				},2000);
			}
		}
	});	
}

//当前节点数
//var getNodeCount = function() {
//	pageDone = false;
//	$.ajax({
//		type:"get",
//		url:config.bumeng_monitor + "nodes/getNodesInformation",
//		dataType: "json",
//		success:function(returnData){
//			if(returnData.err_code == 0) {
//				pageDone = true;
//				var node_count = returnData.data.length;
//				var set_node_count = $(".node-total-num").numberAnimate({num:node_count, speed:2000});
//				setInterval(function(){
//					$.ajax({
//						type:"get",
//						url:config.bumeng_monitor + "nodes/getNodesInformation",
//						dataType: "json",
//						success: function(data) {
//							node_count = data.data.length;
//							set_node_count.resetData(node_count);
//						}
//					});
//				},2000); 
//			}
//		}
//	});	
//}
var getNodeCount = function() {
	pageDone = false;
	$.ajax({
		type:"get",
		url:config.bumeng_public + "node/v1/nodeList",
		dataType: "json",
		success:function(returnData){
			if(returnData.err_code == 0) {
				pageDone = true;
				var node_count = returnData.data.length;
				var set_node_count = $(".node-total-num").numberAnimate({num:node_count, speed:2000});
				setInterval(function(){
					$.ajax({
						type:"get",
						url:config.bumeng_public + "node/v1/nodeList",
						dataType: "json",
						success: function(data) {
							node_count = data.data.length;
							set_node_count.resetData(node_count);
						}
					});
				},2000); 
			}
		}
	});	
}
//加载区块列表
var renderLedger = function() {
	pageDone = false;
	$.ajax({
		type:"get",
		url:config.bumeng_public + "block/v1/history",
		data:{"size":6},
		dataType: "json",
		success: function(data) {
			if(data.err_code == "0") {
				pageDone = true;
				for(var i = data.data.length - 1; i >= 0; i--) {
					var ledger_seq = data.data[i].ledger_sequence + "";
					var interval = data.data[i].interval;
					var transaction_time = getDate(data.data[i].close_time);
					var timeDate = transaction_time.substring(0, 10);
					var timeCount = transaction_time.substring(11, 19);
					var tx_count = data.data[i].tx_count;
					var hash = data.data[i].block_hash;
					currentLedgerTab(ledger_seq, transaction_time, tx_count, setHashStyle(hash, 40));
					weChatCurrentLedgerTab(ledger_seq, timeDate, timeCount, tx_count, setHashStyle(hash, 24));
				}
				ledgerFlag = true;
			}
		}
	});	
}
//更新区块列表
var updateLedgerTab = function() {
	$.ajax({
		type:"get",
		url:config.bumeng_public + "block/v1/history",
		data:{"size":6},
		dataType: "json",
		success: function(data) {
			if(data.err_code == "0") {
				for(var i = data.data.length - 1; i >= 0; i--) {
					var ledger_seq = data.data[i].ledger_sequence + "";
					if(Number(ledger_seq) > Number($(".sequenceTable").children().eq(0).find("td:first-child").text())) {
						var interval = data.data[i].interval;
						var transaction_time = getDate(data.data[i].close_time);
						var timeDate = transaction_time.substring(0, 10);
						var timeCount = transaction_time.substring(11, 19);
						var tx_count = data.data[i].tx_count;
						var hash = data.data[i].block_hash;
						currentLedgerTab(ledger_seq, transaction_time, tx_count, setHashStyle(hash, 40));
						weChatCurrentLedgerTab(ledger_seq, timeDate, timeCount, tx_count, setHashStyle(hash, 24));
					}
				}
				ledgerFlag = true;
			}			
		},
		error: function() {
			ledgerFlag = true;
		}		
	});
}

//加载最新交易列表
var appIndex = {"阳光保险集团股份有限公司": 0, "上海倾信互联网金融信息服务有限公司": 1, "华安财产保险股份有限公司": 2, "上海仲托网络科技有限公司": 3, "北京众志好活科技有限公司": 4, "北京青云互帮网络科技有限公司": 5, "中山市翔云网络科技发展有限公司": 6, "九一金融信息服务（北京）有限公司": 7, "广州八斗科技软件公司": 8, "上海崇浩投资管理有限公司": 9};
var renderTrade = function() {
	var dataIndex = [];
	pageDone = false;
	$.ajax({
		type:"get",
		url:config.bumeng_public + "transaction/v2/getNewTx4App",
		dataType:'json',
		success:function(returnData){
			if(returnData.err_code == '0') {
				pageDone = true;
				//数据排序
				$.each(returnData.data, function(i, item) {
					var platform_name = item.platform_name;
					if(platform_name != '布比（北京）网络技术有限公司') {
						dataIndex[appIndex[platform_name]] = item;
					}
				});
				//渲染数据
				for(var i = 0; i < dataIndex.length; i++) {
					var platform_name = dataIndex[i].platform_name;
					var appId = dataIndex[i].app_id;
					var	platform_logo = config.bumengLogoSrc + dataIndex[i].platform_logo,
						hash = dataIndex[i].hash,
						tran_time = dataIndex[i].tran_time + '',
						timeDate = getDate(tran_time).substring(0, 10),
						timeCount = getDate(tran_time).substring(10, 19),
						asset_amount = "已隐私保护";
					if(appId == "84b79b341adde491a6649f345fe0797b") {
						privacyWeChatTransactionRecord(platform_logo, timeDate, timeCount, hash);
//						hash = "*******************(已隐私保护)";
						
					} else {
						asset_amount = dataIndex[i].asset_amount;
						weChatTransactionRecord(platform_logo, timeDate, timeCount, setHashStyle(hash, 24), asset_amount, hash);
					}
					tradeModle(appId, platform_logo, hash, setHashStyle(hash, 40), asset_amount, getDate(tran_time));	
				}
				isUpdateTrade = true;
			}
		}
	});
}

//刷新交易列表
var updateTradeData = {};
var updateTrade = function() {
	$.ajax({
		type:"get",
		url:config.bumeng_public + "transaction/v2/getNewTx4App",
		dataType:'json',
		success:function(returnData){
			if(returnData.err_code == '0') {
				for(var i = 0; i < returnData.data.length; i++) {
					var app_id = returnData.data[i].app_id;
					updateTradeData[app_id] = returnData.data[i];
				}
				$.each($("._hash"), function(index, domEle) {
					var appId = $(this).attr("appId"),
						eleHash = $(this).attr("hash"),
						dataJson = updateTradeData[appId],
						tran_time = dataJson.tran_time + '',
						timeDate = getDate(tran_time).substring(0, 10),
						timeCount = getDate(tran_time).substring(11, 19),
						dataHash = dataJson.hash;
					if(appId == "84b79b341adde491a6649f345fe0797b") {
						$(this).parent().find("._hash").attr("hash", dataHash);
						$(this).parent().find("._hash").text(setHashStyle(dataHash, 40));
						$(this).parent().find("._tran_time").text(getDate(dataJson.tran_time + ''));
					} else {
						if(eleHash != dataHash) {
							$(this).parent().fadeOut(200);
							$(this).parent().find("._hash").attr("hash", dataHash);
							$(this).parent().find("._hash").text(setHashStyle(dataHash, 40));
							$(this).parent().find("._asset_amount").text(dataJson.asset_amount);
							$(this).parent().find("._tran_time").text(getDate(dataJson.tran_time + ''));
							$(this).parent().fadeIn(100);
						}
					}
				});
				isUpdateTrade = true;
			}
		}
	});	
}

var tradeModle = function(appId, platform_logo, hash, short_hash, asset_amount, tran_time) {
	if(appId == "84b79b341adde491a6649f345fe0797b") {
		$('.table-trade-wrap table tbody').append(
			'<tr>' +
				'<td>' +
					'<img src="' + platform_logo + '" />' +
				'</td>' +
				'<td class="_hash" appId="' + appId + '" hash="' + hash + '">' + short_hash + '</td>' +
				'<td class="_asset_amount private-protect">已隐私保护</td>' +
				'<td class="_tran_time">' + tran_time + '</td>' +
			'</tr>'
		);
	} else {
		$('.table-trade-wrap table tbody').append(
			'<tr>' +
				'<td>' +
					'<img src="' + platform_logo + '" />' +
				'</td>' +
				'<td class="_hash" appId="' + appId + '" hash="' + hash + '">' + short_hash +'</td>' +
				'<td class="_asset_amount">' + asset_amount +'</td>' +
				'<td class="_tran_time">' + tran_time +'</td>' +
			'</tr>'
		);
	}	
}

//时间转码
function getDate(targetDate) {
	var _date = targetDate.substring(0, 10);
	var getDate = new Date(_date*1000) + "";
	var _getDate = new Date(_date*1000);
	var dateArr = getDate.split(" ");
	switch(dateArr[1]) {
		case "Jan":
			dateArr[1] = 1;
			break;
		case "Feb":
			dateArr[1] = 2;
			break;
		case "Mar":
			dateArr[1] = 3;
			break;
		case "Apr":
			dateArr[1] = 4;
			break;
		case "May":
			dateArr[1] = 5;
			break;
		case "Jun":
			dateArr[1] = 6;
			break;
		case "Jul":
			dateArr[1] = 7;
			break;
		case "Aug":
			dateArr[1] = 8;
			break;
		case "Sep":
			dateArr[1] = 9;
			break;
		case "Oct":
			dateArr[1] = 10;
			break;
		case "Nov":
			dateArr[1] = 11;
			break;
		case "Dec":
			dateArr[1] = 12;
			break;
	}
	var rdate = _getDate.getFullYear() + "-" + timeDouble(dateArr[1]) + "-" + timeDouble(dateArr[2]) + " " + timeDouble(_getDate.getHours()) + ":" + timeDouble(_getDate.getMinutes()) + ":" + timeDouble(_getDate.getSeconds());
	return rdate;
}
//时间格式调整
function timeDouble(num) {
	var time = num + "";
	var numLen = time.length;
	if(numLen < 2) {
		time = "0" + time;
	}
	return time;
}
//数字格式
var formatNum = function(str) {
	var newStr = "";
	var count = 0;
	for(var i=str.length-1;i>=0;i--){
	 	if(count % 3 == 0 && count != 0){
	   		newStr = str.charAt(i) + "," + newStr;
	 	}else{
	   		newStr = str.charAt(i) + newStr;
	 	}
 		count++;
   	}
   	str = newStr;
   	return str;
}
//hash掩码
var setHashStyle = function(str, len) {
	var hashStyle = str.substring(0, len);
	var hash = hashStyle + "...";
	return hash;
}

//数字格式化
var formatNum = function(str) {
	var _str = str + "";
	var newStr = "";
	var count = 0;
	for(var i=_str.length-1;i>=0;i--){
	 	if(count % 3 == 0 && count != 0){
	   		newStr = _str.charAt(i) + "," + newStr;
	 	}else{
	   		newStr = _str.charAt(i) + newStr;
	 	}
 		count++;
   	}
   	_str = newStr;
   	return _str;
}
//区块高度列表
var currentLedgerTab = function(currentLedger, transaction_time, tx_count, hash) {
	$(".sequenceTable").prepend("<tr>" + 
								"<td class='_currentLedger'>" + currentLedger + "</td>" + 
								"<td>" + hash + "</td>" + 
								"<td>" + tx_count + "</td>" + 
//								"<td>" + interval + "</td>" + 
								"<td>" + transaction_time + "</td>" +
							"</tr>");
	$(".sequenceTable >tr").first().fadeOut();
	$(".sequenceTable >tr").first().fadeIn(500);
	if($(".sequenceTable >tr").length >6){
		$(".sequenceTable >tr").last().fadeOut(200,function(){
			$(".sequenceTable >tr").last().detach();
		});		
	}
}
//移动端区块高度
var weChatCurrentLedgerTab = function(currentLedger, timeDate, timeCount, tx_count, hash) {
	$(".blockTable-box").prepend(
						'<div class="mesgTableContent">' +
							'<div class="clear-fix">' +
								'<div class="_block">' +
									'<div>区块高度</div>' +
									'<div>' + currentLedger + '</div>' +
								'</div>' +
								'<div class="timeBlock">' +
									'<div class="clear-fix">' +
										'<img src="images/timeIcon.png" class="tradeTime" alt="时间" />' +
										'<div class="timeYear">' + timeDate + '</div>' +
									'</div>' +
									'<div class="time-count">' + timeCount + '</div>' +
								'</div>' +
							'</div>' +
							'<div class="mesgTitle-box clear-fix">' +
								'<div class="mesgTitle">区块hash</div>' +
								'<div class="mesgTitle">交易笔数</div>' +
							'</div>' +
							'<div class="mesgInfo-box clear-fix">' +
								'<div class="mesgInfo">' + hash + '</div>' +
								'<div class="mesgInfo">' + tx_count + '</div>' +
							'</div>' +
						'</div>'
								);	
}

function privacyWeChatTransactionRecord(merLogo, timeDate, timeCount, fullhash) {
	var hash = fullhash;
	$(".tradeTable-box").append(
						'<div class="mesgTableContent">' +
							'<div class="clear-fix">' +
								'<img src="' + merLogo + '" class="merLogo" />' +
								'<div class="timeBlock">' +
									'<div class="clear-fix">' +
										'<img src="images/timeIcon.png" class="tradeTime" alt="时间" />' +
										'<div class="timeYear">' + timeDate + '</div>' +
									'</div>' +
									'<div class="time-count">' + timeCount + '</div>' +
								'</div>' +
							'</div>' +
							'<div class="mesgTitle-box clear-fix">' +
								'<div class="mesgTitle">交易hash</div>' +
								'<div class="mesgTitle">交易量</div>' +
							'</div>' +
							'<div class="mesgInfo-box clear-fix">' +
								'<div class="mesgInfo">' + setHashStyle(hash, 24) + '</div>' +
								'<div class="mesgInfo privacy-content">已隐私保护</div>' +
							'</div>' +
							'<div class="wechat_hash">' + hash + '</div>' + 
						'</div>'
								);	
}

//移动端交易列表
function weChatTransactionRecord(merLogo, timeDate, timeCount, hash, asset_amount, fullhash) {
	$(".tradeTable-box").append(
						'<div class="mesgTableContent">' +
							'<div class="clear-fix">' +
								'<img src="' + merLogo + '" class="merLogo" />' +
								'<div class="timeBlock">' +
									'<div class="clear-fix">' +
										'<img src="images/timeIcon.png" class="tradeTime" alt="时间" />' +
										'<div class="timeYear">' + timeDate + '</div>' +
									'</div>' +
									'<div class="time-count">' + timeCount + '</div>' +
								'</div>' +
							'</div>' +
							'<div class="mesgTitle-box clear-fix">' +
								'<div class="mesgTitle">交易hash</div>' +
								'<div class="mesgTitle">交易量</div>' +
							'</div>' +
							'<div class="mesgInfo-box clear-fix">' +
								'<div class="mesgInfo">' + hash + '</div>' +
								'<div class="mesgInfo">' + asset_amount + '</div>' +
							'</div>' +
							'<div class="wechat_hash">' + fullhash + '</div>' + 
						'</div>'
								);	
}