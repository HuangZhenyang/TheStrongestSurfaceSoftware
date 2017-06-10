var lastData;
var lastQuery = "";
var prevQuery = "";
function parseDateRange(min, max, XAxis, renew){
	if(renew){
		if($("#sel_type").val() == 'D'){
			var dayMin = 999;
			var dayMax = 0;
			$("#sel_area option").each(function(){
				var time = $(this).attr('time');
				if(time && time!="null"){
					time = time.split("-");
					var start = ~~time[0].split(':')[0];
					var end = ~~time[1].split(':')[0];
					dayMin = Math.min(start, dayMin);
					dayMax = Math.max(end, dayMax);
				}
			});
			dayMin = Math.max(min, dayMin);
			dayMax = Math.min(max, dayMax+1);
			if(dayMax < dayMin) dayMax = 24;
			min = dayMin;
			max = dayMax;
			for(var i=dayMin; i<dayMax; i++){
				html+="<option value="+i+">" + XAxis[i] + "</option>";
			}
		}else{
			var html = "";
			for(var i=0; i<XAxis.length; i++){
				html+="<option value="+i+">" + XAxis[i] + "</option>";
			}
			if(!html){
				html = "<option value=-1>-</option>";
			}
		}
		$("#sel_start").html(html);
		$("#sel_end").html(html);
		$("#sel_start").val(min);
		$("#sel_end").val(max-1);
	}
	return {XAxis: XAxis.slice(min, max), min: min, max: max};
}
$(function(){
	if(!window.TIME_RANGE_ON_SERVER){
	  	$("#sel_start").change(function(){
	  		if($("#sel_start")[0].selectedIndex > $("#sel_end")[0].selectedIndex){
	  			$("#sel_start")[0].selectedIndex = $("#sel_end")[0].selectedIndex;
	  		}
	  		render(lastData);
	  	});
		$("#sel_end").change(function(){
			if($("#sel_start")[0].selectedIndex > $("#sel_end")[0].selectedIndex){
	  			$("#sel_end")[0].selectedIndex = $("#sel_start")[0].selectedIndex;
	  		}
	  		render(lastData);
		});
	}
    $(window).resize(function(){
    	if(window.render){
    		render(lastData);
    	}
    });
    window.divDesc = $(".split-bar-title:contains(详细数据)");
})

window.setInterval(function(){
	if(window.echarts||window.NO_ECHARTS){
		checkTime();
		var query = getQuery();
		if(lastQuery!=query){
			if(prevQuery == query){
				loadData();
				if(window.COMMENT_TYPE){
					resumeComment();
				}
			}
			prevQuery = query;
		}
	}
}, 300);

function updateDesc(){
	var type = $("#sel_type").val();
	var year = $("#timeYear").val();
	var month = $("#timeMonth").val();
	var week = $("#timeWeek").val();
	var time = $("#time").val();
	if(i18nLang=='en'){
		switch(type){
		case "Y":
		  window.divDesc.html(year+" Detailed Data");
		  break;
		case "M":
		  window.divDesc.html(year+"-"+month+" Detailed Data");
		  break;
		case "D":
		  window.divDesc.html(year+"-"+month+"-"+time.split("-")[2]+" Detailed Data");
		  break;
		case "W":
			window.divDesc.html(year+"-"+week.split("-")[1]+"W Detailed Data");
		  query+= year + "-" + week;
		}
	}else{
		switch(type){
		case "Y":
		  window.divDesc.html(year+"年-详细数据");
		  break;
		case "M":
		  window.divDesc.html(year+"年"+month+"月-详细数据");
		  break;
		case "D":
		  window.divDesc.html(year+"年"+month+"月"+time.split("-")[2]+"日-详细数据");
		  break;
		case "W":
			window.divDesc.html(year+"年 第"+week.split("-")[1]+"周-详细数据");
		  query+= year + "-" + week;
		}
	}
}

function checkTime(){
	if(window.sysdate){
		var date = sysdate.split("-");
		date[0] = ~~date[0];
		date[1] = ~~date[1];
		date[2] = ~~date[2];
		//2014 1
		//2015 1
		if($("#timeYear").val() > date[0]){
			$("#timeYear").val(date[0]);
			if($("#timeMonth").val() > date[1]){
				$("#timeMonth").val(date[1]);
			}
		}else if($("#timeYear").val() == date[0]){
			if($("#timeMonth").val() > date[1]){
				$("#timeMonth").val(date[1]);
			}
		}
		if($("#time").val() > sysdate){
			$("#time").val(sysdate);
		}
	}
}
$(function(){
	if(!window.COMMENT_TYPE){
		return;
	}

	var comment_split = 
	'<div class="split-bar">\
		<div class="split-bar-title">活动备注</div>\
		<div class="split-bar-line"></div>\
	</div>\
	<div style="margin-top:20px;" class="stat-table-header"><img src="bs-images/table-min.png" class="stat-table-button" id="stat-table-button" /></div>';
	
	var comment_footer = 
	'<div class="stat-table-footer" id="stat-table-footer">\
		<div class="stat-table-footer-inner">\
		</div>\
	</div>';
	
	var dialog = $("<div style='font-size:12px;'><span>备注内容：</span><textarea style='margin-top:5px;width:98%;height:150px;'></textarea></div>");
	////////////////
	var body = $(".stat-form");
	//body.css('position','relative');
	var link = $("<div class='comment-button' style='float:right;right:10px;margin-top:9px;margin-right:5px;margin-left:20px;'><a style='color:#000;' href='javascript:addComment();'>添加备注</a></div>");
	body.prepend(link);
	var icon = $("<div class='comment-button' style='float:right;right:10px;margin-top:7px;'><a href='javascript:addComment();'><img src='images/icon/Comment-None.png' /></a></div>");
	body.prepend(icon);
	var oldSrc = '';
	var img = icon.find('img')[0];
	link.mouseover(function(){
		oldSrc = img.src;
		img.src = 'images/icon/Comment.png';
	});
	link.mouseout(function(){
		img.src = oldSrc;
	});
	icon.mouseover(function(){
		oldSrc = img.src;
		img.src = 'images/icon/Comment.png';
	});
	icon.mouseout(function(){
		img.src = oldSrc;
	});
//	//////////////
	function getCommentParams(){
		var type = $("#sel_type").val();
		var area = $("#sel_area").val()||window.COMMENT_ENTITY;
		var query = "area="+area+"&term="+type+"&stype="+window.COMMENT_TYPE+"&time=";

		return query + getTime();
	}
	
	function getTime(){
		var query = "";
		var type = $("#sel_type").val();
		var year = $("#timeYear").val();
		var month = $("#timeMonth").val();
		var week = $("#timeWeek").val();
		var time = $("#time").val();
		
	    if (month < 10) month = "0" + month;
		switch(type){
		case "Y":
		  query += year + "-01-01";
		  break;
		case "M":
		  query+= year+"-"+month + "-01";
		  break;
		case "D":
		  query+= time;
		  break;
		case "W":
		  query+= year + "-" + week;
		}
		return query;
	}
	
	window.resumeComment = function(){
		if($("#sel_type").val()!='D'){
			link.hide();
			icon.hide();
		}else{
			link.show();
			icon.show();
		}
		icon.find("img").attr('src','images/icon/Comment-None.png');
		dialog.find("textarea").val('');
		var query = getCommentParams();
		$("#comment-table-body").html('');
		var html = "<table id='comment-table' class='tablesorter'><thead><tr><th>序号</th><th>时间</th><th>备注内容</th></tr></thead><tbody>";
		$.ajax({
			url : "get-comment.do",
			data : query,
			type : 'POST',
			success : function(msg) {
				if(msg!="no"){
					var list = eval("(" + msg + ")");
					if(list.length){
						var hasList = false;
						var num = 1;
						for(var i=0; i<list.length; i++){
							if(list[i].comment){
								html+="<tr>";
								html+="<td width=100>"+(num++)+"</td>";
								html+="<td width=200>"+list[i].stime.split(" ")[0]+"</td>";
								html+="<td>"+list[i].comment+"</td>";
								html+="</tr>";
								if(list[i].stime.split(" ")[0] == getTime()){
									icon.find("img").attr('src','images/icon/Comment.png');	
									dialog.find("textarea").val(list[i].comment);
								}
								hasList = true;
							}
						}
						html+="</tbody></table>";
						$('#comment-table-body').html(comment_split+html+comment_footer);
					    $("#comment-table-body").find("table").tablesorter();
					    initTable($("#comment-table-body"));
					}
				}
			}
		});
	}
	
	window.saveComment = function(){
		var val = dialog.find("textarea").val();
		var query = getCommentParams();
		$.ajax({
			url : "save-comment.do",
			data : query+"&comment="+val,
			type : 'POST',
			success : function(msg) {
				if(msg!="no"){
					icon.find("img").attr('src','images/icon/Comment.png');
					resumeComment();
				}
			}
		});
	}
	
	window.addComment=function(){
		dialog.dialog({
			title:"添加备注",
			width:500,
			height:300,
			buttons:[{ 
				text: "确认",
				click: function() { 
					saveComment();
					$( this ).dialog( "close" ); 
				} 
			},{ 
				text: "取消", 
				click: function() { 
					$( this ).dialog( "close" ); 
				} 
			}]
		});
	}
	window.setTimeout(function(){
		resumeComment();
	}, 1);
});
function fixed(v){
	v = "" + (~~(v * 10000)) / 100;
	if(v.indexOf(".") == -1){
		var l = -1;
	}else{
		var l = v.length - 1 - v.lastIndexOf(".");
	}
	if(l == -1){
		v += ".00";
	}else if(l == 1){
		v += "0";
	}
	return v;
};
function getYearWeek(date) {
	var date = date.split('-');
	var a = ~~date[0];
	var b = ~~date[1];
	var c = ~~date[2];
    var d1 = new Date(a, b-1, c), d2 = new Date(a, 0, 1), 
    d = Math.round((d1 - d2) / 86400000); 
    return a + "-" + Math.ceil((d + ((d2.getDay() + 1) - 1)) / 7);
};