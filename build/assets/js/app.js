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
    }

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








//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZsaXAuanMiLCJmdWxsc2NyZWVuLW1lbnUuanMiLCJoZWFkZXItcGFyYWxsYXguanMiLCJtYXAuanMiLCJtZW51LWJsb2cuanMiLCJwYXJhbGxheC5qcyIsInByZWxvYWRlci5qcyIsInNraWxscy5qcyIsInNsaWRlci5qcyIsInZhbGlkYXRlLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5R0E7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZmxpcCA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGZsaXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZsaXBwZXJcIiksXHJcbiAgICAgICAgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jLWJ1dHRvblwiKTtcclxuXHJcbiAgICB2YXIgX2xvZ2luID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgZmxpcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBcInJvdGF0ZVkoMTgwZGVnKVwiO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3VzZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgZmxpcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBcInJvdGF0ZVkoMGRlZylcIjtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgT246IF9sb2dpbixcclxuICAgICAgICBPZmY6IF91c2VyXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn0pKCk7XHJcblxyXG52YXIgYnRuT24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmMtYnV0dG9uXCIpLFxyXG4gICAgYnRuT2ZmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXR1cm4tYnRuXCIpO1xyXG5cclxuaWYgKGJ0bk9uICE9PSBudWxsKSB7XHJcbiAgICBidG5Pbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZsaXAuT24oKTtcclxuICAgIH07XHJcblxyXG4gICAgYnRuT2ZmLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZmxpcC5PZmYoKTtcclxuICAgIH07XHJcbn1cclxuXHJcbiIsIi8vINCk0YPQu9C70YHQutGA0LjQvSDQvNC10L3RjlxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgJCgnI3RvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQoJyNvdmVybGF5JykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcblxyXG5cclxuIiwiLy8g0J/QsNGA0LDQu9C70LDQutGBINCyINGI0LDQv9C60LUg0YHQsNC50YLQsFxyXG52YXIgaGVhZGVyUGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iZy1wYXJhbGxheCcpO1xyXG4gICAgdmFyIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlcl9faGVyby1wYXJhbGxheCcpO1xyXG4gICAgdmFyIHN0YXJzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFycy1wYXJhbGxheCcpO1xyXG5cclxuXHJcbiAgICB2YXIgX21vdmUgPSBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XHJcbiAgICAgICAgdmFyIHN0cmFmZSA9IHdpbmRvd1Njcm9sbCAvIC1zdHJhZmVBbW91bnQgKyAnJSc7XHJcbiAgICAgICAgdmFyIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCAnICsgc3RyYWZlICsgJywgMCknO1xyXG5cclxuICAgICAgICB2YXIgc3R5bGUgPSBibG9jay5zdHlsZTtcclxuICAgICAgICBpZiAod2luZG93U2Nyb2xsIDwgd2luZG93LmlubmVySGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICAgICAgc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcbiAgICAgICAgICAgIF9tb3ZlKGJnLCB3U2Nyb2xsLCA0NSk7XHJcbiAgICAgICAgICAgIF9tb3ZlKHVzZXIsIHdTY3JvbGwsIDMpO1xyXG4gICAgICAgICAgICBfbW92ZShzdGFyc1NlY3Rpb24sIHdTY3JvbGwsIDIwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG4iLCJcclxuZnVuY3Rpb24gaW5pdE1hcCgpIHtcclxuICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xyXG4gICAgICAgIHpvb206IDEzLFxyXG4gICAgICAgIGNlbnRlcjoge2xhdDogNTMuNjU4MzQ4LCBsbmc6IDIzLjc4Njk4Nn0sXHJcbiAgICAgICAgZGlzYWJsZURlZmF1bHRVSTogdHJ1ZSxcclxuICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXHJcbiAgICAgICAgc3R5bGVzOlt7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDQ0NDQ0XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2YyZjJmMlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2lcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWRcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOi0xMDB9LHtcImxpZ2h0bmVzc1wiOjQ1fV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmhpZ2h3YXlcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwic2ltcGxpZmllZFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmFydGVyaWFsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLmljb25cIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInRyYW5zaXRcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDM2OWFhXCJ9LHtcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX1dXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgcG9zaXRpb246IHtsYXQ6IDUzLjY1ODM0OCwgbG5nOiAyMy43ODY5ODZ9LFxyXG4gICAgICAgIG1hcDogbWFwLFxyXG4gICAgICAgIHRpdGxlOiBcItCvINC30LTQtdGB0YwhXCJcclxuICAgIH0pO1xyXG59XHJcbiIsInZhciB0YWJzID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgX3RvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcuYmxvZ19fdGFicycpLnRvZ2dsZUNsYXNzKFwiYmxvZ19fdGFicy1hY3RpdmVcIik7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgaW5pdDogX3RvZ2dsZVxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxudmFyIHRhYnNDaGVjayA9ICQoJy5ibG9nX190YWJzJyk7XHJcblxyXG5pZih0YWJzQ2hlY2sgIT09IG51bGwpe1xyXG4gICAgdmFyIHRhYnNCdG4gPSAkKCcuc2lkZW1lbnUtYnRuJyk7XHJcblxyXG4gICAgdGFic0J0bi5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGFicy5pbml0KCk7XHJcbiAgICB9KVxyXG59IiwiLy8g0J/QsNGA0LDQu9C70LDQutGBINC90LAg0LPQu9Cw0LLQvdC+0LlcclxudmFyIG1haW5QYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBcclxuICAgIHZhciBfc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIHBhcmFsbGF4Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcmFsbGF4JyksXHJcbiAgICAgICAgICAgIGxheWVycyA9IHBhcmFsbGF4Q29udGFpbmVyLmNoaWxkcmVuO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIHBhZ2VYID0gZS5wYWdlWCxcclxuICAgICAgICAgICAgICAgIHBhZ2VZID0gZS5wYWdlWSxcclxuICAgICAgICAgICAgICAgIGluaXRpYWxYID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgLSBwYWdlWCxcclxuICAgICAgICAgICAgICAgIGluaXRpYWxZID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gcGFnZVk7XHJcblxyXG5cclxuICAgICAgICAgICAgW10uc2xpY2UuY2FsbChsYXllcnMpLmZvckVhY2goZnVuY3Rpb24gKGxheWVyLCBpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGF5ZXJTdHlsZSA9IGxheWVyLnN0eWxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpdmlkZXIgPSBpIC8gNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9zaXRpb24gPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxQb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpICogZGl2aWRlcixcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIGRpdmlkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgnICsgcG9zaXRpb25YICsgJ3B4LCcgKyBwb3NpdGlvblkgKyAncHgsIDApJztcclxuXHJcbiAgICAgICAgICAgICAgICBsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICAgICAgICAgIGxheWVyU3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgbGF5ZXJTdHlsZS5ib3R0b20gPSAnLScgKyBib3R0b21Qb3NpdGlvbiArICdweCc7XHJcbiAgICAgICAgICAgICAgICBsYXllclN0eWxlLmxlZnQgPSAnLScgKyBob3Jpem9udGFsUG9zaXRpb24gKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgbGF5ZXJTdHlsZS5yaWdodCA9ICctJyArIGhvcml6b250YWxQb3NpdGlvbiArICdweCc7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuICAgICAgICBpbml0OiBfc2hvd1xyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbiAgICBcclxuXHJcbiIsInZhciBwcmVsb2FkZXIgPSAoZnVuY3Rpb24oKXtcclxuICAgIHZhciBwZXJjZW50c1RvdGFsID0gMDtcclxuICAgIHZhciBwcmVsb2FkZXIgPSAkKCcucHJlbG9hZGVyJyk7XHJcblxyXG4gICAgdmFyIGltZ1BhdGggPSAkKCcqJykubWFwKGZ1bmN0aW9uIChuZHgsIGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgYmFja2dyb3VuZCA9ICQoZWxlbWVudCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyk7XHJcbiAgICAgICAgdmFyIGlzSW1nID0gJChlbGVtZW50KS5pcygnaW1nJyk7XHJcbiAgICAgICAgdmFyIHBhdGggPSAnJztcclxuXHJcbiAgICAgICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNJbWcpIHtcclxuICAgICAgICAgICAgcGF0aCA9ICQoZWxlbWVudCkuYXR0cignc3JjJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGF0aCkgcmV0dXJuIHBhdGg7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgc2V0UGVyY2VudHMgPSBmdW5jdGlvbih0b3RhbCwgY3VycmVudCkge1xyXG4gICAgICAgIHZhciBwZXJjZW50cyA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xyXG5cclxuICAgICAgICAkKCcucHJlbG9hZGVyX19wZXJjZW50JykudGV4dChwZXJjZW50cyArICclJyk7XHJcblxyXG4gICAgICAgIGlmIChwZXJjZW50cyA+PSAxMDApIHtcclxuICAgICAgICAgICAgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGxvYWRJbWFnZXMgPSBmdW5jdGlvbihpbWFnZXMpIHtcclxuXHJcbiAgICAgICAgaWYgKCFpbWFnZXMubGVuZ3RoKSBwcmVsb2FkZXIuZmFkZU91dCgpO1xyXG5cclxuICAgICAgICBpbWFnZXMuZm9yRWFjaChmdW5jdGlvbihpbWcsIGksIGltYWdlcyl7XHJcbiAgICAgICAgICAgIHZhciBmYWtlSW1hZ2UgPSAkKCc8aW1nPicsIHtcclxuICAgICAgICAgICAgICAgIGF0dHIgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjIDogaW1nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZmFrZUltYWdlLm9uKCdsb2FkIGVycm9yJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcclxuICAgICAgICAgICAgICAgIHNldFBlcmNlbnRzKGltYWdlcy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaW1ncyA9IGltZ1BhdGgudG9BcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgbG9hZEltYWdlcyhpbWdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0oKSk7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgIHByZWxvYWRlci5pbml0KCk7XHJcbn0pO1xyXG4iLCIvLyDQkNC90LjQvNCw0YbQuNGPINGB0LrQuNC70LvQvtCyXHJcbnZhciBza2lsbHNEcmF3ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBza2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2tpbGwnKSxcclxuICAgICAgICBjaXJjbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNraWxsc19fY2lyY2xlLWFib3ZlJyksXHJcbiAgICAgICAgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgIC8vINCy0YvRh9C40YHQu9C10L3QuNC1INC00LvQuNC90Ysg0L7QutGA0YPQttC90L7RgdGC0LhcclxuICAgIHZhciBjaXJjbGVMZW5ndGggPSBmdW5jdGlvbiAoY2lyY2xlKSB7XHJcbiAgICAgICAgdmFyIGNpcmNsZVJhZGl1cyA9IGNpcmNsZS5nZXRBdHRyaWJ1dGUoJ3InKSxcclxuICAgICAgICAgICAgY2lyY2xlTGVuZ3RoID0gMiAqIE1hdGguUEkgKiBjaXJjbGVSYWRpdXM7XHJcblxyXG4gICAgICAgIHJldHVybiBjaXJjbGVMZW5ndGg7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vINC/0YDQuNC80LXQvdC10L3QuNC1INC6INC+0LrRgNGD0LbQvdC+0YHRgtC4INGB0LLQvtC50YHRgtCyINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXHJcbiAgICBbXS5zbGljZS5jYWxsKGNpcmNsZXMpLmZvckVhY2goZnVuY3Rpb24gKGNpcmNsZSkge1xyXG5cclxuICAgICAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IGNpcmNsZUxlbmd0aChjaXJjbGUpO1xyXG4gICAgICAgIGNpcmNsZS5zdHlsZS5zdHJva2VEYXNoYXJyYXkgPSBjaXJjbGVMZW5ndGgoY2lyY2xlKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDQsNC90LjQvNC40YDQvtCy0LDQvdC40LUg0L7QutGA0YPQttC90L7RgdGC0Lgg0LIg0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDQvtGCINC/0YDQvtGG0LXQvdGC0L7QslxyXG4gICAgdmFyIGNpcmNsZUFuaW1hdGlvbiA9IGZ1bmN0aW9uIChza2lsbCkge1xyXG5cclxuICAgICAgICB2YXIgY2lyY2xlRmlsbCA9IHNraWxsLnF1ZXJ5U2VsZWN0b3IoJy5za2lsbHNfX2NpcmNsZS1hYm92ZScpLFxyXG4gICAgICAgICAgICBza2lsbFBlcmNlbnQgPSBza2lsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGVyY2VudCcpLFxyXG4gICAgICAgICAgICBsZW5ndGggPSBjaXJjbGVMZW5ndGgoY2lyY2xlRmlsbCksXHJcbiAgICAgICAgICAgIHBlcmNlbnQgPSBsZW5ndGggKiAoMTAwIC0gc2tpbGxQZXJjZW50KSAvIDEwMDtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNpcmNsZUZpbGwuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IHBlcmNlbnQ7XHJcbiAgICAgICAgICAgIGNpcmNsZUZpbGwuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMnO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNraWxsUGVyY2VudCA8IDUwKSB7XHJcbiAgICAgICAgICAgICAgICBza2lsbC5zdHlsZS5vcGFjaXR5ID0gMC40O1xyXG4gICAgICAgICAgICAgICAgc2tpbGwuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgNTAwKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ3JvdzogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgW10uc2xpY2UuY2FsbChza2lsbHMpLmZvckVhY2goZnVuY3Rpb24gKHNraWxsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNpcmNsZVJlY3QgPSBza2lsbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICAgICAgICAgICAgICBjaXJjbGVQb3MgPSBjaXJjbGVSZWN0LmJvdHRvbSxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydEFuaW1hdGlvbiA9IGNpcmNsZVBvcyAtIHdpbmRvd0hlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhcnRBbmltYXRpb24gPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNpcmNsZUFuaW1hdGlvbihza2lsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxuIiwidmFyIHNsaWRlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdGltZUluID0gMTAwMCxcclxuICAgICAgICB0aW1lT3V0ID0gMjAwMDtcclxuXHJcbiAgICB2YXIgX21vdmVVcCA9IGZ1bmN0aW9uIChjb250YWluZXIsIGRpcmVjdGlvbikge1xyXG4gICAgICAgIHZhciBpdGVtcyA9ICQoY29udGFpbmVyKS5jaGlsZHJlbignLnRvZ2dsZV9fcGljJyksXHJcbiAgICAgICAgICAgIGl0ZW1BY3RpdmUgPSBpdGVtcy5maWx0ZXIoJy5hY3RpdmUtd29yaycpLFxyXG4gICAgICAgICAgICBpdGVtTmV4dCA9IGl0ZW1BY3RpdmUubmV4dCgpLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb25zID0gZGlyZWN0aW9uID09ICdkb3duJyA/IDEwMCA6IC0xMDA7XHJcblxyXG4gICAgICAgIGlmIChpdGVtTmV4dC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBpdGVtcy5maXJzdCgpLmFkZENsYXNzKCdhY3RpdmUtd29yaycpO1xyXG4gICAgICAgICAgICBpdGVtcy5sYXN0KCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZS13b3JrJyk7XHJcbiAgICAgICAgICAgIGl0ZW1zLmZpcnN0KCkuY3NzKCd0b3AnLCAnMCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXRlbUFjdGl2ZS5hbmltYXRlKHtcclxuICAgICAgICAgICAndG9wJzogZGlyZWN0aW9ucyArICclJ1xyXG4gICAgICAgIH0sIHRpbWVJbik7XHJcblxyXG4gICAgICAgIGl0ZW1OZXh0LmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAndG9wJzogJzAnXHJcbiAgICAgICAgfSwgdGltZUluLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGl0ZW1BY3RpdmUucmVtb3ZlQ2xhc3MoJ2FjdGl2ZS13b3JrJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZS13b3JrJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfbW92ZURvd24gPSBmdW5jdGlvbiAoY29udGFpbmVyLCBkaXJlY3Rpb24pIHtcclxuICAgICAgdmFyIGl0ZW1zID0gJChjb250YWluZXIpLmNoaWxkcmVuKCcudG9nZ2xlX19waWMnKSxcclxuICAgICAgICAgIGl0ZW1BY3RpdmUgPSBpdGVtcy5maWx0ZXIoJy5hY3RpdmUtd29yaycpLFxyXG4gICAgICAgICAgaXRlbVByZXYgPSBpdGVtQWN0aXZlLnByZXYoKSxcclxuICAgICAgICAgIGRpcmVjdGlvbnMgPSBkaXJlY3Rpb24gPT0gJ2Rvd24nID8gMTAwIDogLTEwMDtcclxuXHJcbiAgICAgICAgaWYgKGl0ZW1QcmV2Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGl0ZW1zLmxhc3QoKS5hZGRDbGFzcyhcImFjdGl2ZS13b3JrXCIpO1xyXG4gICAgICAgICAgICBpdGVtcy5maXJzdCgpLnJlbW92ZUNsYXNzKFwiYWN0aXZlLXdvcmtcIik7XHJcbiAgICAgICAgICAgIGl0ZW1zLmxhc3QoKS5jc3MoXCJ0b3BcIiwgXCIwXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXRlbUFjdGl2ZS5hbmltYXRlKHtcclxuICAgICAgICAgICAgXCJ0b3BcIjogZGlyZWN0aW9ucyArIFwiJVwiXHJcbiAgICAgICAgfSwgdGltZUluKTtcclxuXHJcbiAgICAgICAgaXRlbVByZXYuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICd0b3AnOiBcIjBcIlxyXG4gICAgICAgIH0sIHRpbWVJbiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpdGVtQWN0aXZlLnJlbW92ZUNsYXNzKFwiYWN0aXZlLXdvcmtcIik7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJhY3RpdmUtd29ya1wiKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zaG93TmV4dCA9IGZ1bmN0aW9uIChjb250YWluZXIsIGNoaWxkcmVuKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gJChjb250YWluZXIpLmNoaWxkcmVuKGNoaWxkcmVuKSxcclxuICAgICAgICAgICAgaXRlbUFjdGl2ZSA9IGl0ZW1zLmZpbHRlcihcIi5hY3RpdmUtd29ya1wiKSxcclxuICAgICAgICAgICAgaXRlbU5leHQgPSBpdGVtQWN0aXZlLm5leHQoKTtcclxuXHJcbiAgICAgICAgaWYgKGl0ZW1OZXh0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGl0ZW1zLmZpcnN0KCkuYWRkQ2xhc3MoXCJhY3RpdmUtd29ya1wiKTtcclxuICAgICAgICAgICAgaXRlbXMuZmlyc3QoKS5mYWRlSW4odGltZUluKTtcclxuICAgICAgICAgICAgaXRlbXMubGFzdCgpLnJlbW92ZUNsYXNzKFwiYWN0aXZlLXdvcmtcIik7XHJcbiAgICAgICAgICAgIGl0ZW1zLmxhc3QoKS5mYWRlT3V0KHRpbWVPdXQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbU5leHQubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGl0ZW1BY3RpdmUuZmFkZU91dCh0aW1lT3V0KTtcclxuICAgICAgICAgICAgaXRlbU5leHQuZmFkZUluKHRpbWVJbik7XHJcbiAgICAgICAgICAgIGl0ZW1OZXh0LmFkZENsYXNzKFwiYWN0aXZlLXdvcmtcIik7XHJcbiAgICAgICAgICAgIGl0ZW1OZXh0LnByZXYoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZS13b3JrXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zaG93UHJldiA9IGZ1bmN0aW9uIChjb250YWluZXIsIGNoaWxkcmVuKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gJChjb250YWluZXIpLmNoaWxkcmVuKGNoaWxkcmVuKSxcclxuICAgICAgICAgICAgaXRlbUFjdGl2ZSA9IGl0ZW1zLmZpbHRlcihcIi5hY3RpdmVcIiksXHJcbiAgICAgICAgICAgIGl0ZW1QcmV2ID0gaXRlbUFjdGl2ZS5wcmV2KCk7XHJcblxyXG4gICAgICAgIGlmIChpdGVtUHJldi5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBpdGVtcy5sYXN0KCkuYWRkQ2xhc3MoXCJhY3RpdmUtd29ya1wiKTtcclxuICAgICAgICAgICAgaXRlbXMubGFzdCgpLmZhZGVJbih0aW1lSW4pO1xyXG4gICAgICAgICAgICBpdGVtcy5maXJzdCgpLnJlbW92ZUNsYXNzKFwiYWN0aXZlLXdvcmtcIik7XHJcbiAgICAgICAgICAgIGl0ZW1zLmZpcnN0KCkuZmFkZU91dCh0aW1lT3V0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW1QcmV2Lmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICBpdGVtQWN0aXZlLmZhZGVPdXQodGltZU91dCk7XHJcbiAgICAgICAgICAgIGl0ZW1QcmV2LmZhZGVJbih0aW1lSW4pO1xyXG4gICAgICAgICAgICBpdGVtUHJldi5hZGRDbGFzcyhcImFjdGl2ZS13b3JrXCIpO1xyXG4gICAgICAgICAgICBpdGVtUHJldi5uZXh0KCkucmVtb3ZlQ2xhc3MoXCJhY3RpdmUtd29ya1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcudG9nZ2xlX19saW5rLWxlZnQnKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF9tb3ZlVXAoJChcIi5wcmV2XCIpLCBcImRvd25cIik7XHJcbiAgICAgICAgICAgICAgICBfbW92ZVVwKCQoXCIubmV4dFwiKSwgXCJ1cFwiKTtcclxuICAgICAgICAgICAgICAgIF9zaG93TmV4dCgkKFwiLndvcmtfX2Rlc2NyLWNvbnRhaW5lclwiKSwgJChcIi53b3JrX19kZXNjclwiKSk7XHJcbiAgICAgICAgICAgICAgICBfc2hvd05leHQoJChcIi53b3JrX19wcmV2aWV3XCIpLCAkKFwiLndvcmtfX3ByZXZpZXctcGljXCIpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcudG9nZ2xlX19saW5rLXJpZ2h0Jykub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfbW92ZURvd24oJChcIi5wcmV2XCIpLCBcImRvd25cIik7XHJcbiAgICAgICAgICAgICAgICBfbW92ZURvd24oJChcIi5uZXh0XCIpLCBcInVwXCIpO1xyXG4gICAgICAgICAgICAgICAgX3Nob3dQcmV2KCQoXCIud29ya19fZGVzY3ItY29udGFpbmVyXCIpLCAkKFwiLndvcmtfX2Rlc2NyXCIpKTtcclxuICAgICAgICAgICAgICAgIF9zaG93UHJldigkKFwiLndvcmtfX3ByZXZpZXdcIiksICQoXCIud29ya19fcHJldmlldy1waWNcIikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5pZiAoJCgnLndvcmtfX3NsaWRlcicpICE9PSBudWxsKSB7XHJcbiAgICBzbGlkZXIuaW5pdCgpO1xyXG59XHJcbiIsIiIsInZhciBwcmVsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWRlcicpO1xyXG5cclxuaWYgKHByZWxvYWQgIT09IG51bGwpIHByZWxvYWRlci5pbml0KCk7XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAvL0luZGV4IFBhcmFsbGF4XHJcbiAgdmFyIHBhcmFsbGF4ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhcmFsbGF4Jyk7XHJcblxyXG4gIGlmIChwYXJhbGxheCAhPT0gbnVsbCkge1xyXG4gICAgICBtYWluUGFyYWxsYXguaW5pdCgpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vUGFyYWxsYXggaGVhZGVyLCBza2lsbHNcclxuICB2YXIgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmctcGFyYWxsYXgnKSxcclxuICAgICAgc2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNraWxsJyk7XHJcbiAgLy/QpNGD0L3QutGG0LjRjyDRgdC60YDQvtC70LvQsCDRgdGC0YDQsNC90LjRhtGLXHJcbiAgd2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgdmFyIHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG4gICAgICBpZiAoYmcgIT09IG51bGwpIHtcclxuICAgICAgICAgIGhlYWRlclBhcmFsbGF4LmluaXQod1Njcm9sbCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHNraWxscyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgc2tpbGxzRHJhdy5ncm93KCk7XHJcbiAgICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgICAvLyDQodC60YDQvtC70Lsg0L3QsCDQvtC00LjQvSDRjdC60YDQsNC9INCy0L3QuNC3XHJcbiAgICB2YXIgc2Nyb2xsRG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdycpO1xyXG5cclxuICAgIHNjcm9sbERvd24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgc2VjdGlvbiA9IHRoaXMucGFyZW50Tm9kZS5uZXh0U2libGluZy5uZXh0U2libGluZyxcclxuICAgICAgICAgICAgcG9zVG9wID0gc2VjdGlvbi5vZmZzZXRUb3A7XHJcblxyXG4gICAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogcG9zVG9wfSwgMTUwMCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8g0KHQutGA0L7Qu9C7INCy0LLQtdGA0YVcclxuICAgIHZhciBzY3JvbGxVcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy11cCcpO1xyXG5cclxuICAgIHNjcm9sbFVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDEyMDApO1xyXG4gICAgfSk7XHJcblxyXG59O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19
