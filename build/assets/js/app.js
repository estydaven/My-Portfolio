var flip = (function () {

    var flipper = document.querySelector(".flipper"),
        btn = document.querySelector(".c-button");

    var _login = function () {
        btn.style.display = "none";
        flipper.style.transform = "rotateY(180deg)";
    };

    var _user = function () {
        btn.style.display = "block";
        flipper.style.transform = "rotateY(0deg)";
    };

    return {

        On: _login,
        Off: _user

    }


})();

var btnOn = document.querySelector(".c-button"),
    btnOff = document.querySelector(".return-btn");

if (btnOn !== null) {
    btnOn.onclick = function () {
        flip.On();
    };

    btnOff.onclick = function () {
        flip.Off();
    };
}


// Фуллскрин меню
$(document).ready(function(){
    $('#toggle').click(function() {
        $(this).toggleClass('active');
        $('#overlay').toggleClass('open');
    });
});




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


function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 53.658348, lng: 23.786986},
        disableDefaultUI: true,
        scrollwheel: false,
        styles:[{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#4369aa"},{"visibility":"on"}]}]
    });

    var marker = new google.maps.Marker({
        position: {lat: 53.658348, lng: 23.786986},
        map: map,
        title: "Я здесь!"
    });
}

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
// Параллакс на главной
var mainParallax = (function () {
    
    var _show = function () {

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
            })
        });
    };

    return{
        init: _show
    };
})();

    


var preloader = (function(){
    var percentsTotal = 0;
    var preloader = $('.preloader');

    var imgPath = $('*').map(function (ndx, element) {
        var background = $(element).css('background-image');
        var isImg = $(element).is('img');
        var path = '';

        if (background != 'none') {
            path = background.replace('url("', '').replace('")', '');
        }

        if (isImg) {
            path = $(element).attr('src');
        }

        if (path) return path;
    });

    var setPercents = function(total, current) {
        var percents = Math.ceil(current / total * 100);

        $('.preloader__percent').text(percents + '%');

        if (percents >= 100) {
            preloader.fadeOut();
        }
    };

    var loadImages = function(images) {

        if (!images.length) preloader.fadeOut();

        images.forEach(function(img, i, images){
            var fakeImage = $('<img>', {
                attr : {
                    src : img
                }
            });

            fakeImage.on('load error', function(){
                percentsTotal++;
                setPercents(images.length, percentsTotal);
            });
        });

    };

    return {
        init: function () {
            var imgs = imgPath.toArray();

            loadImages(imgs);
        }
    }
}());

$(function () {
    preloader.init();
});

// Анимация скиллов
var skillsDraw = (function () {
    var skills = document.querySelectorAll('.skill'),
        circles = document.querySelectorAll('.skills__circle-above'),
        windowHeight = window.innerHeight;

    // вычисление длины окружности
    var circleLength = function (circle) {
        var circleRadius = circle.getAttribute('r'),
            circleLength = 2 * Math.PI * circleRadius;

        return circleLength;
    };

    // применение к окружности свойств по умолчанию
    [].slice.call(circles).forEach(function (circle) {

        circle.style.strokeDashoffset = circleLength(circle);
        circle.style.strokeDasharray = circleLength(circle);

    });

    // анимирование окружности в зависимости от процентов
    var circleAnimation = function (skill) {

        var circleFill = skill.querySelector('.skills__circle-above'),
            skillPercent = skill.getAttribute('data-percent'),
            length = circleLength(circleFill),
            percent = length * (100 - skillPercent) / 100;

        setTimeout(function () {
            circleFill.style.strokeDashoffset = percent;
            circleFill.style.transition = 'all 1s';

            if (skillPercent < 50) {
                skill.style.opacity = 0.4;
                skill.style.transition = 'all 1s';
            }
        }, 500);

    };

    return {
        grow: function () {

            [].slice.call(skills).forEach(function (skill) {

                var circleRect = skill.getBoundingClientRect(),
                    circlePos = circleRect.bottom,
                    startAnimation = circlePos - windowHeight;

                if (startAnimation <= 0) {
                    circleAnimation(skill);
                }

            });
        }
    }

})();


var slider = (function () {
    var timeIn = 1000,
        timeOut = 2000;

    var _moveUp = function (container, direction) {
        var items = $(container).children('.toggle__pic'),
            itemActive = items.filter('.active-work'),
            itemNext = itemActive.next(),
            directions = direction == 'down' ? 100 : -100;

        if (itemNext.length == 0) {
            items.first().addClass('active-work');
            items.last().removeClass('active-work');
            items.first().css('top', '0');
        }

        itemActive.animate({
           'top': directions + '%'
        }, timeIn);

        itemNext.animate({
            'top': '0'
        }, timeIn, function () {
            itemActive.removeClass('active-work');
            $(this).addClass('active-work');
        });
    };

    var _moveDown = function (container, direction) {
      var items = $(container).children('.toggle__pic'),
          itemActive = items.filter('.active-work'),
          itemPrev = itemActive.prev(),
          directions = direction == 'down' ? 100 : -100;

        if (itemPrev.length == 0) {
            items.last().addClass("active-work");
            items.first().removeClass("active-work");
            items.last().css("top", "0");
        }

        itemActive.animate({
            "top": directions + "%"
        }, timeIn);

        itemPrev.animate({
            'top': "0"
        }, timeIn, function () {
            itemActive.removeClass("active-work");
            $(this).addClass("active-work");
        });
    };

    var _showNext = function (container, children) {
        var items = $(container).children(children),
            itemActive = items.filter(".active-work"),
            itemNext = itemActive.next();

        if (itemNext.length == 0) {
            items.first().addClass("active-work");
            items.first().fadeIn(timeIn);
            items.last().removeClass("active-work");
            items.last().fadeOut(timeOut);
        } else if (itemNext.length !== 0) {
            itemActive.fadeOut(timeOut);
            itemNext.fadeIn(timeIn);
            itemNext.addClass("active-work");
            itemNext.prev().removeClass("active-work");
        }
    };

    var _showPrev = function (container, children) {
        var items = $(container).children(children),
            itemActive = items.filter(".active"),
            itemPrev = itemActive.prev();

        if (itemPrev.length == 0) {
            items.last().addClass("active-work");
            items.last().fadeIn(timeIn);
            items.first().removeClass("active-work");
            items.first().fadeOut(timeOut);
        } else if (itemPrev.length !== 0) {
            itemActive.fadeOut(timeOut);
            itemPrev.fadeIn(timeIn);
            itemPrev.addClass("active-work");
            itemPrev.next().removeClass("active-work");
        }
    };

    return {
        init: function () {
            $('.toggle__link-left').on("click", function () {
                _moveUp($(".prev"), "down");
                _moveUp($(".next"), "up");
                _showNext($(".work__descr-container"), $(".work__descr"));
                _showNext($(".work__preview"), $(".work__preview-pic"));
            });

            $('.toggle__link-right').on("click", function () {
                _moveDown($(".prev"), "down");
                _moveDown($(".next"), "up");
                _showPrev($(".work__descr-container"), $(".work__descr"));
                _showPrev($(".work__preview"), $(".work__preview-pic"));
            });
        }
    }
})();

if ($('.work__slider') !== null) {
    slider.init();
}


var preload = document.querySelector('.preloader');

if (preload !== null) preloader.init();

window.onload = function () {

  //Index Parallax
  var parallax = document.querySelector('#parallax');

  if (parallax !== null) {
      mainParallax.init();
  }


  //Parallax header, skills
  var bg = document.querySelector('.bg-parallax'),
      skills = document.querySelector('.skill');
  //Функция скролла страницы
  window.onscroll = function () {

      var wScroll = window.pageYOffset;

      if (bg !== null) {
          headerParallax.init(wScroll);
      }
      if (skills !== null) {
          skillsDraw.grow();
      }
  };


    // Скролл на один экран вниз
    var scrollDown = document.querySelector('.arrow');

    scrollDown.addEventListener('click', function (e) {
        e.preventDefault();
        var section = this.parentNode.nextSibling.nextSibling,
            posTop = section.offsetTop;

        $('body,html').animate({scrollTop: posTop}, 1500);

    });

    // Скролл вверх
    var scrollUp = document.querySelector('.arrow-up');

    scrollUp.addEventListener('click', function (e) {
        e.preventDefault();

        $('body,html').animate({scrollTop: 0}, 1200);
    });

};








//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZsaXAuanMiLCJmdWxsc2NyZWVuLW1lbnUuanMiLCJoZWFkZXItcGFyYWxsYXguanMiLCJtYXAuanMiLCJtZW51LWJsb2cuanMiLCJwYXJhbGxheC5qcyIsInByZWxvYWRlci5qcyIsInNraWxscy5qcyIsInNsaWRlci5qcyIsInZhbGlkYXRlLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5R0E7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZmxpcCA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGZsaXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZsaXBwZXJcIiksXHJcbiAgICAgICAgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jLWJ1dHRvblwiKTtcclxuXHJcbiAgICB2YXIgX2xvZ2luID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgZmxpcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBcInJvdGF0ZVkoMTgwZGVnKVwiO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3VzZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgZmxpcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBcInJvdGF0ZVkoMGRlZylcIjtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgT246IF9sb2dpbixcclxuICAgICAgICBPZmY6IF91c2VyXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn0pKCk7XHJcblxyXG52YXIgYnRuT24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmMtYnV0dG9uXCIpLFxyXG4gICAgYnRuT2ZmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXR1cm4tYnRuXCIpO1xyXG5cclxuaWYgKGJ0bk9uICE9PSBudWxsKSB7XHJcbiAgICBidG5Pbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZsaXAuT24oKTtcclxuICAgIH07XHJcblxyXG4gICAgYnRuT2ZmLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZmxpcC5PZmYoKTtcclxuICAgIH07XHJcbn1cclxuXHJcbiIsIi8vINCk0YPQu9C70YHQutGA0LjQvSDQvNC10L3RjlxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgJCgnI3RvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQoJyNvdmVybGF5JykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcblxyXG5cclxuIiwiLy8g0J/QsNGA0LDQu9C70LDQutGBINCyINGI0LDQv9C60LUg0YHQsNC50YLQsFxyXG52YXIgaGVhZGVyUGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iZy1wYXJhbGxheCcpO1xyXG4gICAgdmFyIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlcl9faGVyby1wYXJhbGxheCcpO1xyXG4gICAgdmFyIHN0YXJzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFycy1wYXJhbGxheCcpO1xyXG5cclxuXHJcbiAgICB2YXIgX21vdmUgPSBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XHJcbiAgICAgICAgdmFyIHN0cmFmZSA9IHdpbmRvd1Njcm9sbCAvIC1zdHJhZmVBbW91bnQgKyAnJSc7XHJcbiAgICAgICAgdmFyIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCAnICsgc3RyYWZlICsgJywgMCknO1xyXG5cclxuICAgICAgICB2YXIgc3R5bGUgPSBibG9jay5zdHlsZTtcclxuICAgICAgICBpZiAod2luZG93U2Nyb2xsIDwgd2luZG93LmlubmVySGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICAgICAgc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcbiAgICAgICAgICAgIF9tb3ZlKGJnLCB3U2Nyb2xsLCA0NSk7XHJcbiAgICAgICAgICAgIF9tb3ZlKHVzZXIsIHdTY3JvbGwsIDMpO1xyXG4gICAgICAgICAgICBfbW92ZShzdGFyc1NlY3Rpb24sIHdTY3JvbGwsIDIwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG4iLCJcclxuZnVuY3Rpb24gaW5pdE1hcCgpIHtcclxuICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xyXG4gICAgICAgIHpvb206IDEzLFxyXG4gICAgICAgIGNlbnRlcjoge2xhdDogNTMuNjU4MzQ4LCBsbmc6IDIzLjc4Njk4Nn0sXHJcbiAgICAgICAgZGlzYWJsZURlZmF1bHRVSTogdHJ1ZSxcclxuICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXHJcbiAgICAgICAgc3R5bGVzOlt7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDQ0NDQ0XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2YyZjJmMlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2lcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWRcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOi0xMDB9LHtcImxpZ2h0bmVzc1wiOjQ1fV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmhpZ2h3YXlcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwic2ltcGxpZmllZFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmFydGVyaWFsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLmljb25cIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInRyYW5zaXRcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDM2OWFhXCJ9LHtcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX1dXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgcG9zaXRpb246IHtsYXQ6IDUzLjY1ODM0OCwgbG5nOiAyMy43ODY5ODZ9LFxyXG4gICAgICAgIG1hcDogbWFwLFxyXG4gICAgICAgIHRpdGxlOiBcItCvINC30LTQtdGB0YwhXCJcclxuICAgIH0pO1xyXG59XHJcbiIsInZhciB0YWJzID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgX3RvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcuYmxvZ19fdGFicycpLnRvZ2dsZUNsYXNzKFwiYmxvZ19fdGFicy1hY3RpdmVcIik7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgaW5pdDogX3RvZ2dsZVxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxudmFyIHRhYnNDaGVjayA9ICQoJy5ibG9nX190YWJzJyk7XHJcblxyXG5pZih0YWJzQ2hlY2sgIT09IG51bGwpe1xyXG4gICAgdmFyIHRhYnNCdG4gPSAkKCcuc2lkZW1lbnUtYnRuJyk7XHJcblxyXG4gICAgdGFic0J0bi5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGFicy5pbml0KCk7XHJcbiAgICB9KVxyXG59IiwiLy8g0J/QsNGA0LDQu9C70LDQutGBINC90LAg0LPQu9Cw0LLQvdC+0LlcclxudmFyIG1haW5QYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBcclxuICAgIHZhciBfc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIHBhcmFsbGF4Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcmFsbGF4JyksXHJcbiAgICAgICAgICAgIGxheWVycyA9IHBhcmFsbGF4Q29udGFpbmVyLmNoaWxkcmVuO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIHBhZ2VYID0gZS5wYWdlWCxcclxuICAgICAgICAgICAgICAgIHBhZ2VZID0gZS5wYWdlWSxcclxuICAgICAgICAgICAgICAgIGluaXRpYWxYID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgLSBwYWdlWCxcclxuICAgICAgICAgICAgICAgIGluaXRpYWxZID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gcGFnZVk7XHJcblxyXG5cclxuICAgICAgICAgICAgW10uc2xpY2UuY2FsbChsYXllcnMpLmZvckVhY2goZnVuY3Rpb24gKGxheWVyLCBpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGF5ZXJTdHlsZSA9IGxheWVyLnN0eWxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpdmlkZXIgPSBpIC8gNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9zaXRpb24gPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxQb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpICogZGl2aWRlcixcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIGRpdmlkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgnICsgcG9zaXRpb25YICsgJ3B4LCcgKyBwb3NpdGlvblkgKyAncHgsIDApJztcclxuXHJcbiAgICAgICAgICAgICAgICBsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICAgICAgICAgIGxheWVyU3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgbGF5ZXJTdHlsZS5ib3R0b20gPSAnLScgKyBib3R0b21Qb3NpdGlvbiArICdweCc7XHJcbiAgICAgICAgICAgICAgICBsYXllclN0eWxlLmxlZnQgPSAnLScgKyBob3Jpem9udGFsUG9zaXRpb24gKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgbGF5ZXJTdHlsZS5yaWdodCA9ICctJyArIGhvcml6b250YWxQb3NpdGlvbiArICdweCc7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuICAgICAgICBpbml0OiBfc2hvd1xyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbiAgICBcclxuXHJcbiIsInZhciBwcmVsb2FkZXIgPSAoZnVuY3Rpb24oKXtcclxuICAgIHZhciBwZXJjZW50c1RvdGFsID0gMDtcclxuICAgIHZhciBwcmVsb2FkZXIgPSAkKCcucHJlbG9hZGVyJyk7XHJcblxyXG4gICAgdmFyIGltZ1BhdGggPSAkKCcqJykubWFwKGZ1bmN0aW9uIChuZHgsIGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgYmFja2dyb3VuZCA9ICQoZWxlbWVudCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyk7XHJcbiAgICAgICAgdmFyIGlzSW1nID0gJChlbGVtZW50KS5pcygnaW1nJyk7XHJcbiAgICAgICAgdmFyIHBhdGggPSAnJztcclxuXHJcbiAgICAgICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNJbWcpIHtcclxuICAgICAgICAgICAgcGF0aCA9ICQoZWxlbWVudCkuYXR0cignc3JjJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGF0aCkgcmV0dXJuIHBhdGg7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgc2V0UGVyY2VudHMgPSBmdW5jdGlvbih0b3RhbCwgY3VycmVudCkge1xyXG4gICAgICAgIHZhciBwZXJjZW50cyA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xyXG5cclxuICAgICAgICAkKCcucHJlbG9hZGVyX19wZXJjZW50JykudGV4dChwZXJjZW50cyArICclJyk7XHJcblxyXG4gICAgICAgIGlmIChwZXJjZW50cyA+PSAxMDApIHtcclxuICAgICAgICAgICAgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBsb2FkSW1hZ2VzID0gZnVuY3Rpb24oaW1hZ2VzKSB7XHJcblxyXG4gICAgICAgIGlmICghaW1hZ2VzLmxlbmd0aCkgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuXHJcbiAgICAgICAgaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24oaW1nLCBpLCBpbWFnZXMpe1xyXG4gICAgICAgICAgICB2YXIgZmFrZUltYWdlID0gJCgnPGltZz4nLCB7XHJcbiAgICAgICAgICAgICAgICBhdHRyIDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYyA6IGltZ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZha2VJbWFnZS5vbignbG9hZCBlcnJvcicsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XHJcbiAgICAgICAgICAgICAgICBzZXRQZXJjZW50cyhpbWFnZXMubGVuZ3RoLCBwZXJjZW50c1RvdGFsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGltZ3MgPSBpbWdQYXRoLnRvQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICAgIGxvYWRJbWFnZXMoaW1ncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KCkpO1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICBwcmVsb2FkZXIuaW5pdCgpO1xyXG59KTtcclxuIiwiLy8g0JDQvdC40LzQsNGG0LjRjyDRgdC60LjQu9C70L7QslxyXG52YXIgc2tpbGxzRHJhdyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNraWxsJyksXHJcbiAgICAgICAgY2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5za2lsbHNfX2NpcmNsZS1hYm92ZScpLFxyXG4gICAgICAgIHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAvLyDQstGL0YfQuNGB0LvQtdC90LjQtSDQtNC70LjQvdGLINC+0LrRgNGD0LbQvdC+0YHRgtC4XHJcbiAgICB2YXIgY2lyY2xlTGVuZ3RoID0gZnVuY3Rpb24gKGNpcmNsZSkge1xyXG4gICAgICAgIHZhciBjaXJjbGVSYWRpdXMgPSBjaXJjbGUuZ2V0QXR0cmlidXRlKCdyJyksXHJcbiAgICAgICAgICAgIGNpcmNsZUxlbmd0aCA9IDIgKiBNYXRoLlBJICogY2lyY2xlUmFkaXVzO1xyXG5cclxuICAgICAgICByZXR1cm4gY2lyY2xlTGVuZ3RoO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyDQv9GA0LjQvNC10L3QtdC90LjQtSDQuiDQvtC60YDRg9C20L3QvtGB0YLQuCDRgdCy0L7QudGB0YLQsiDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxyXG4gICAgW10uc2xpY2UuY2FsbChjaXJjbGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChjaXJjbGUpIHtcclxuXHJcbiAgICAgICAgY2lyY2xlLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBjaXJjbGVMZW5ndGgoY2lyY2xlKTtcclxuICAgICAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaGFycmF5ID0gY2lyY2xlTGVuZ3RoKGNpcmNsZSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8g0LDQvdC40LzQuNGA0L7QstCw0L3QuNC1INC+0LrRgNGD0LbQvdC+0YHRgtC4INCyINC30LDQstC40YHQuNC80L7RgdGC0Lgg0L7RgiDQv9GA0L7RhtC10L3RgtC+0LJcclxuICAgIHZhciBjaXJjbGVBbmltYXRpb24gPSBmdW5jdGlvbiAoc2tpbGwpIHtcclxuXHJcbiAgICAgICAgdmFyIGNpcmNsZUZpbGwgPSBza2lsbC5xdWVyeVNlbGVjdG9yKCcuc2tpbGxzX19jaXJjbGUtYWJvdmUnKSxcclxuICAgICAgICAgICAgc2tpbGxQZXJjZW50ID0gc2tpbGwuZ2V0QXR0cmlidXRlKCdkYXRhLXBlcmNlbnQnKSxcclxuICAgICAgICAgICAgbGVuZ3RoID0gY2lyY2xlTGVuZ3RoKGNpcmNsZUZpbGwpLFxyXG4gICAgICAgICAgICBwZXJjZW50ID0gbGVuZ3RoICogKDEwMCAtIHNraWxsUGVyY2VudCkgLyAxMDA7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjaXJjbGVGaWxsLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBwZXJjZW50O1xyXG4gICAgICAgICAgICBjaXJjbGVGaWxsLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDFzJztcclxuXHJcbiAgICAgICAgICAgIGlmIChza2lsbFBlcmNlbnQgPCA1MCkge1xyXG4gICAgICAgICAgICAgICAgc2tpbGwuc3R5bGUub3BhY2l0eSA9IDAuNDtcclxuICAgICAgICAgICAgICAgIHNraWxsLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDFzJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDUwMCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdyb3c6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIFtdLnNsaWNlLmNhbGwoc2tpbGxzKS5mb3JFYWNoKGZ1bmN0aW9uIChza2lsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjaXJjbGVSZWN0ID0gc2tpbGwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2lyY2xlUG9zID0gY2lyY2xlUmVjdC5ib3R0b20sXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRBbmltYXRpb24gPSBjaXJjbGVQb3MgLSB3aW5kb3dIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0QW5pbWF0aW9uIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjaXJjbGVBbmltYXRpb24oc2tpbGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuXHJcbiIsInZhciBzbGlkZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHRpbWVJbiA9IDEwMDAsXHJcbiAgICAgICAgdGltZU91dCA9IDIwMDA7XHJcblxyXG4gICAgdmFyIF9tb3ZlVXAgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBkaXJlY3Rpb24pIHtcclxuICAgICAgICB2YXIgaXRlbXMgPSAkKGNvbnRhaW5lcikuY2hpbGRyZW4oJy50b2dnbGVfX3BpYycpLFxyXG4gICAgICAgICAgICBpdGVtQWN0aXZlID0gaXRlbXMuZmlsdGVyKCcuYWN0aXZlLXdvcmsnKSxcclxuICAgICAgICAgICAgaXRlbU5leHQgPSBpdGVtQWN0aXZlLm5leHQoKSxcclxuICAgICAgICAgICAgZGlyZWN0aW9ucyA9IGRpcmVjdGlvbiA9PSAnZG93bicgPyAxMDAgOiAtMTAwO1xyXG5cclxuICAgICAgICBpZiAoaXRlbU5leHQubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgaXRlbXMuZmlyc3QoKS5hZGRDbGFzcygnYWN0aXZlLXdvcmsnKTtcclxuICAgICAgICAgICAgaXRlbXMubGFzdCgpLnJlbW92ZUNsYXNzKCdhY3RpdmUtd29yaycpO1xyXG4gICAgICAgICAgICBpdGVtcy5maXJzdCgpLmNzcygndG9wJywgJzAnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0ZW1BY3RpdmUuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgJ3RvcCc6IGRpcmVjdGlvbnMgKyAnJSdcclxuICAgICAgICB9LCB0aW1lSW4pO1xyXG5cclxuICAgICAgICBpdGVtTmV4dC5hbmltYXRlKHtcclxuICAgICAgICAgICAgJ3RvcCc6ICcwJ1xyXG4gICAgICAgIH0sIHRpbWVJbiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpdGVtQWN0aXZlLnJlbW92ZUNsYXNzKCdhY3RpdmUtd29yaycpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUtd29yaycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX21vdmVEb3duID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgZGlyZWN0aW9uKSB7XHJcbiAgICAgIHZhciBpdGVtcyA9ICQoY29udGFpbmVyKS5jaGlsZHJlbignLnRvZ2dsZV9fcGljJyksXHJcbiAgICAgICAgICBpdGVtQWN0aXZlID0gaXRlbXMuZmlsdGVyKCcuYWN0aXZlLXdvcmsnKSxcclxuICAgICAgICAgIGl0ZW1QcmV2ID0gaXRlbUFjdGl2ZS5wcmV2KCksXHJcbiAgICAgICAgICBkaXJlY3Rpb25zID0gZGlyZWN0aW9uID09ICdkb3duJyA/IDEwMCA6IC0xMDA7XHJcblxyXG4gICAgICAgIGlmIChpdGVtUHJldi5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBpdGVtcy5sYXN0KCkuYWRkQ2xhc3MoXCJhY3RpdmUtd29ya1wiKTtcclxuICAgICAgICAgICAgaXRlbXMuZmlyc3QoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZS13b3JrXCIpO1xyXG4gICAgICAgICAgICBpdGVtcy5sYXN0KCkuY3NzKFwidG9wXCIsIFwiMFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0ZW1BY3RpdmUuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIFwidG9wXCI6IGRpcmVjdGlvbnMgKyBcIiVcIlxyXG4gICAgICAgIH0sIHRpbWVJbik7XHJcblxyXG4gICAgICAgIGl0ZW1QcmV2LmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAndG9wJzogXCIwXCJcclxuICAgICAgICB9LCB0aW1lSW4sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaXRlbUFjdGl2ZS5yZW1vdmVDbGFzcyhcImFjdGl2ZS13b3JrXCIpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiYWN0aXZlLXdvcmtcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2hvd05leHQgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBjaGlsZHJlbikge1xyXG4gICAgICAgIHZhciBpdGVtcyA9ICQoY29udGFpbmVyKS5jaGlsZHJlbihjaGlsZHJlbiksXHJcbiAgICAgICAgICAgIGl0ZW1BY3RpdmUgPSBpdGVtcy5maWx0ZXIoXCIuYWN0aXZlLXdvcmtcIiksXHJcbiAgICAgICAgICAgIGl0ZW1OZXh0ID0gaXRlbUFjdGl2ZS5uZXh0KCk7XHJcblxyXG4gICAgICAgIGlmIChpdGVtTmV4dC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBpdGVtcy5maXJzdCgpLmFkZENsYXNzKFwiYWN0aXZlLXdvcmtcIik7XHJcbiAgICAgICAgICAgIGl0ZW1zLmZpcnN0KCkuZmFkZUluKHRpbWVJbik7XHJcbiAgICAgICAgICAgIGl0ZW1zLmxhc3QoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZS13b3JrXCIpO1xyXG4gICAgICAgICAgICBpdGVtcy5sYXN0KCkuZmFkZU91dCh0aW1lT3V0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW1OZXh0Lmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICBpdGVtQWN0aXZlLmZhZGVPdXQodGltZU91dCk7XHJcbiAgICAgICAgICAgIGl0ZW1OZXh0LmZhZGVJbih0aW1lSW4pO1xyXG4gICAgICAgICAgICBpdGVtTmV4dC5hZGRDbGFzcyhcImFjdGl2ZS13b3JrXCIpO1xyXG4gICAgICAgICAgICBpdGVtTmV4dC5wcmV2KCkucmVtb3ZlQ2xhc3MoXCJhY3RpdmUtd29ya1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2hvd1ByZXYgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBjaGlsZHJlbikge1xyXG4gICAgICAgIHZhciBpdGVtcyA9ICQoY29udGFpbmVyKS5jaGlsZHJlbihjaGlsZHJlbiksXHJcbiAgICAgICAgICAgIGl0ZW1BY3RpdmUgPSBpdGVtcy5maWx0ZXIoXCIuYWN0aXZlXCIpLFxyXG4gICAgICAgICAgICBpdGVtUHJldiA9IGl0ZW1BY3RpdmUucHJldigpO1xyXG5cclxuICAgICAgICBpZiAoaXRlbVByZXYubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgaXRlbXMubGFzdCgpLmFkZENsYXNzKFwiYWN0aXZlLXdvcmtcIik7XHJcbiAgICAgICAgICAgIGl0ZW1zLmxhc3QoKS5mYWRlSW4odGltZUluKTtcclxuICAgICAgICAgICAgaXRlbXMuZmlyc3QoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZS13b3JrXCIpO1xyXG4gICAgICAgICAgICBpdGVtcy5maXJzdCgpLmZhZGVPdXQodGltZU91dCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtUHJldi5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgaXRlbUFjdGl2ZS5mYWRlT3V0KHRpbWVPdXQpO1xyXG4gICAgICAgICAgICBpdGVtUHJldi5mYWRlSW4odGltZUluKTtcclxuICAgICAgICAgICAgaXRlbVByZXYuYWRkQ2xhc3MoXCJhY3RpdmUtd29ya1wiKTtcclxuICAgICAgICAgICAgaXRlbVByZXYubmV4dCgpLnJlbW92ZUNsYXNzKFwiYWN0aXZlLXdvcmtcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLnRvZ2dsZV9fbGluay1sZWZ0Jykub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfbW92ZVVwKCQoXCIucHJldlwiKSwgXCJkb3duXCIpO1xyXG4gICAgICAgICAgICAgICAgX21vdmVVcCgkKFwiLm5leHRcIiksIFwidXBcIik7XHJcbiAgICAgICAgICAgICAgICBfc2hvd05leHQoJChcIi53b3JrX19kZXNjci1jb250YWluZXJcIiksICQoXCIud29ya19fZGVzY3JcIikpO1xyXG4gICAgICAgICAgICAgICAgX3Nob3dOZXh0KCQoXCIud29ya19fcHJldmlld1wiKSwgJChcIi53b3JrX19wcmV2aWV3LXBpY1wiKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLnRvZ2dsZV9fbGluay1yaWdodCcpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX21vdmVEb3duKCQoXCIucHJldlwiKSwgXCJkb3duXCIpO1xyXG4gICAgICAgICAgICAgICAgX21vdmVEb3duKCQoXCIubmV4dFwiKSwgXCJ1cFwiKTtcclxuICAgICAgICAgICAgICAgIF9zaG93UHJldigkKFwiLndvcmtfX2Rlc2NyLWNvbnRhaW5lclwiKSwgJChcIi53b3JrX19kZXNjclwiKSk7XHJcbiAgICAgICAgICAgICAgICBfc2hvd1ByZXYoJChcIi53b3JrX19wcmV2aWV3XCIpLCAkKFwiLndvcmtfX3ByZXZpZXctcGljXCIpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuaWYgKCQoJy53b3JrX19zbGlkZXInKSAhPT0gbnVsbCkge1xyXG4gICAgc2xpZGVyLmluaXQoKTtcclxufVxyXG4iLCIiLCJ2YXIgcHJlbG9hZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXInKTtcclxuXHJcbmlmIChwcmVsb2FkICE9PSBudWxsKSBwcmVsb2FkZXIuaW5pdCgpO1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgLy9JbmRleCBQYXJhbGxheFxyXG4gIHZhciBwYXJhbGxheCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXJhbGxheCcpO1xyXG5cclxuICBpZiAocGFyYWxsYXggIT09IG51bGwpIHtcclxuICAgICAgbWFpblBhcmFsbGF4LmluaXQoKTtcclxuICB9XHJcblxyXG5cclxuICAvL1BhcmFsbGF4IGhlYWRlciwgc2tpbGxzXHJcbiAgdmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJnLXBhcmFsbGF4JyksXHJcbiAgICAgIHNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5za2lsbCcpO1xyXG4gIC8v0KTRg9C90LrRhtC40Y8g0YHQutGA0L7Qu9C70LAg0YHRgtGA0LDQvdC40YbRi1xyXG4gIHdpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuICAgICAgaWYgKGJnICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBoZWFkZXJQYXJhbGxheC5pbml0KHdTY3JvbGwpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChza2lsbHMgIT09IG51bGwpIHtcclxuICAgICAgICAgIHNraWxsc0RyYXcuZ3JvdygpO1xyXG4gICAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gICAgLy8g0KHQutGA0L7Qu9C7INC90LAg0L7QtNC40L0g0Y3QutGA0LDQvSDQstC90LjQt1xyXG4gICAgdmFyIHNjcm9sbERvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJyb3cnKTtcclxuXHJcbiAgICBzY3JvbGxEb3duLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIHNlY3Rpb24gPSB0aGlzLnBhcmVudE5vZGUubmV4dFNpYmxpbmcubmV4dFNpYmxpbmcsXHJcbiAgICAgICAgICAgIHBvc1RvcCA9IHNlY3Rpb24ub2Zmc2V0VG9wO1xyXG5cclxuICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHBvc1RvcH0sIDE1MDApO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8vINCh0LrRgNC+0LvQuyDQstCy0LXRgNGFXHJcbiAgICB2YXIgc2Nyb2xsVXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctdXAnKTtcclxuXHJcbiAgICBzY3JvbGxVcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCAxMjAwKTtcclxuICAgIH0pO1xyXG5cclxufTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==
