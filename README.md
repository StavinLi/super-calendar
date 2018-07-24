# super-calendar
日历-选择入住离开时间

### 效果预览
    1. [在线预览 https://stavinli.github.io/super-calendar/index.html](https://stavinli.github.io/super-calendar/index.html)

### 图片介绍

![Alt text](https://github.com/StavinLi/super-calendar/blob/master/super-calendar/images/intro1.png)

![Alt text](https://github.com/StavinLi/super-calendar/blob/master/super-calendar/images/intro2.png)

![Alt text](https://github.com/StavinLi/super-calendar/blob/master/super-calendar/images/intro3.png)

![Alt text](https://github.com/StavinLi/super-calendar/blob/master/super-calendar/images/intro4.png)

![Alt text](https://github.com/StavinLi/super-calendar/blob/master/super-calendar/images/intro5.png)


### 使用说明
- 1.引入文件css
```
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/super-calendar.css">
```
- 2.html内容
```
    <section class="l select-time">
        <p id="rent-time">入住日期 — 离开日期</p>
        <div class="calendar-box clear"></div>
    </section>
```
- 3.引入js及js方法调用
```
<script src="js/jquery-3.1.1.min.js"></script>
<script src="js/limitTextNum.js"></script>
<script src="js/super-calendar.js"></script>
<script>
    $(".calendar-box").superCalendar({
        target: "#rent-time",
        callback: function(date) {
           console.log(date)
        }
    });
</script>
```
### API介绍
    1. target 点击对象
    2. callback 回调函数 


