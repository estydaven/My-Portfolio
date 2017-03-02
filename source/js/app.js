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

var parallaxContainer = document.getElementById('parallax'),
    layer = parallaxContainer.lastElementChild;

window.addEventListener('mousemove', function (e) {
    var pageX = e.pageX,
        pageY = e.pageY,
        initialX = (window.innerWidth / 2) - pageX,
        initialY = (window.innerHeight / 2) - pageY,
        positionX = initialX * 0.1,
        positionY = initialY * 0.1,
        layerStyle = layer.style,
        transformString = 'translate3d('+ positionX +'px, '+ positionY + 'px, 0)';

    layerStyle.transform = transformString;


    console.log(initialX, initialY);
});
