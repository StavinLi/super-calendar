//入住离开日历
/*
 * ***Juery出入住日历插件***
 * 作者: Lichen.json
 * MIT License.
 * 版本: V1.0
 * 文件名: super-calendar.js
 * 日期: 2017-11-28封装
 * 使用说明: 利用函数传参调用
 * 注意: 1.调用本地缓存。一个页面调用多个，会产生缓存冲突，导致日期选择显示不正常
 *       2.部分兼容涉及es6模板字符串
 *       3.关于日历隐藏：开始结束时间都未选择或都选择，点击空白可隐藏；否则，无法隐藏
 */
(function($) {
    $.fn.superCalendar = function(options) {
        var $this = $(this)
        var gv = {
            target: $(options.target),
            callback: options.callback
        }
        var slider = {
            getCalendar(val) {
                var that = this;
                $this.attr("data-value", val)
                $this.empty()
                $(`<div class="calendar-date">
                    <p class="calendar-date-left"><span class="go-left" style="display:none;"></span>${$.getMonth(val)}</p>
                    <p class="calendar-date-right">${$.getMonth(val+1)}<span class="go-right"></span></p>
                </div>
                <div class="calendar-left l calendar-container">
                    <p class="calendar-week clear"><span data-week="7">日</span><span data-week="1">一</span><span data-week="2">二</span><span data-week="3">三</span><span data-week="4">四</span><span data-week="5">五</span><span data-week="6">六</span></p>
                    <ul class="calendar-left-days clear">${that.daysStr($.getMonth(val))}</ul>
                </div>
                <div class="calendar-right r calendar-container">
                    <p class="calendar-week clear"><span data-week="7">日</span><span data-week="1">一</span><span data-week="2">二</span><span data-week="3">三</span><span data-week="4">四</span><span data-week="5">五</span><span data-week="6">六</span></p>
                    <ul class="calendar-right-days clear">${that.daysStr($.getMonth(val+1))}</ul>
                </div>`).appendTo($this)
                if (val != 0) {
                    $(".go-left").show()
                }
                setTimeout(function() {
                    that.luoji()
                })
            },
            daysStr(val) {
                var year = val.split('-')[0]
                var month = val.split('-')[1]
                var Days = $.getDays(val)
                var calendarStr = '';
                for (var i = 0; i < Days; i++) {
                    if ((val == $.getDay().ym)) { //当月
                        if (i < $.getDay().d - 1) { //今天之前
                            if (i == 0) {
                                calendarStr += `<li style="margin-left:${36 * $.getWeek(val)}px" class="old-day" y="${year}" m="${month}" d="${$.addZero(i + 1)}">${i + 1}</li>`
                            } else {
                                calendarStr += `<li class="old-day" y="${year}" m="${month}" d="${$.addZero(i + 1)}">${i + 1}</li>`
                            }
                        } else if (i == $.getDay().d - 1) { //今天
                            if (i == 0) { //1号
                                calendarStr += `<li style="margin-left:${36 * $.getWeek(val)}px" class="new-day"  y="${year}" m="${month}" d="${$.addZero(i + 1)}" t="1">今天</li>`
                            } else { //非1号
                                calendarStr += `<li class="new-day" y="${year}" m="${month}" d="${$.addZero(i + 1)}" t="1">今天</li>`
                            }
                        } else {
                            calendarStr += `<li class="new-day"  y="${year}" m="${month}" d="${$.addZero(i + 1)}">${i +1}</li>`
                        }
                    } else { //非当月
                        if (i == 0) {
                            calendarStr += `<li style="margin-left:${36 * $.getWeek(val)}px" class="new-day"  y="${year}" m="${month}" d="${$.addZero(i + 1)}">${i + 1}</li>`
                        } else {
                            calendarStr += `<li class="new-day"  y="${year}" m="${month}" d="${$.addZero(i + 1)}">${i + 1}</li>`
                        }
                    }
                }
                return calendarStr;
            },
            luoji() {
                var sYear, sMonth, sDay;
                if (gv.target.attr("data-start")) {
                    sYear = Number(gv.target.attr("data-start").split('-')[0]);
                    sMonth = $.addZero(Number(gv.target.attr("data-start").split('-')[1]));
                    sDay = $.addZero(Number(gv.target.attr("data-start").split('-')[2]));
                    $this.find('li[y="' + sYear + '"][m="' + sMonth + '"][d="' + sDay + '"]').addClass("active").html("入住")
                    for (var i = 0; i < $this.find("li").length; i++) {
                        if (sYear > $this.find("li").eq(i).attr("y")) {
                            $this.find("li").eq(i).addClass("olds-day")
                        } else if (sYear == $this.find("li").eq(i).attr("y")) {
                            if (sMonth > $this.find("li").eq(i).attr("m")) {
                                $this.find("li").eq(i).addClass("olds-day")
                            } else if (sMonth == $this.find("li").eq(i).attr("m")) {
                                if (sDay > $this.find("li").eq(i).attr("d")) {
                                    $this.find("li").eq(i).addClass("olds-day")
                                }
                            }
                        }
                    }
                }
                var eYear, eMonth, eDay;
                if (gv.target.attr("data-end")) {
                    eYear = Number(gv.target.attr("data-end").split('-')[0]);
                    eMonth = $.addZero(Number(gv.target.attr("data-end").split('-')[1]));
                    eDay = $.addZero(Number(gv.target.attr("data-end").split('-')[2]));
                    $this.find('li[m="' + eMonth + '"][y="' + eYear + '"][d="' + eDay + '"]').addClass("active").html("离开")
                }
                if (gv.target.attr("data-start") && gv.target.attr("data-end")) {
                    $this.find("li").removeClass("olds-day")
                    for (var i = 0; i < $this.find("li").length; i++) {
                        if (eYear == sYear && $this.find("li").eq(i).attr("y") == sYear) { //同一年
                            if (eMonth == sMonth && $this.find("li").eq(i).attr("m") == sMonth) { //同一月
                                if (($this.find("li").eq(i).attr("d") >= sDay) && ($this.find("li").eq(i).attr("d") <= eDay)) {
                                    $this.find("li").eq(i).addClass("active")
                                }
                            } else { //非同月
                                if (($this.find("li").eq(i).attr("m") == eMonth) && ($this.find("li").eq(i).attr("d") <= eDay)) { //在离开月
                                    $this.find("li").eq(i).addClass("active")
                                } else if (($this.find("li").eq(i).attr("m") == sMonth) && ($this.find("li").eq(i).attr("d") >= sDay)) { //在开始月
                                    $this.find("li").eq(i).addClass("active")
                                } else if (($this.find("li").eq(i).attr("m") < eMonth) && ($this.find("li").eq(i).attr("m") > sMonth)) { //都不在
                                    $this.find("li").eq(i).addClass("active")
                                }
                            }
                        } else { //非同年
                            if ($this.find("li").eq(i).attr("y") == eYear) { //在结束年
                                if ($this.find("li").eq(i).attr("m") < eMonth) { //不在结束月
                                    $this.find("li").eq(i).addClass("active")
                                } else if (($this.find("li").eq(i).attr("m") == eMonth) && ($this.find("li").eq(i).attr("d") <= eDay)) { //在离开月
                                    $this.find("li").eq(i).addClass("active")
                                }
                            } else if ($this.find("li").eq(i).attr("y") == sYear) { //在开始年
                                if ($this.find("li").eq(i).attr("m") > sMonth) { //不在开始月
                                    $this.find("li").eq(i).addClass("active")
                                } else if (($this.find("li").eq(i).attr("m") == sMonth) && ($this.find("li").eq(i).attr("d") >= sDay)) { //在开始月
                                    $this.find("li").eq(i).addClass("active")
                                }
                            }
                        }
                    }
                }
            },
            scrollLNext() {
                var val = $this.attr("data-value")
                slider.getCalendar((Number(val) + Number(1)))
            },
            scrollPrev() {
                var val = $this.attr("data-value")
                slider.getCalendar(val - 1)
            },
            init() {
                var that = this;
                slider.getCalendar(0);
                $this.on('click', function(e) {
                    e.stopPropagation()
                });
                $this.on('click', '.go-left', that.scrollPrev);
                $this.on('click', '.go-right', that.scrollLNext);
                $this.on("click", ".new-day:not(.olds-day)", function() {
                    if (!gv.target.attr("data-start")) {
                        $(this).addClass("active").html("入住")
                        var indexS = $this.find("li").index($(this))
                        for (var i = 0; i < indexS; i++) {
                            $this.find("li").eq(i).addClass("olds-day")
                        }
                        var beginTime = $(this).attr("y") + '-' + $(this).attr("m") + '-' + $(this).attr("d");
                        gv.target.attr("data-start", beginTime)
                        gv.target.html("选择离开日期")
                    } else if (!gv.target.attr("data-end")) {
                        $(this).addClass("active").html("离开")
                        var endTime = $(this).attr("y") + '-' + $(this).attr("m") + '-' + $(this).attr("d")
                        gv.target.attr("data-end", endTime)
                        that.luoji()
                        gv.target.html(gv.target.attr("data-start") + '至' + endTime)
                        gv.callback(gv.target.attr("data-start") + '至' + endTime)
                        $this.find("li").eq(i).removeClass("olds-day").addClass("olds-day");
                        $this.hide();
                    } else {
                        gv.target.removeAttr("data-start data-end")
                        gv.target.html("选择离开日期")
                        $this.find("li").removeClass("active");
                        for (var i = 0; i < $this.find("li").length; i++) {
                            if ($this.find("li").eq(i).attr("t") == 1) {
                                $this.find("li").eq(i).html("今天")
                            } else {
                                $this.find("li").eq(i).html($this.find("li").eq(i).attr("d"))
                            }
                        }
                        $(this).addClass("active").html("入住")
                        indexS = $this.find("li").index($(this))
                        for (var i = 0; i < indexS; i++) {
                            $this.find("li").eq(i).addClass("olds-day")
                        }
                        var beginTime = $(this).attr("y") + '-' + $(this).attr("m") + '-' + $(this).attr("d");
                        gv.target.attr("data-start", beginTime)
                    }
                });
                gv.target.on("click", function(e) {
                    if ($this.isShow()) {
                        if (gv.target.attr("data-start") && gv.target.attr("data-end")) {
                            $this.hide()
                        }
                        if (!gv.target.attr("data-start") && !gv.target.attr("data-end")) {
                            gv.target.html("入住日期  —  离开日期")
                            $this.hide()
                        }
                    } else {
                        $this.show()
                        if (gv.target.attr("data-start")) {
                            var y = gv.target.attr("data-start").split("-")[0]
                            var m = gv.target.attr("data-start").split("-")[1]
                            if (y == $.getDay().y) {
                                that.getCalendar(m - $.getDay().m)
                            } else {
                                that.getCalendar(((y - $.getDay().y) * 12 + Number(m)) - $.getDay().m)
                            }
                        } else {
                            gv.target.html("选择入住日期")
                        }
                    }
                    e.stopPropagation()
                });
                $(window).on("click", function() {
                    if (gv.target.attr("data-start") && gv.target.attr("data-end")) {
                        $this.hide()
                    }
                    if (!gv.target.attr("data-start") && !gv.target.attr("data-end")) {
                        gv.target.html("入住日期  —  离开日期")
                        $this.hide()
                    }
                })
            }
        }
        slider.init();
    }
})(jQuery);