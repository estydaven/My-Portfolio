var tabs = (function () {

    var _toggle = function () {
        $('.blog__tabs').toggleClass("blog__tabs-active");
    };


    return{
        init: _toggle
    }
})();

var tabsCheck = $('.blog__tabs');

if(tabsCheck !== null){
    var tabsBtn = $('.sidemenu-btn');

    tabsBtn.click(function () {
        tabs.init();
    })
}