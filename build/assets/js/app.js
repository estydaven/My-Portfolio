// Флип-эффект
var flip = (function () {
    var btn = document.getElementById('#auth'),
        flipper = document.querySelector('.flipper');

    var _auth = function () {
      flipper.style.transform = 'rotateY(180deg)';
      btn.style.display = 'none';
    };

    var _welcome = function () {
        flipper.style.transform = 'rotateY(0deg)';
        btn.style.display = 'block';
    };

    return{
        auth: _auth,
        welcome: _welcome
    }
})();

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

    }

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






var preload = document.querySelector('.preloader');

if (preload !== null) preloader.init();

window.onload = function () {
  console.log('app is ready');

  //Index Parallax
  var parallax = document.querySelector('#parallax');

  if (parallax !== null) {
      mainParallax.init();
  }

  //Flip
  var btnAuth = document.querySelector('.c-button-auth'),
      btnWelcome = document.querySelector('.return-btn');

  if (btnAuth !== null) {
      btnAuth.addEventListener('click', function () {
         flip.auth();
      });
  }

  if (btnWelcome !== null) {
      btnWelcome.addEventListener('click', function () {
         flip.welcome();
      });
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








//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZsaXAuanMiLCJmdWxsc2NyZWVuLW1lbnUuanMiLCJoZWFkZXItcGFyYWxsYXguanMiLCJtYXAuanMiLCJtZW51LWJsb2cuanMiLCJwYXJhbGxheC5qcyIsInByZWxvYWRlci5qcyIsInNraWxscy5qcyIsInNsaWRlci5qcyIsInZhbGlkYXRlLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdEQTtBQUNBO0FDREE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8g0KTQu9C40L8t0Y3RhNGE0LXQutGCXHJcbnZhciBmbGlwID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnI2F1dGgnKSxcclxuICAgICAgICBmbGlwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXBwZXInKTtcclxuXHJcbiAgICB2YXIgX2F1dGggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZsaXBwZXIuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZVkoMTgwZGVnKSc7XHJcbiAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3dlbGNvbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZmxpcHBlci5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWSgwZGVnKSc7XHJcbiAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgYXV0aDogX2F1dGgsXHJcbiAgICAgICAgd2VsY29tZTogX3dlbGNvbWVcclxuICAgIH1cclxufSkoKTtcclxuIiwiLy8g0KTRg9C70LvRgdC60YDQuNC9INC80LXQvdGOXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICAkKCcjdG9nZ2xlJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnI292ZXJsYXknKS50b2dnbGVDbGFzcygnb3BlbicpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG4iLCIvLyDQn9Cw0YDQsNC70LvQsNC60YEg0LIg0YjQsNC/0LrQtSDRgdCw0LnRgtCwXHJcbnZhciBoZWFkZXJQYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJnLXBhcmFsbGF4Jyk7XHJcbiAgICB2YXIgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyX19oZXJvLXBhcmFsbGF4Jyk7XHJcbiAgICB2YXIgc3RhcnNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJzLXBhcmFsbGF4Jyk7XHJcblxyXG5cclxuICAgIHZhciBfbW92ZSA9IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bnQpIHtcclxuICAgICAgICB2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VudCArICclJztcclxuICAgICAgICB2YXIgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsICcgKyBzdHJhZmUgKyAnLCAwKSc7XHJcblxyXG4gICAgICAgIHZhciBzdHlsZSA9IGJsb2NrLnN0eWxlO1xyXG4gICAgICAgIGlmICh3aW5kb3dTY3JvbGwgPCB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcclxuICAgICAgICAgICAgc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuICAgICAgICAgICAgX21vdmUoYmcsIHdTY3JvbGwsIDQ1KTtcclxuICAgICAgICAgICAgX21vdmUodXNlciwgd1Njcm9sbCwgMyk7XHJcbiAgICAgICAgICAgIF9tb3ZlKHN0YXJzU2VjdGlvbiwgd1Njcm9sbCwgMjApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcbiIsIlxyXG5mdW5jdGlvbiBpbml0TWFwKCkge1xyXG4gICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XHJcbiAgICAgICAgem9vbTogMTMsXHJcbiAgICAgICAgY2VudGVyOiB7bGF0OiA1My42NTgzNDgsIGxuZzogMjMuNzg2OTg2fSxcclxuICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxyXG4gICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcclxuICAgICAgICBzdHlsZXM6W3tcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM0NDQ0NDRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZjJmMmYyXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZFwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJzYXR1cmF0aW9uXCI6LTEwMH0se1wibGlnaHRuZXNzXCI6NDV9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJzaW1wbGlmaWVkXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuYXJ0ZXJpYWxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwidHJhbnNpdFwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwid2F0ZXJcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM0MzY5YWFcIn0se1widmlzaWJpbGl0eVwiOlwib25cIn1dfV1cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICBwb3NpdGlvbjoge2xhdDogNTMuNjU4MzQ4LCBsbmc6IDIzLjc4Njk4Nn0sXHJcbiAgICAgICAgbWFwOiBtYXAsXHJcbiAgICAgICAgdGl0bGU6IFwi0K8g0LfQtNC10YHRjCFcIlxyXG4gICAgfSk7XHJcbn1cclxuIiwidmFyIHRhYnMgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBfdG9nZ2xlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJy5ibG9nX190YWJzJykudG9nZ2xlQ2xhc3MoXCJibG9nX190YWJzLWFjdGl2ZVwiKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHJldHVybntcclxuICAgICAgICBpbml0OiBfdG9nZ2xlXHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG52YXIgdGFic0NoZWNrID0gJCgnLmJsb2dfX3RhYnMnKTtcclxuXHJcbmlmKHRhYnNDaGVjayAhPT0gbnVsbCl7XHJcbiAgICB2YXIgdGFic0J0biA9ICQoJy5zaWRlbWVudS1idG4nKTtcclxuXHJcbiAgICB0YWJzQnRuLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0YWJzLmluaXQoKTtcclxuICAgIH0pXHJcbn0iLCIvLyDQn9Cw0YDQsNC70LvQsNC60YEg0L3QsCDQs9C70LDQstC90L7QuVxyXG52YXIgbWFpblBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIFxyXG4gICAgdmFyIF9zaG93ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YXIgcGFyYWxsYXhDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFyYWxsYXgnKSxcclxuICAgICAgICAgICAgbGF5ZXJzID0gcGFyYWxsYXhDb250YWluZXIuY2hpbGRyZW47XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgcGFnZVggPSBlLnBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgcGFnZVkgPSBlLnBhZ2VZLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIHBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBwYWdlWTtcclxuXHJcblxyXG4gICAgICAgICAgICBbXS5zbGljZS5jYWxsKGxheWVycykuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIsIGkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsYXllclN0eWxlID0gbGF5ZXIuc3R5bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGl2aWRlciA9IGkgLyA0MCxcclxuICAgICAgICAgICAgICAgICAgICBib3R0b21Qb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAqIGRpdmlkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWCA9IGluaXRpYWxYICogZGl2aWRlcixcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblkgPSBpbml0aWFsWSAqIGRpdmlkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKCcgKyBwb3NpdGlvblggKyAncHgsJyArIHBvc2l0aW9uWSArICdweCwgMCknO1xyXG5cclxuICAgICAgICAgICAgICAgIGxheWVyU3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgbGF5ZXJTdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgICAgICAgICAgICBsYXllclN0eWxlLmJvdHRvbSA9ICctJyArIGJvdHRvbVBvc2l0aW9uICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIGxheWVyU3R5bGUubGVmdCA9ICctJyArIGhvcml6b250YWxQb3NpdGlvbiArICdweCc7XHJcbiAgICAgICAgICAgICAgICBsYXllclN0eWxlLnJpZ2h0ID0gJy0nICsgaG9yaXpvbnRhbFBvc2l0aW9uICsgJ3B4JztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGluaXQ6IF9zaG93XHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuICAgIFxyXG5cclxuIiwidmFyIHByZWxvYWRlciA9IChmdW5jdGlvbigpe1xyXG4gICAgdmFyIHBlcmNlbnRzVG90YWwgPSAwO1xyXG4gICAgdmFyIHByZWxvYWRlciA9ICQoJy5wcmVsb2FkZXInKTtcclxuXHJcbiAgICB2YXIgaW1nUGF0aCA9ICQoJyonKS5tYXAoZnVuY3Rpb24gKG5keCwgZWxlbWVudCkge1xyXG4gICAgICAgIHZhciBiYWNrZ3JvdW5kID0gJChlbGVtZW50KS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKTtcclxuICAgICAgICB2YXIgaXNJbWcgPSAkKGVsZW1lbnQpLmlzKCdpbWcnKTtcclxuICAgICAgICB2YXIgcGF0aCA9ICcnO1xyXG5cclxuICAgICAgICBpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpIHtcclxuICAgICAgICAgICAgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc0ltZykge1xyXG4gICAgICAgICAgICBwYXRoID0gJChlbGVtZW50KS5hdHRyKCdzcmMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXRoKSByZXR1cm4gcGF0aDtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBzZXRQZXJjZW50cyA9IGZ1bmN0aW9uKHRvdGFsLCBjdXJyZW50KSB7XHJcbiAgICAgICAgdmFyIHBlcmNlbnRzID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XHJcblxyXG4gICAgICAgICQoJy5wcmVsb2FkZXJfX3BlcmNlbnQnKS50ZXh0KHBlcmNlbnRzICsgJyUnKTtcclxuXHJcbiAgICAgICAgaWYgKHBlcmNlbnRzID49IDEwMCkge1xyXG4gICAgICAgICAgICBwcmVsb2FkZXIuZmFkZU91dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgbG9hZEltYWdlcyA9IGZ1bmN0aW9uKGltYWdlcykge1xyXG5cclxuICAgICAgICBpZiAoIWltYWdlcy5sZW5ndGgpIHByZWxvYWRlci5mYWRlT3V0KCk7XHJcblxyXG4gICAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGltZywgaSwgaW1hZ2VzKXtcclxuICAgICAgICAgICAgdmFyIGZha2VJbWFnZSA9ICQoJzxpbWc+Jywge1xyXG4gICAgICAgICAgICAgICAgYXR0ciA6IHtcclxuICAgICAgICAgICAgICAgICAgICBzcmMgOiBpbWdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmYWtlSW1hZ2Uub24oJ2xvYWQgZXJyb3InLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgICAgICAgICAgc2V0UGVyY2VudHMoaW1hZ2VzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGltZ3MgPSBpbWdQYXRoLnRvQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICAgIGxvYWRJbWFnZXMoaW1ncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KCkpO1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICBwcmVsb2FkZXIuaW5pdCgpO1xyXG59KTtcclxuIiwiLy8g0JDQvdC40LzQsNGG0LjRjyDRgdC60LjQu9C70L7QslxyXG52YXIgc2tpbGxzRHJhdyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNraWxsJyksXHJcbiAgICAgICAgY2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5za2lsbHNfX2NpcmNsZS1hYm92ZScpLFxyXG4gICAgICAgIHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAvLyDQstGL0YfQuNGB0LvQtdC90LjQtSDQtNC70LjQvdGLINC+0LrRgNGD0LbQvdC+0YHRgtC4XHJcbiAgICB2YXIgY2lyY2xlTGVuZ3RoID0gZnVuY3Rpb24gKGNpcmNsZSkge1xyXG4gICAgICAgIHZhciBjaXJjbGVSYWRpdXMgPSBjaXJjbGUuZ2V0QXR0cmlidXRlKCdyJyksXHJcbiAgICAgICAgICAgIGNpcmNsZUxlbmd0aCA9IDIgKiBNYXRoLlBJICogY2lyY2xlUmFkaXVzO1xyXG5cclxuICAgICAgICByZXR1cm4gY2lyY2xlTGVuZ3RoO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyDQv9GA0LjQvNC10L3QtdC90LjQtSDQuiDQvtC60YDRg9C20L3QvtGB0YLQuCDRgdCy0L7QudGB0YLQsiDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxyXG4gICAgW10uc2xpY2UuY2FsbChjaXJjbGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChjaXJjbGUpIHtcclxuXHJcbiAgICAgICAgY2lyY2xlLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBjaXJjbGVMZW5ndGgoY2lyY2xlKTtcclxuICAgICAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaGFycmF5ID0gY2lyY2xlTGVuZ3RoKGNpcmNsZSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8g0LDQvdC40LzQuNGA0L7QstCw0L3QuNC1INC+0LrRgNGD0LbQvdC+0YHRgtC4INCyINC30LDQstC40YHQuNC80L7RgdGC0Lgg0L7RgiDQv9GA0L7RhtC10L3RgtC+0LJcclxuICAgIHZhciBjaXJjbGVBbmltYXRpb24gPSBmdW5jdGlvbiAoc2tpbGwpIHtcclxuXHJcbiAgICAgICAgdmFyIGNpcmNsZUZpbGwgPSBza2lsbC5xdWVyeVNlbGVjdG9yKCcuc2tpbGxzX19jaXJjbGUtYWJvdmUnKSxcclxuICAgICAgICAgICAgc2tpbGxQZXJjZW50ID0gc2tpbGwuZ2V0QXR0cmlidXRlKCdkYXRhLXBlcmNlbnQnKSxcclxuICAgICAgICAgICAgbGVuZ3RoID0gY2lyY2xlTGVuZ3RoKGNpcmNsZUZpbGwpLFxyXG4gICAgICAgICAgICBwZXJjZW50ID0gbGVuZ3RoICogKDEwMCAtIHNraWxsUGVyY2VudCkgLyAxMDA7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjaXJjbGVGaWxsLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBwZXJjZW50O1xyXG4gICAgICAgICAgICBjaXJjbGVGaWxsLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDFzJztcclxuXHJcbiAgICAgICAgICAgIGlmIChza2lsbFBlcmNlbnQgPCA1MCkge1xyXG4gICAgICAgICAgICAgICAgc2tpbGwuc3R5bGUub3BhY2l0eSA9IDAuNDtcclxuICAgICAgICAgICAgICAgIHNraWxsLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDFzJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDUwMCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdyb3c6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIFtdLnNsaWNlLmNhbGwoc2tpbGxzKS5mb3JFYWNoKGZ1bmN0aW9uIChza2lsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjaXJjbGVSZWN0ID0gc2tpbGwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2lyY2xlUG9zID0gY2lyY2xlUmVjdC5ib3R0b20sXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRBbmltYXRpb24gPSBjaXJjbGVQb3MgLSB3aW5kb3dIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0QW5pbWF0aW9uIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjaXJjbGVBbmltYXRpb24oc2tpbGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuXHJcbiIsIlxyXG4iLCJcclxuIiwidmFyIHByZWxvYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlbG9hZGVyJyk7XHJcblxyXG5pZiAocHJlbG9hZCAhPT0gbnVsbCkgcHJlbG9hZGVyLmluaXQoKTtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc29sZS5sb2coJ2FwcCBpcyByZWFkeScpO1xyXG5cclxuICAvL0luZGV4IFBhcmFsbGF4XHJcbiAgdmFyIHBhcmFsbGF4ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhcmFsbGF4Jyk7XHJcblxyXG4gIGlmIChwYXJhbGxheCAhPT0gbnVsbCkge1xyXG4gICAgICBtYWluUGFyYWxsYXguaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLy9GbGlwXHJcbiAgdmFyIGJ0bkF1dGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy1idXR0b24tYXV0aCcpLFxyXG4gICAgICBidG5XZWxjb21lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJldHVybi1idG4nKTtcclxuXHJcbiAgaWYgKGJ0bkF1dGggIT09IG51bGwpIHtcclxuICAgICAgYnRuQXV0aC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgZmxpcC5hdXRoKCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaWYgKGJ0bldlbGNvbWUgIT09IG51bGwpIHtcclxuICAgICAgYnRuV2VsY29tZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgZmxpcC53ZWxjb21lKCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy9QYXJhbGxheCBoZWFkZXIsIHNraWxsc1xyXG4gIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iZy1wYXJhbGxheCcpLFxyXG4gICAgICBza2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2tpbGwnKTtcclxuICAvL9Ck0YPQvdC60YbQuNGPINGB0LrRgNC+0LvQu9CwINGB0YLRgNCw0L3QuNGG0YtcclxuICB3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICB2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcbiAgICAgIGlmIChiZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgaGVhZGVyUGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoc2tpbGxzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBza2lsbHNEcmF3Lmdyb3coKTtcclxuICAgICAgfVxyXG4gIH07XHJcblxyXG5cclxuICAgIC8vINCh0LrRgNC+0LvQuyDQvdCwINC+0LTQuNC9INGN0LrRgNCw0L0g0LLQvdC40LdcclxuICAgIHZhciBzY3JvbGxEb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFycm93Jyk7XHJcblxyXG4gICAgc2Nyb2xsRG93bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciBzZWN0aW9uID0gdGhpcy5wYXJlbnROb2RlLm5leHRTaWJsaW5nLm5leHRTaWJsaW5nLFxyXG4gICAgICAgICAgICBwb3NUb3AgPSBzZWN0aW9uLm9mZnNldFRvcDtcclxuXHJcbiAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBwb3NUb3B9LCAxNTAwKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDQodC60YDQvtC70Lsg0LLQstC10YDRhVxyXG4gICAgdmFyIHNjcm9sbFVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFycm93LXVwJyk7XHJcblxyXG4gICAgc2Nyb2xsVXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgMTIwMCk7XHJcbiAgICB9KTtcclxuXHJcbn07XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=
