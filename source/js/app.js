$(document).ready(function(){
    $(".hamburger").click(function(){
        $(this).toggleClass("is-active");
    });
});

(function () {
    $(document).ready(function(){
        $('#auth').click(function () {
            $('.flip-container').toggleClass('hover');
        });
    });
})();


window.onload = function () {
    var parallax = (function () {
        var bg = document.querySelector('.bg-parallax');
        var user = document.querySelector('.user__hero-parallax');
        var starsSection = document.querySelector('.stars-parallax');

        return{
            move: function (block, windowScroll, strafeAmount) {
                var strafe = windowScroll / -strafeAmount + '%';
                var transformString = 'translate3d(0, ' + strafe + ', 0)';

                var style = block.style;

                style.transform = transformString;
                style.webkitTransform = transformString;

            },

            init: function (wScroll) {
                this.move(bg, wScroll, 45);
                this.move(user, wScroll, 3);
                this.move(starsSection, wScroll, 20);
            }
        }
    })();

    window.onscroll = function () {
        var wScroll = window.pageYOffset;

        parallax.init(wScroll);

    };
};


var parallaxContainer = document.getElementById('parallax'),
    layers = parallaxContainer.children;

window.addEventListener('mousemove', function (e) {
    var pageX = e.pageX,
        pageY = e.pageY,
        initialX = (window.innerWidth / 2) - pageX,
        initialY = (window.innerHeight / 2) - pageY;


        [].slice.call(layers).forEach(function (layer, i) {
        var layerStyle = layer.style,
            divider = i / 40,
            bottomPosition = (window.innerHeight / 2) * divider,
            horizontalPosition = (window.innerWidth / 2) * divider,
            positionX = initialX * divider,
            positionY = initialY * divider,
            transformString = 'translate3d(' + positionX + 'px,' + positionY + 'px, 0)';

        layerStyle.transform = transformString;
        layerStyle.webkitTransform = transformString;
        layerStyle.bottom = '-' + bottomPosition + 'px';
        layerStyle.left = '-' + horizontalPosition + 'px';
        layerStyle.right = '-' + horizontalPosition + 'px';
    });

    console.log(initialX, initialY);
});


