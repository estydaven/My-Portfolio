var ScrollPage = (function () {

return {
down: function (elem) {
    var section = elem.parentNode.nextSibling.nextSibling,
    posTop = section.offsetTop;

$('body,html').animate({scrollTop: posTop}, 1500);
},

up: function () {
$('body,html').animate({scrollTop: 0}, 1200);
}
}
})();
