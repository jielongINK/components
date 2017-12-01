var Calendar = function() {
    var date = new Date()
    var o = {
        year: date.getFullYear(),
        currentMonth: date.getMonth() + 1,
        date: date.getDate(),
        day: date.getDay(),
        arrayLi: [],
        days: $(".days"),
        prev: $(".calendar-prev"),
        next: $(".calendar-next"),
        yearMonth: $(".year-month"),
        today: $(".today"),
    }
    o.init = function() {
        o.backToday()
        o.bindEvent()
    }
    o.bindEvent = function() {
        o.prev.on("click", function() {
            o.changeYearMonth("prev")
            
        })
        o.next.on("click", function () {
            o.changeYearMonth("next")
        })
        o.today.on("click", function () {
            o.backToday()
        })
    }
    o.changeYearMonth = function(action) {
        if(action == "prev"){
            o.currentMonth--
            if(o.currentMonth <= 0){
                o.currentMonth = 12
                o.year--
            }
        }else if(action == "next"){
            o.currentMonth++
            if (o.currentMonth >= 13) {
                o.currentMonth = 1
                o.year++
            }
        }
        o.createLi(o.year, o.currentMonth)
        o.yearMonth.getEle().innerHTML = `${o.year}年${o.currentMonth}月`
    }
    o.getInfo = function(year,month) {
        var  dateInfo = {
            countDays: new Date(year, month, 0).getDate(),
            firstDay: new Date(year, month - 1, 1).getDay(),
        }
        return dateInfo
    }
    o.createLi = function(year,month) {
        o.arrayLi = []
        var dateInfo = o.getInfo(year,month)
        for (let i = 1; i <= dateInfo.countDays; i++) {
            o.arrayLi.push(i)            
        }
        if(dateInfo.firstDay != 1){
            var date = o.getInfo(year, month - 1)
            if(dateInfo.firstDay == 0){
                dateInfo.firstDay = 7
            }
            for (let i = 1; i < dateInfo.firstDay; i++) {
                o.arrayLi.unshift(date.countDays)
                date.countDays--
            }
        }
        var len = 42 - o.arrayLi.length
        if(len > 0){
            for (let i = 1; i <= len; i++) {
                o.arrayLi.push(i)
            } 
        }
        var str = ""
        o.arrayLi.forEach((ele,index) => {
            if(index % 7 == 5 || index % 7 == 6){
                str += `<li class='weekend'>${ele}</li>`
            }else{
                str += `<li>${ele}</li>`
            }
        })
        o.days.getEle().innerHTML = str
    }
    o.backToday = function() {
        o.year = new Date().getFullYear()
        o.currentMonth = new Date().getMonth() + 1
        o.createLi(o.year, o.currentMonth)
        o.yearMonth.getEle().innerHTML = `${o.year}年${o.currentMonth}月`
        var x = o.getInfo(o.year, o.currentMonth).firstDay
        if(x == 0){
            x = 7
        }
        var index = o.date + x - 2
        $(".days li").uniqueClass(index, "currentDay") 
    }

    return o
}

new Calendar().init()