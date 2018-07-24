;
(function($) {
    $.fn.extend({ //为扩展jQuery类本身.即对jQuery.prototype进得扩展，就是为jQuery类添加新方法。
        //用于textarea提醒已输入字数
        limitTextNum: function() { //限制字数data-text
            var $that = $(this)
            var ableNum = $that.attr('data-text')
            $(this).attr('maxlength', ableNum).css('resize', 'none').css('display', 'block')
            $(this).parent().css('position', 'relative')
            var numCon = $that.parent()
            var numLeft = $that.width()
            var numTop = $that.height()
            var span = $('<span class="limit-text"></span>')
            span.html('<span class="hasnum num-count">0</span>/<span class="ablenum num-count">' + ableNum + '</span>').appendTo(numCon).css({
                'display': 'inline-block',
                'font-size': '12px',
                'color': '#999999',
                'position': 'absolute',
                'bottom': $that.attr('data-bottom') ? $that.attr('data-bottom') + 'px' : '2px',
                'right': $that.attr('data-right') ? $that.attr('data-right') + 'px' : '18px',
                'width': 'auto'
            })
            $(this).on('input', function(event) {
                var event = event || window.event;
                $(this).siblings(span).find('.hasnum').html($(this).val().length)
                event.preventDefault;
            })
        },
        //回车触发事件
        enterSearch: function() { //回车事件按钮名data-btn
            $(this).keydown(function(event) {
                var event = event || window.event;
                var currKey = event.keyCode || event.which || event.charCode;
                if (currKey == 13) {
                    var fuc = $(this).data('btn');
                    $('.' + fuc).click();
                }
            });
        },
        onlyNum: function() { //正整数input
            $(this).on('keyup', function() {
                $(this).val($(this).val().replace(/[^\d]/g, ''))
            }).on('input', function() {
                $(this).val($(this).val().replace(/[^\d]/g, ''))
            });
        },
        pointOneNum: function() {
            $(this).on('keyup', function() {
                var value = $(this).val();
                var RegStr = '^[\\+\\-]?\\d+\\.?\\d{0,1}'; // 保留小数点后2位
                $(this).val(value.match(new RegExp(RegStr, 'g')));
                return;
            }).on('input', function() {
                var value = $(this).val();
                var RegStr = '^[\\+\\-]?\\d+\\.?\\d{0,1}'; // 保留小数点后2位
                $(this).val(value.match(new RegExp(RegStr, 'g')));
                return;
            });
        },
        pointNum: function() {
            $(this).on('keyup', function() {
                var value = $(this).val();
                var RegStr = '^[\\+\\-]?\\d+\\.?\\d{0,2}'; // 保留小数点后2位
                $(this).val(value.match(new RegExp(RegStr, 'g')));
                return;
            }).on('input', function() {
                var value = $(this).val();
                var RegStr = '^[\\+\\-]?\\d+\\.?\\d{0,2}'; // 保留小数点后2位
                $(this).val(value.match(new RegExp(RegStr, 'g')));
                return;
            });
        },
        //显示与否
        isShow: function() {
            var visibility = $(this).css('display');
            if (visibility == "none") {
                return false;
            } else {
                return true;
            }
        },
        checkMobile: function() {
            var sMobile = $.trim($(this).val())
            if (!(/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(sMobile))) {
                return false;
            } else {
                return true;
            }
        }
    });
    $.extend({ //为jQuery类添加添加类方法，可以理解为添加静态方法。
        //个位时间加0前缀
        addZero: function(temp) {
            if (Math.abs(temp) < 10 && temp != 0 && temp.length != 2) {
                if (temp < 0) {
                    return "-0" + -temp;
                } else {
                    return "0" + temp;
                }
            } else {
                return temp;
            }
        },
        //格式化某一时间
        getDateStr: function(val, type) {
            if (val) {
                var dd = new Date(val);
                var y = dd.getFullYear();
                var m = $.addZero(dd.getMonth() + 1); //获取当前月份的日期 
                var d = $.addZero(dd.getDate());
                var hours = $.addZero(dd.getHours());
                var minutes = $.addZero(dd.getMinutes());
                var seconds = $.addZero(dd.getSeconds());
                if (type) {
                    return y + type + m + type + d;
                } else {
                    return y + "-" + m + "-" + d;
                }
            } else { //空为当前时间
                return '--'
            }
        },
        //固定格式以前以后时间 参数：差价天数+-
        getBeforeTime: function(AddDayCount) {
            var dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
            var y = dd.getFullYear();
            var m = $.addZero(dd.getMonth() + 1); //获取当前月份的日期 
            var d = $.addZero(dd.getDate());
            var hours = $.addZero(dd.getHours());
            var minutes = $.addZero(dd.getMinutes());
            var seconds = $.addZero(dd.getSeconds());
            return y + "-" + m + "-" + d + " " + hours + ":" + minutes + ":" + seconds;
        },
        getThisTime: function(time) {
            var dd = new Date(time);
            var y = dd.getFullYear();
            var m = $.addZero(dd.getMonth() + 1); //获取当前月份的日期 
            var d = $.addZero(dd.getDate());
            var hours = $.addZero(dd.getHours());
            var minutes = $.addZero(dd.getMinutes());
            var seconds = $.addZero(dd.getSeconds());
            return y + "-" + m + "-" + d + " " + hours + ":" + minutes + ":" + seconds;
        },
        getBeforeDay: function(dayNum = 0) { //获取日期 
            var dd = new Date();
            dd.setDate(dd.getDate() + Number(dayNum));
            var y = dd.getFullYear();
            var m = $.addZero(dd.getMonth() + 1);
            var d = $.addZero(dd.getDate());
            return y + "-" + $.addZero(m) + "-" + $.addZero(d);
        },
        getMonth: function(monthNum = 0) { //获取月份 
            var dd = new Date();
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1;
            if ((m + monthNum) > 12) {
                if ((m + monthNum) % 12 == 0) {
                    y = y + parseInt((m + monthNum) / 12) - 1
                    m = 12
                } else {
                    y = y + parseInt((m + monthNum) / 12)
                    m = parseInt((m + monthNum) % 12)
                }
            } else {
                m = m + Number(monthNum)
            }
            return y + '-' + $.addZero(m)
        },
        getMonthDay: function(val) { //获取月份前后第一天日期 
            var y = val.split("-")[0];
            var m = val.split("-")[1] * 1;
            var d = new Date(y, m, 0);
            return { firstDay: y + '-' + $.addZero(m) + '-01', 'lastDay': y + '-' + $.addZero(m) + '-' + d.getDate() }
        },
        getDay: function() {
            var dd = new Date();
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1; //获取当前月份的日期 
            var d = dd.getDate();
            return { ym: y + "-" + $.addZero(m), d: $.addZero(d), y: y, m: m }
        },
        getDays: function(val) { //获取月份天数
            var y = val.split("-")[0];
            var m = val.split("-")[1] * 1; //获取当前月份的日期 
            var d = new Date(y, m, 0);
            return d.getDate()
        },
        getWeek: function(val) {
            var y = val.split("-")[0];
            var m = val.split("-")[1] * 1; //获取当前月份的日期 
            var d = new Date(y, m - 1, 1);
            var week = d.getDay();
            return week
        },
        //天数差
        timeSub: function(endTime) {
            if (endTime) {
                var s1 = $.getDateStr(endTime);
                s1 = new Date(s1.replace(/-/g, "/"));
                console.log(s1)
                var s2 = new Date();
                var days = s1.getTime() - s2.getTime();
                return parseInt(days / (1000 * 60 * 60 * 24)) + 1;
            } else {
                return '0'
            }
        },
        //获取url参数
        getUrlQuery: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURIComponent(r[2]);
            } else {
                return "";
            }
        }
    });
})(window.Zepto || window.jQuery);

! function(window, undefined) {
    function All() {}
    All.prototype = {
        //数组去重 参数arr： 需要去重的参数
        unique: function(arr) { //(a,b)(c,d)
            var tmp = new Array();
            // 遍历arr,把元素分别放入tmp数组(不存在才放)
            for (var i in arr) {
                //该元素在tmp内部不存在才允许追加
                if (tmp.indexOf(arr[i]) == -1) {
                    tmp.push(arr[i])
                }
            }
            return tmp;
        },
        //实现 JavaScript 文件的动态加载
        loadScript: function(url, callback) {
            var script = document.createElement("script")
            script.type = "text/javascript";
            if (script.readyState) { //IE
                script.onreadystatechange = function() {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else { //Others
                script.onload = function() {
                    callback();
                };
            }
            script.src = url;
            document.getElementsByTagName_r("head")[0].appendChild(script);
        },
        //cookie设置[{key:value}]、获取key、清除['key1','key2']
        setCookie: function(val) {
            for (var i = 0, len = val.length; i < len; i++) {
                for (var key in val[i]) {
                    document.cookie = key + '=' + encodeURIComponent(val[i][key]) + "; path=/";
                }
            }
        },
        getCookie: function(name) {
            var strCookie = document.cookie;
            var arrCookie = strCookie.split("; ");
            for (var i = 0, len = arrCookie.length; i < len; i++) {
                var arr = arrCookie[i].split("=");
                if (name == arr[0]) {
                    return decodeURIComponent(arr[1]);
                }
            }
        },
        clearCookie: function(name) {
            var myDate = new Date();
            myDate.setTime(-1000); //设置时间    
            for (var i = 0, len = name.length; i < len; i++) {
                document.cookie = "" + name[i] + "=''; path=/; expires=" + myDate.toGMTString();
            }
        },
        //禁止微信浏览器下拉回弹效果
        stopDrop: function() {
            var lastY; //最后一次y坐标点 
            $(document.body).on('touchstart', function(event) {
                lastY = event.originalEvent.changedTouches[0].clientY; //点击屏幕时记录最后一次Y度坐标。 
            });
            $(document.body).on('touchmove', function(event) {
                var y = event.originalEvent.changedTouches[0].clientY;
                var st = $(this).scrollTop(); //滚动条高度  
                if (y >= lastY && st <= 10) { //如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。 
                    lastY = y;
                    event.preventDefault();
                }
                lastY = y;
            });
        },
        // 回到顶部 
        backTop: function(top) {
            if (top) {
                $('body,html').animate({ scrollTop: (top) }, 300);
            } else {
                $('body,html').animate({ scrollTop: 0 }, 300);
            }

        },
        httpHtml: function(val) { //var v = "欢迎访问我的个人网站：http://www.zhangxinxu.com/";alert(v.httpHtml());欢迎访问我的个人网站：<a href="http://www.zhangxinxu.com/">http://www.zhangxinxu.com/</a>
            var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
            return val.replace(reg, '<a href="$1$2">$1$2</a>');
        },
        doLoop() { //发送手机验证码
            nums--;
            if (nums > 0) {
                btn.html(nums + 's');
            } else {
                clearInterval(clock); //清除js定时器
                btn.attr('disabled', false); //将按钮置为不可点击
                btn.html('点击重新发送');
                nums = 60; //重置时间
            }
        },
        urlReplace: function(url, title) { //修改路径不刷新页面
            var pageTitle = $('head title').text();
            if (history.pushState) {
                if (title) {
                    pageTitle = title;
                } else {
                    title = pageTitle;
                }
                history.pushState({ title: title }, title, url);
                return true;
            }

            location.href = url;
            return false;
        },
        table: [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
        ],
        decode: function(str) {
            if (!str) {
                return '';
            }
            var len = str.length;
            var i = 0;
            var res = [];
            while (i < len) {
                var code1 = this.table.indexOf(str.charAt(i++));
                var code2 = this.table.indexOf(str.charAt(i++));
                var code3 = this.table.indexOf(str.charAt(i++));
                var code4 = this.table.indexOf(str.charAt(i++));
                var c1 = (code1 << 2) | (code2 >> 4);
                var c2 = ((code2 & 0xF) << 4) | (code3 >> 2);
                var c3 = ((code3 & 0x3) << 6) | code4;
                res.push(String.fromCharCode(c1));
                if (code3 != 64) {
                    res.push(String.fromCharCode(c2));
                }
                if (code4 != 64) {
                    res.push(String.fromCharCode(c3));
                }
            }
            return this.UTF8ToUTF16(res.join(''));
        },
        UTF8ToUTF16: function(str) {
            var res = [],
                len = str.length;
            var i = 0;
            for (var i = 0; i < len; i++) {
                var code = str.charCodeAt(i);
                // 对第一个字节进行判断  
                if (((code >> 7) & 0xFF) == 0x0) {
                    // 单字节  
                    // 0xxxxxxx  
                    res.push(str.charAt(i));
                } else if (((code >> 5) & 0xFF) == 0x6) {
                    // 双字节  
                    // 110xxxxx 10xxxxxx  
                    var code2 = str.charCodeAt(++i);
                    var byte1 = (code & 0x1F) << 6;
                    var byte2 = code2 & 0x3F;
                    var utf16 = byte1 | byte2;
                    res.push(Sting.fromCharCode(utf16));
                } else if (((code >> 4) & 0xFF) == 0xE) {
                    // 三字节  
                    // 1110xxxx 10xxxxxx 10xxxxxx  
                    var code2 = str.charCodeAt(++i);
                    var code3 = str.charCodeAt(++i);
                    var byte1 = (code << 4) | ((code2 >> 2) & 0x0F);
                    var byte2 = ((code2 & 0x03) << 6) | (code3 & 0x3F);
                    utf16 = ((byte1 & 0x00FF) << 8) | byte2
                    res.push(String.fromCharCode(utf16));
                } else if (((code >> 3) & 0xFF) == 0x1E) {
                    // 四字节  
                    // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx  
                } else if (((code >> 2) & 0xFF) == 0x3E) {
                    // 五字节  
                    // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx  
                } else /** if (((code >> 1) & 0xFF) == 0x7E)*/ {
                    // 六字节  
                    // 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx  
                }
            }
            return res.join('');
        },
    };
    window.func = new All();
}(window);
$(function() {
    $('.only-num').onlyNum();
    for (var i = 0; i < $(".text-num").length; i++) {
        $(".text-num").eq(i).limitTextNum();
    }
    for (var i = 0; i < $('.only-num').length; i++) {
        $('.only-num').eq(i).onlyNum();
    }
    for (var i = 0; i < $(".enter-search").length; i++) {
        $(".enter-search").eq(i).enterSearch();
    }
    for (var i = 0; i < $(".point-num").length; i++) {
        $(".point-num").eq(i).pointNum();
    }
    for (var i = 0; i < $(".point-one-num").length; i++) {
        $(".point-one-num").eq(i).pointOneNum()
    }
});