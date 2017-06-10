var COMMENT_TYPE = "trend";
var inr;
// 统计类型改变时调用
function typeChange() {
    var type = $("#sel_type").val();
    switch (type) {
        case "Y":
            $("#timeYear").parent().show();
            $("#timeMonth").parent().hide();
            $("#timeWeek").hide();
            $("#time").hide();
            break;
        case "M":
            $("#timeYear").parent().show();
            $("#timeMonth").parent().show();
            $("#timeWeek").hide();
            $("#time").hide();
            break;
        case "D":
            $("#timeYear").parent().hide();
            $("#timeMonth").parent().hide();
            $("#timeWeek").hide();
            $("#time").show();
            break;
        case "W":
            $("#timeYear").parent().hide();
            $("#timeMonth").parent().hide();
            $("#timeWeek").show();
            $("#time").hide();
    }
}
$(function() {
    $("#btn_submit").click(function() {
        loadData();
    });
    $("#sel_type").change(function() {
        typeChange();
    });
    $("#btn_back").click(function() {
        window.history.go(-1);
    });
    var now = new Date(sysdate);
    var year = now.getYear();
    if (year < 1000) year += 1900;
    var month = now.getMonth() + 1;
    var date = now.getDate();
    $("#timeYear").spinner();
    $("#timeYear").val(year);
    $("#timeMonth").spinner({
        spin: function(event, ui) {
            if (ui.value > 12) {
                $(this).spinner("value", 1);
                return false;
            } else if (ui.value < 1) {
                $(this).spinner("value", 12);
                return false;
            }
        }
    });
    $("#timeWeek").datepicker({
        changeMonth: true,
        changeYear: true,
        showWeek: true,
        yearRange: "1900:2017"
    });
    $("#timeWeek").change(function() {
        this.value = getYearWeek(this.value);
    });
    $("#timeMonth").val(month);
    $("#timeWeek").val(getYearWeek(sysdate));
    $("#time").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "1900:2017"
    });
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    $("#time").val(year + "-" + month + "-" + date);
    typeChange();

    if (window.welife_updateArea) {
        window.welife_updateArea();
    }

    resumeTrend();
});
function loadData() {
    var query = getQuery();
    lastQuery = query;
    $.ajax({
        url: "stat-data.do",
        data: query,
        type: 'POST',
        success: onSuccess
    });
    updateDesc();
}
function onSuccess(msg) {
    lastData = eval("(" + msg + ")");
    // console.log(data);
    render(lastData, true);
}
function getQuery() {
    var type = $("#sel_type").val();
    var area = $("#sel_area").val();
    var query = "area=" + area + "&term=" + type + "&time=";

    var year = $("#timeYear").val();
    var month = $("#timeMonth").val();
    var week = $("#timeWeek").val();
    var time = $("#time").val();

    if (month < 10) month = "0" + month;
    switch (type) {
        case "Y":
            query += year;
            break;
        case "M":
            query += year + "-" + month;
            break;
        case "D":
            query += time;
            break;
        case "W":
            query += week;
    }
    return query;
}
function init_chart(echarts) {
    window.echarts = echarts;
    window.setTimeout(function() {
        loadData();
    }, 100);
}

function render_line(data, renew) {
    console.log(data);
    var chart = echarts.init(document.getElementById('stat-line'), 'navTheme');
    //	theme.color[0] = "#f58b2b";
    //	theme.color[1] = "#ffc601";
    //	theme.color[2] = "#83bb4c";
//    chart.setTheme(theme);
    var option = {
        animationDuration: 1000,
        grid: {
            x: 50,
            x2: 10,
            y: 60,
            y2: 40
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params, ticket, callback) {
                var res = [];
                var value = 0;
                if (params[0])
                    res.push(params[0].name);
                else if (params[1])
                    res.push(params[1].name);
                else if (params[2])
                    res.push(params[2].name);

                if (params[2]) {
                    res.push('<br />' + params[2].seriesName + ": ");
                    res.push(params[2].data + (params[1] ? params[1].data : 0) + (params[0] ? params[0].data : 0));
                }

                if (params[1]) {
                    res.push('<br />' + params[1].seriesName + ": ");
                    res.push(params[1].data + (params[0] ? params[0].data : 0))
                }

                if (params[0])
                    res.push('<br />' + params[0].seriesName + ": " + (params[0].data));

                return res.join('');

                // return params[0].name + '<br />' + params[2].seriesName + ": "
                //         + (params[2].data + params[1].data + params[0].data) + '<br />'
                //         + params[1].seriesName + ": " + (params[1].data + params[0].data)
                //         + '<br />' + params[0].seriesName + ": " + (params[0].data);
            }
        },
        legend: {
            x: 0,
            y: 20,
            selectedMode: true,
            padding: 5, // 图例内边距，单位px，默认上下左右内边距为5
            itemGap: 10, // Legend各个item之间的间隔，横向布局时为水平间隔，纵向布局时为纵向间隔
            data: ['客流量', '进店量', '回头客']
        },
        xAxis: [{
            type: 'category',
            data: []
        }],
        yAxis: [{
            type: 'value',
            boundaryGap: [0.1, 0.3],
            min: 0
        }],
        series: [{
            name: '回头客',
            type: 'bar',
            stack: '总量',
            data: []
        }, {
            name: '进店量',
            type: 'bar',
            stack: '总量',
            data: []
        }, {
            name: '客流量',
            type: 'bar',
            stack: '总量',
            data: []
        }],
        color: ["#83bb4c", "#ffc601", "#f58b2b"]
    };
    var rangeInfo = getRangeInfo(data, renew, "visits");
    option.xAxis[0].data = rangeInfo.xAxis.slice(0);
    option.series[2].data = rangeInfo.data;
    var rangeInfo = getRangeInfo(data, renew, "indoors");
    option.series[1].data = rangeInfo.orgiData;
    var rangeInfo = getRangeInfo(data, renew, "returns");
    option.series[0].data = rangeInfo.orgiData;

    option.series[2].data = subValues(option.series[2].data, option.series[1].data);
    option.series[1].data = subValues(option.series[1].data, option.series[0].data);
    chart.setOption(option);
}

function subValues(a, b) {
    var r = [];
    for (var i = 0; i < a.length; i++) {
        r.push((a[i] || 0) - (b[i] || 0));
    }
    return r;
}

function render_lineOther(data, renew, name) {
    var target = "stat-trend-sub-line-";
    var dataName = '';
    var labelName = '';
    color = [];
    if (name == 'A') {
        target += "A";
        dataName = "indoors";
        labelName = "进店量";
        //		theme.color[0] = "#ffedaa";
    } else if (name == 'B') {
        target += "B";
        dataName = "returns";
        labelName = "回头客";
        //		theme.color[0] = "#bedeaa";
    } else {
        target += "C";
        dataName = "avgStay";
        labelName = "平均驻留时间";
        //		theme.color[0] = "#b4e0f5";
    }
    var chart = echarts.init(document.getElementById(target), 'navTheme');
    //	chart.setTheme(theme);
    var option = {
        grid: {
            x: 50,
            x2: 10,
            y: 15,
            y2: 40
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: [{
            boundaryGap: [5, 5],
            type: 'category',
            data: []
        }],
        yAxis: [{
            type: 'value',
            boundaryGap: [0.1, 0.3],
            min: 0
        }],
        series: [{
            name: labelName,
            type: 'line',
            smooth: false,
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: 'default'
                    }
                }
            },
            data: []
        }]
    };
    if (name == 'A') {
        option.yAxis[0].min = 0;
        option.yAxis[0].max = 100;
        option.yAxis[0].axisLabel = {
            formatter: function(value) {
                return value + "%";
            }
        };
        option.tooltip.formatter = function(params, ticket, callback) {
            var index = parseInt(params[0].name);
            var v = data.data[index].visits || 0;
            var d = data.data[index].indoors || 0;
            var r = fixed(d / v) + "%";
            var tips = "";
            tips += "进店量:" + d + "<br />";
            tips += "进店率:" + r;
            return params[0].name + "<br />" + tips;
        };
        option.color = ["#ffedaa"];
    } else if (name == 'B') {
        option.yAxis[0].min = 0;
        option.yAxis[0].max = 100;
        option.yAxis[0].axisLabel = {
            formatter: function(value) {
                return value + "%";
            }
        };
        option.tooltip.formatter = function(params, ticket, callback) {
            var index = parseInt(params[0].name);
            if (inr) {
                var v = data.data[index].visits || 0;
            } else {
                var v = data.data[index].indoors || 0;
            }
            var d = lastData.data[index].returns || 0;
            var r = fixed(d / v) + "%";
            var tips = "";
            tips += "回头客:" + d + "<br />";
            tips += "回头率:" + r;
            return params[0].name + "<br />" + tips;
        };
        option.color = ["#bedeaa"];
    } else {
        option.yAxis[0].axisLabel = {
            formatter: function(value) {
                var v = ~~(value / 60);
                var s = ~~(value % 60);
                if (v < 10) {
                    v = "0" + v;
                }
                if (s < 10) {
                    s = "0" + s;
                }
                return v + ":" + s;
            }
        };
        option.tooltip.formatter = function(params, ticket, callback) {
            var index = parseInt(params[0].name);
            var n = data.data[index].avgStay || 0;
            var v = ~~(n / 60);
            var s = ~~(n % 60);
            if (v < 10) {
                v = "0" + v;
            }
            if (s < 10) {
                s = "0" + s;
            }
            return params[0].name + "<br />" + "平均驻留时长：" + v + ":" + s;
        };
        option.color = ["#b4e0f5"];
    }
    var rangeInfo = getRangeInfo(data, renew, dataName);
    option.xAxis[0].data = rangeInfo.xAxis;
    option.series[0].data = rangeInfo.data;
    chart.setOption(option);
}
function render_table(data, renew) {
    var rangeInfo = getRangeInfo(data, renew);
    var table = '<table class="tablesorter"><thead><tr><th>时段</th><th title="客流人数，包含进店">客流量</th><th title="进入店铺人数">进店量</th><th title="进店量/客流量">进店率</th><th title="曾经来过此店铺顾客量">回头客</th><th title="回头客/进店量">回头率</th><th title="统计区间内，所有顾客的驻留时间平均值">平均驻留时长</th></tr></thead><tbody>';
    for (var i = rangeInfo.min; i < rangeInfo.max; i++) {
        var visit = data.data[i].visits || 0;
        var indoor = data.data[i].indoors || 0;
        var returns = data.data[i].returns || 0;
        var avgStay = data.data[i].avgStay || 0;
        if (data.data[i].visits !== null) {
            table += '<tr>';
            table += '<td>';
            table += '<a href="javascript:gotoTime(\'' + data.XAxis[i] + '\')">' + data.XAxis[i]
                    + '</a>';
            table += '</td>';
            table += '<td>';
            table += data.data[i].visits;
            table += '</td>';
            table += '<td>';
            table += data.data[i].indoors;
            table += '</td>';
            table += '<td>';
            table += fixed(data.data[i].indoors / data.data[i].visits) + "%";
            table += '</td>';
            table += '<td>';
            table += data.data[i].returns;
            table += '</td>';
            table += '<td>';
            if (inr) {
                table += fixed(data.data[i].returns / data.data[i].visits) + "%";
            } else {
                table += fixed(data.data[i].returns / data.data[i].indoors) + "%";
            }
            table += '</td>';
            table += '<td>';
            var v = ~~(data.data[i].avgStay / 60);
            var s = ~~(data.data[i].avgStay % 60);
            if (v < 10) {
                v = "0" + v;
            }
            if (s < 10) {
                s = "0" + s;
            }
            table += v + ":" + s;
            table += '</td>';
            table += '</tr>';
        }
    }
    table += "</tbody></table>";
    $("#stat-table").html(table);
    $("#stat-table").find("table").tablesorter();
    var tooltips = $("#stat-table").find("[title]").tooltip({
        track: true
    });
    hoverTable($("#stat-table"));
}
function render_sum(_data) {
    var sumCount = 0;
    var data = _data.sum;
    var o_visit, o_indoor, o_returns, o_r_savg;
    for (var i = 0; i < data.length; i++) {
        var hasV = data[i].visits != 0;
        var visit = data[i].visits || 0;
        var indoor = data[i].indoors || 0;
        var returns = data[i].returns || 0;
        var avgStay = data[i].avgStay || 0;
        var r_in = fixed(data[i].indoors / data[i].visits) + "%";
        if (inr) {
            var r_ret = fixed(data[i].returns / data[i].visits) + "%";
        } else {
            var r_ret = fixed(data[i].returns / data[i].indoors) + "%";
        }
        var v = ~~(data[i].avgStay / 60);
        var s = ~~(data[i].avgStay % 60);
        if (v < 10) {
            v = "0" + v;
        }
        if (s < 10) {
            s = "0" + s;
        }
        var r_savg = v + ":" + s;
        if (i == 0) {
            $("#sum-visit-count").html(visit);
            $("#sum-indoor-rate-bar").css("width", r_in)
            $("#sum-indoor-rate").html(r_in);
            $("#sum-indoor-count").html(indoor);
            $("#sum-return-rate").html(r_ret);
            $("#sum-return-count").html(returns);
            $("#sum-avg-stay").html(r_savg);
            o_visit = visit;
            o_indoor = indoor;
            o_returns = returns;
            o_r_savg = r_savg;
            o_avgStay = avgStay;
        } else if (i == 1) {
            $("#sum_visit_t").html(fixed((o_visit - visit) / visit) + "%");
            $("#sum_indoor_t").html(fixed((o_indoor - indoor) / indoor) + "%");
            $("#sum_return_t").html(fixed((o_returns - returns) / returns) + "%");
            $("#sum_avg_t").html(fixed((o_avgStay - avgStay) / avgStay) + "%");
            if (!hasV) {
                $("#sum_visit_t").html("-");
                $("#sum_indoor_t").html("-");
                $("#sum_return_t").html("-");
                $("#sum_avg_t").html("-");
                changeArrow(o_visit, o_indoor, o_returns, o_r_savg, visit, indoor, returns, r_savg,
                        "t", true);
            } else {
                //				$("#sum_visit_t").parent().show();
                //				$("#sum_indoor_t").parent().show();
                //				$("#sum_return_t").parent().show();
                //				$("#sum_avg_t").parent().show();
                //				sumCount++;
                changeArrow(o_visit, o_indoor, o_returns, o_r_savg, visit, indoor, returns, r_savg,
                        "t");
            }
        } else if (i == 2) {
            $("#sum_visit_h").html(fixed((o_visit - visit) / visit) + "%");
            $("#sum_indoor_h").html(fixed((o_indoor - indoor) / indoor) + "%");
            $("#sum_return_h").html(fixed((o_returns - returns) / returns) + "%");
            $("#sum_avg_h").html(fixed((o_avgStay - avgStay) / avgStay) + "%");
            if (!hasV) {
                $("#sum_visit_h").html("-");
                $("#sum_indoor_h").html("-");
                $("#sum_return_h").html("-");
                $("#sum_avg_h").html("-");
                changeArrow(o_visit, o_indoor, o_returns, o_r_savg, visit, indoor, returns, r_savg,
                        "h", true);
            } else {
                //				$("#sum_visit_h").parent().show();
                //				$("#sum_indoor_h").parent().show();
                //				$("#sum_return_h").parent().show();
                //				$("#sum_avg_h").parent().show();
                //				sumCount++;
                changeArrow(o_visit, o_indoor, o_returns, o_r_savg, visit, indoor, returns, r_savg,
                        "h");
            }
        }
    }
    //sum_a = ~~(sum_a / allCount);

    var visit = 0;
    var indoor = 0;
    var returns = 0;
    var avgStay = 0;

    data = _data.data;
    var avgCount = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i].visits) {
            avgCount++;
            visit += data[i].visits;
            indoor += data[i].indoors;
            returns += data[i].returns;
            avgStay += data[i].avgStay;
        }
    }
    visit = ~~(visit / avgCount);
    indoor = ~~(indoor / avgCount);
    returns = ~~(returns / avgCount);
    avgStay = ~~(avgStay / avgCount);
    var r_in = fixed(indoor / visit) + "%";
    if (inr) {
        var r_ret = fixed(returns / visit) + "%";
    } else {
        var r_ret = fixed(returns / indoor) + "%";
    }
    var v = ~~(avgStay / 60);
    var s = ~~(avgStay % 60);
    if (v < 10) {
        v = "0" + v;
    }
    if (s < 10) {
        s = "0" + s;
    }
    var r_savg = v + ":" + s;
    $("#sum_visit_a").html(visit);
    $("#sum_indoor_a").html(indoor);
    $("#sum_return_a").html(returns);
    $("#sum_avg_a").html(r_savg);
    if (!visit) {
        $("#sum_visit_a").html("-");
        $("#sum_indoor_a").html("-");
        $("#sum_return_a").html("-");
        $("#sum_avg_a").html("-");
    } else {
    }
    if (hideSumCmp()) {
        $('.sum-item').height(110);
        $('.sum-item-inner').height(110);
        $('.sum').height(110);
        $('.sum-item-other').hide();
    } else {
        $('.sum-item').height(160);
        $('.sum-item-inner').height(160);
        $('.sum').height(160);
        $('.sum-item-other').show();
    }
}
function getRangeInfo(data, renew, name) {
    var min = 0;
    var max = 0;
    if (renew) {
        OUT : for (var i = data.data.length - 1; i >= 0; i--) {
            if (data.data[i].visits !== null) {
                max = i + 1;
                break;
            }
        }
        OUT : for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].visits !== null) {
                min = i;
                break;
            }
        }
        var dataRange = parseDateRange(min, max, data.XAxis, renew);
        min = dataRange.min;
        max = dataRange.max;
    } else {
        min = $("#sel_start").val();
        max = (~~$("#sel_end").val()) + 1;
        var dataRange = parseDateRange(min, max, data.XAxis, renew);
    }

    var d = [];
    var od = [];
    for (var i = min; i < max; i++) {
        if (name == 'indoors') {
            d.push(fixed(data.data[i].indoors / data.data[i].visits));
        } else if (name == 'returns') {
            if (inr) {
                d.push(fixed(data.data[i].returns / data.data[i].visits));
            } else {
                d.push(fixed(data.data[i].returns / data.data[i].indoors));
            }
        } else {
            d.push(data.data[i][name] || 0);
        }
        od.push(data.data[i][name] || 0);
    }
    console.log(d);
    return {
        min: min,
        max: max,
        xAxis: dataRange.XAxis,
        orgiData: od,
        data: d
    };
}
function render(data, renew) {
    if (!data || !window.echarts) {
        return;
    }
    inr = $("#sel_area").find("option:selected").attr("type") == 10;
    render_line(data, renew);
    render_lineOther(data, renew, 'A');
    render_lineOther(data, renew, 'B');
    render_lineOther(data, renew, 'C');
    render_table(data, renew);
    render_sum(data);
}
function changeArrow(v1, i1, r1, a1, v2, i2, r2, a2, e, f) {
    var ve = $("#sum_visit_" + e).parent()[0];
    if (f) {
        ve.style.backgroundImage = 'url(bs-images/arrow-up-none.png)';
    } else if (v2 < v1) {
        ve.style.backgroundImage = 'url(bs-images/arrow-up.png)';
    } else if (v2 > v1) {
        ve.style.backgroundImage = 'url(bs-images/arrow-down.png)';
    } else {
        ve.style.backgroundImage = 'url(bs-images/arrow-line.png)';
    }
    var ve = $("#sum_indoor_" + e).parent()[0];
    if (f) {
        ve.style.backgroundImage = 'url(bs-images/arrow-up-none.png)';
    } else if (i2 < i1) {
        ve.style.backgroundImage = 'url(bs-images/arrow-up.png)';
    } else if (i2 > i1) {
        ve.style.backgroundImage = 'url(bs-images/arrow-down.png)';
    } else {
        ve.style.backgroundImage = 'url(bs-images/arrow-line.png)';
    }
    var ve = $("#sum_return_" + e).parent()[0];
    if (f) {
        ve.style.backgroundImage = 'url(bs-images/arrow-up-none.png)';
    } else if (r2 < r1) {
        ve.style.backgroundImage = 'url(bs-images/arrow-up.png)';
    } else if (r2 > r1) {
        ve.style.backgroundImage = 'url(bs-images/arrow-down.png)';
    } else {
        ve.style.backgroundImage = 'url(bs-images/arrow-line.png)';
    }
    var ve = $("#sum_avg_" + e).parent()[0];
    if (f) {
        ve.style.backgroundImage = 'url(bs-images/arrow-up-none.png)';
    } else if (a2 < a1) {
        ve.style.backgroundImage = 'url(bs-images/arrow-up.png)';
    } else if (a2 > a1) {
        ve.style.backgroundImage = 'url(bs-images/arrow-down.png)';
    } else {
        ve.style.backgroundImage = 'url(bs-images/arrow-line.png)';
    }

}
function hideSumCmp() {
    var type = $("#sel_type").val();
    var year = $("#timeYear").val();
    var month = $("#timeMonth").val();
    var week = $("#timeWeek").val();
    var time = $("#time").val();
    var date = new Date();
    var curYear = date.getYear() + 1900;
    var curMonth = date.getMonth() + 1;
    var curDate = curYear + '-' + fixStr(curMonth) + '-' + fixStr(date.getDate());
    switch (type) {
        case "Y":
            return year == curYear;
        case "M":
            return year == curYear && month == curMonth;
        case "D":
            return time == curDate;
    }
}
function fixStr(s) {
    if ((s + "").length < 2) {
        return '0' + s;
    } else {
        return s;
    }
}
function resumeTrend() {
    var params = getParams();
    if (params.type) {
        $("#sel_type").val(params.type);
        $("#timeYear").val(params.year);
        $("#timeMonth").val(params.month);
        $("#timeWeek").val(params.week);
        $("#time").val(params.time);
        $("#sel_area").val(params.area);
        typeChange();
    }
}
function gotoTime(time) {
    var type = $("#sel_type").val();
    if (type == 'Y') {
        $("#sel_type").val('M');
        $("#timeMonth").val(parseInt(time));
    } else if (type == 'M') {
        $("#sel_type").val('D');
        $("#time").val($("#timeYear").val() + '-' + fix2($("#timeMonth").val()) + '-'
                + fix2(parseInt(time)));
    }
    var area = $("#sel_area").val();
    var type = $("#sel_type").val();
    var year = $("#timeYear").val();
    var month = $("#timeMonth").val();
    var week = $("#timeWeek").val();
    var time = $("#time").val();
    window.location.href = 'stat-trend.do?type=' + type + '&area=' + area + '&year=' + year
            + '&month=' + month + '&week=' + week + '&time=' + time;
}
function fix2(v) {
    if (v.length < 2) {
        return '0' + v;
    } else {
        return v;
    }
}
require.config({
    packages: [{
        name: 'echarts',
        location: 'js/echart3',
        main: 'echarts'
    }, {
    	name: 'navTheme',
    	location: 'js/echart3/theme',
        main: 'navTheme'
    }, {
        name: 'shine',
        location: 'js/echart3/theme',
        main: 'shine'
    }]
});
require(['echarts', 'navTheme', 'shine'], init_chart);