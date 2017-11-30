var Tabs = function() {
    var o = {
        nav: "tab-nav",
        panel: "tab-panel",
    }
    o.init = function() {
        var navLi = $("[data-role='tab-nav'] li")
        var panelLi = $("[data-role='tab-panel'] li")
        navLi.uniqueClass(0, 'current')
        panelLi.uniqueClass(0, 'active')
        

        navLi.on('click', function (event) {
            var index = jLong.index(event.target)
            panelLi.uniqueClass(index, 'active')
            navLi.uniqueClass(index, 'current')
        })
        
        return this
    }
    
    return o
}

new Tabs().init()