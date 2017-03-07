// Параллакс в шапке сайта
var headerParallax = (function () {

    var bg = document.querySelector('.bg-parallax');
    var user = document.querySelector('.user__hero-parallax');
    var starsSection = document.querySelector('.stars-parallax');


    var _move = function (block, windowScroll, strafeAmount) {
        var strafe = windowScroll / -strafeAmount + '%';
        var transformString = 'translate3d(0, ' + strafe + ', 0)';

        var style = block.style;
        if (windowScroll < window.innerHeight) {
            style.transform = transformString;
            style.webkitTransform = transformString;
        }
    };

    return{
        init: function (wScroll) {
            _move(bg, wScroll, 45);
            _move(user, wScroll, 3);
            _move(starsSection, wScroll, 20);
        }
    }

})();
