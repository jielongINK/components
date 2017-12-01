var Carousel = function() {
    var o = {
        prev: $(".carousel-prev"),
        next: $(".carousel-next"),
        picList: $(".pic-list"),
        minButton: $(".min-button"),
        picWidth: 600,
        picNum: $(".pic-list li").element.length,
        current: 0,
    }
    o.init = function() {
        o.createMinButton()
        $(".min-button li").uniqueClass(o.current, "current")
        o.bindEvent()
    }
    o.bindEvent = function() {
        o.next.on("click",function() {
            o.changePic("next")
        })
        o.prev.on("click", function () {
            o.changePic("prev")
        })
        o.minButton.on("click", function(event) {
            event.stopPropagation()
            var target = event.target
            if(target.nodeName == "LI"){
                var num = parseInt(target.getAttribute("data-num"))
                o.current = num
                o.picList.setStyle("left", num * o.picWidth * -1 + 'px')
            }
            $(".min-button li").uniqueClass(o.current, "current")
        })
    }
    o.createLi = function(num) {
        var li = document.createElement("li")
        li.setAttribute("data-num",num)
        return li
    }
    o.createMinButton = function() {
        for (let i = 0; i < o.picNum; i++) {
            var li = o.createLi(i)
            o.minButton.getEle().appendChild(li)            
        }
    }
    o.changePic = function(action) {
        var oldP = parseInt(o.picList.getStyle("left"))
        if(action == "prev"){
            var newP = oldP + o.picWidth
            o.current--
            if (newP == o.picWidth) {
                newP = o.picWidth * (o.picNum - 1) * -1 + "px"
                o.current = o.picNum - 1
            } else {
                newP += "px"
            }
        }else if(action == "next"){
            var newP = oldP - o.picWidth
            o.current++
            if (Math.abs(newP) == o.picWidth * o.picNum) {
                newP = "0px"
                o.current = 0
            } else {
                newP += "px"
            }
        }
        o.picList.setStyle("left", newP)
        $(".min-button li").uniqueClass(o.current, "current")
    }

    return o
}

new Carousel().init()