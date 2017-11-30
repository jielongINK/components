var Pager = function(num) {
    var o = {
        num: num < 99 ? num : 99,
        page: [],
        current: 1,
        pager: $("[data-role='pager']"),
        next: $(".next"),
        prev: $(".prev"),
        first: $(".first"),
        last: $(".last"),
        nextFlag: true,
        prevFlag: true,
    }
    o.init = function() {
        o.firstNav()
        o.changePage()
        document.addEventListener('click',function(event) {
            if(event.target.nodeName == 'BUTTON'){
                o.changePage()
            }
        })
        o.bindEvent()
    }
    o.firstNav = function() {
        var len = o.num > 9 ? 9 : num
        o.page = []
        for (var i = 0; i < len; i++) {
            var li = o.createPage(i + 1)
            o.page.push(li)
        }
    }
    o.lastNav = function () {
        var len = o.num > 9 ? 9 : num
        var max = o.num
        o.page = []
        for (var i = len; i > 0; i--) {
            var li = o.createPage(max--)
            o.page.unshift(li)
        }
    }
    o.createPage = function(num) {
        var li = document.createElement("li")
        li.setAttribute("data-num",num)
        li.innerText = num

        return li
    }
    o.changePage = function() {
        o.nextFlag = o.num == o.current ? false : true
        o.prevFlag = 1 == o.current ? false : true
        if (!o.nextFlag) {
            o.next.setAttr("disabled",true)
            o.last.setAttr("disabled", true)
        } else {
            o.next.setAttr("disabled", false)
            o.last.setAttr("disabled", false)
        }
        if (!o.prevFlag) {
            o.prev.setAttr("disabled", true)
            o.first.setAttr("disabled", true)
        } else {
            o.prev.setAttr("disabled", false)
            o.first.setAttr("disabled", false)
        }
        o.pager.element[0].innerHTML = null
        o.page.forEach((ele, index) => o.pager.getEle().appendChild(ele))
        $("[data-role='pager'] li").uniqueClass(o.getIndex(), 'current')
    }
    o.getIndex = function() {
        for(var i = 0,len = o.page.length; i< len ; i++){
            if (o.page[i].getAttribute("data-num") == o.current) {
                return i
            }
        }
    }
    o.bindEvent = function() {
        o.next.on('click',function() {
            if (o.nextFlag){
                o.current++
                var index = o.getIndex()
                if (index == 5 && o.current + 4 <= o.num) {
                    o.page.shift()
                    var li = o.createPage(o.current + 4)
                    o.page.push(li)
                }
            }
        })
        o.prev.on('click', function () {
            if (o.prevFlag){
                o.current--
                var index = o.getIndex()
                if (index == 3 && o.current - 4 > 0) {
                    o.page.pop()
                    var li = o.createPage(o.current - 4)
                    o.page.unshift(li)
                }
            }
        })
        o.first.on('click', function () {
            o.current = 1
            o.firstNav()
        })
        o.last.on('click', function () {
            o.current = o.num
            o.lastNav()
        })
    }

    return o
}

new Pager(99).init()