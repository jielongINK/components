var Tabs = function() {
    var o = {
        nav: "tab-nav",
        panel: "tab-panel",
    }
    o.init = function() {
        $("[data-role='tab-panel'] li").uniqueClass(0, 'active')
        $("[data-role='tab-nav'] li").on('click', function (event) {
            var index = jLong.index(event.target)
            $("[data-role='tab-panel'] li").uniqueClass(index, 'active')
        })
        
        return this
    }
    

    return o
}

new Tabs().init()