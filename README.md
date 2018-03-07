# super-calendar
日历-选择入住离开时间

###使用demo

```
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/super-calendar.css">
```

```
    <section class="l select-time">
        <p id="rent-time">入住日期 — 离开日期</p>
        <div class="calendar-box clear"></div>
    </section>
```

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


### 图片介绍

![Alt text](https://github.com/yichen1203/super-calendar/blob/master/super-calendar/images/intro1.png)

![Alt text](https://github.com/yichen1203/super-calendar/blob/master/super-calendar/images/intro2.png)

![Alt text](https://github.com/yichen1203/super-calendar/blob/master/super-calendar/images/intro3.png)

![Alt text](https://github.com/yichen1203/super-calendar/blob/master/super-calendar/images/intro4.png)

![Alt text](https://github.com/yichen1203/super-calendar/blob/master/super-calendar/images/intro5.png)
