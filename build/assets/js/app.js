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

var menuBlog = (function () {
    var sidebar = document.querySelector('.blog-container');

    var _openMenu = function () {
      sidebar.classList.add('blog-container_shift_right');
    };
    var _closeMenu = function () {
      sidebar.classList.remove('blog-container_shift_right');
    };

    return {
        toggle: function () {
            if (!sidebar.classList.contains('blog-container_shift_right')) {
                _openMenu();
            }
            else {
                _closeMenu();
            }
        }
    }
})();

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

    //Меню блога
    var sideMenu = document.querySelector('.sidemenu-btn');

    if (sideMenu !== null) {
        sideMenu.onclick = function () {
            menuBlog.toggle();
        }
    }
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








//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZsaXAuanMiLCJmdWxsc2NyZWVuLW1lbnUuanMiLCJoZWFkZXItcGFyYWxsYXguanMiLCJtYXAuanMiLCJtZW51LWJsb2cuanMiLCJwYXJhbGxheC5qcyIsInByZWxvYWRlci5qcyIsInNraWxscy5qcyIsInNsaWRlci5qcyIsInZhbGlkYXRlLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3REE7QUFDQTtBQ0RBO0FBQ0E7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vINCk0LvQuNC/LdGN0YTRhNC10LrRglxyXG52YXIgZmxpcCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJyNhdXRoJyksXHJcbiAgICAgICAgZmxpcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwcGVyJyk7XHJcblxyXG4gICAgdmFyIF9hdXRoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBmbGlwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVZKDE4MGRlZyknO1xyXG4gICAgICBidG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIH07XHJcblxyXG4gICAgdmFyIF93ZWxjb21lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZsaXBwZXIuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZVkoMGRlZyknO1xyXG4gICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGF1dGg6IF9hdXRoLFxyXG4gICAgICAgIHdlbGNvbWU6IF93ZWxjb21lXHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIi8vINCk0YPQu9C70YHQutGA0LjQvSDQvNC10L3RjlxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgJCgnI3RvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQoJyNvdmVybGF5JykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcblxyXG5cclxuIiwiLy8g0J/QsNGA0LDQu9C70LDQutGBINCyINGI0LDQv9C60LUg0YHQsNC50YLQsFxyXG52YXIgaGVhZGVyUGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iZy1wYXJhbGxheCcpO1xyXG4gICAgdmFyIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlcl9faGVyby1wYXJhbGxheCcpO1xyXG4gICAgdmFyIHN0YXJzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFycy1wYXJhbGxheCcpO1xyXG5cclxuXHJcbiAgICB2YXIgX21vdmUgPSBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XHJcbiAgICAgICAgdmFyIHN0cmFmZSA9IHdpbmRvd1Njcm9sbCAvIC1zdHJhZmVBbW91bnQgKyAnJSc7XHJcbiAgICAgICAgdmFyIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCAnICsgc3RyYWZlICsgJywgMCknO1xyXG5cclxuICAgICAgICB2YXIgc3R5bGUgPSBibG9jay5zdHlsZTtcclxuICAgICAgICBpZiAod2luZG93U2Nyb2xsIDwgd2luZG93LmlubmVySGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICAgICAgc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcbiAgICAgICAgICAgIF9tb3ZlKGJnLCB3U2Nyb2xsLCA0NSk7XHJcbiAgICAgICAgICAgIF9tb3ZlKHVzZXIsIHdTY3JvbGwsIDMpO1xyXG4gICAgICAgICAgICBfbW92ZShzdGFyc1NlY3Rpb24sIHdTY3JvbGwsIDIwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG4iLCJcclxuZnVuY3Rpb24gaW5pdE1hcCgpIHtcclxuICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xyXG4gICAgICAgIHpvb206IDEzLFxyXG4gICAgICAgIGNlbnRlcjoge2xhdDogNTMuNjU4MzQ4LCBsbmc6IDIzLjc4Njk4Nn0sXHJcbiAgICAgICAgZGlzYWJsZURlZmF1bHRVSTogdHJ1ZSxcclxuICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXHJcbiAgICAgICAgc3R5bGVzOlt7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDQ0NDQ0XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2YyZjJmMlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2lcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWRcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOi0xMDB9LHtcImxpZ2h0bmVzc1wiOjQ1fV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmhpZ2h3YXlcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwic2ltcGxpZmllZFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmFydGVyaWFsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLmljb25cIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInRyYW5zaXRcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDM2OWFhXCJ9LHtcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX1dXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgcG9zaXRpb246IHtsYXQ6IDUzLjY1ODM0OCwgbG5nOiAyMy43ODY5ODZ9LFxyXG4gICAgICAgIG1hcDogbWFwLFxyXG4gICAgICAgIHRpdGxlOiBcItCvINC30LTQtdGB0YwhXCJcclxuICAgIH0pO1xyXG59XHJcbiIsInZhciBtZW51QmxvZyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nLWNvbnRhaW5lcicpO1xyXG5cclxuICAgIHZhciBfb3Blbk1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LmFkZCgnYmxvZy1jb250YWluZXJfc2hpZnRfcmlnaHQnKTtcclxuICAgIH07XHJcbiAgICB2YXIgX2Nsb3NlTWVudSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdibG9nLWNvbnRhaW5lcl9zaGlmdF9yaWdodCcpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRvZ2dsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIXNpZGViYXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdibG9nLWNvbnRhaW5lcl9zaGlmdF9yaWdodCcpKSB7XHJcbiAgICAgICAgICAgICAgICBfb3Blbk1lbnUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF9jbG9zZU1lbnUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuIiwiLy8g0J/QsNGA0LDQu9C70LDQutGBINC90LAg0LPQu9Cw0LLQvdC+0LlcclxudmFyIG1haW5QYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBcclxuICAgIHZhciBfc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIHBhcmFsbGF4Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcmFsbGF4JyksXHJcbiAgICAgICAgICAgIGxheWVycyA9IHBhcmFsbGF4Q29udGFpbmVyLmNoaWxkcmVuO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIHBhZ2VYID0gZS5wYWdlWCxcclxuICAgICAgICAgICAgICAgIHBhZ2VZID0gZS5wYWdlWSxcclxuICAgICAgICAgICAgICAgIGluaXRpYWxYID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgLSBwYWdlWCxcclxuICAgICAgICAgICAgICAgIGluaXRpYWxZID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gcGFnZVk7XHJcblxyXG5cclxuICAgICAgICAgICAgW10uc2xpY2UuY2FsbChsYXllcnMpLmZvckVhY2goZnVuY3Rpb24gKGxheWVyLCBpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGF5ZXJTdHlsZSA9IGxheWVyLnN0eWxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpdmlkZXIgPSBpIC8gNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9zaXRpb24gPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxQb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpICogZGl2aWRlcixcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIGRpdmlkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgnICsgcG9zaXRpb25YICsgJ3B4LCcgKyBwb3NpdGlvblkgKyAncHgsIDApJztcclxuXHJcbiAgICAgICAgICAgICAgICBsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICAgICAgICAgIGxheWVyU3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgbGF5ZXJTdHlsZS5ib3R0b20gPSAnLScgKyBib3R0b21Qb3NpdGlvbiArICdweCc7XHJcbiAgICAgICAgICAgICAgICBsYXllclN0eWxlLmxlZnQgPSAnLScgKyBob3Jpem9udGFsUG9zaXRpb24gKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgbGF5ZXJTdHlsZS5yaWdodCA9ICctJyArIGhvcml6b250YWxQb3NpdGlvbiArICdweCc7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuICAgICAgICBpbml0OiBfc2hvd1xyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbiAgICBcclxuXHJcbiIsIlxyXG4iLCIvLyDQkNC90LjQvNCw0YbQuNGPINGB0LrQuNC70LvQvtCyXHJcbnZhciBza2lsbHNEcmF3ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBza2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2tpbGwnKSxcclxuICAgICAgICBjaXJjbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNraWxsc19fY2lyY2xlLWFib3ZlJyksXHJcbiAgICAgICAgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgIC8vINCy0YvRh9C40YHQu9C10L3QuNC1INC00LvQuNC90Ysg0L7QutGA0YPQttC90L7RgdGC0LhcclxuICAgIHZhciBjaXJjbGVMZW5ndGggPSBmdW5jdGlvbiAoY2lyY2xlKSB7XHJcbiAgICAgICAgdmFyIGNpcmNsZVJhZGl1cyA9IGNpcmNsZS5nZXRBdHRyaWJ1dGUoJ3InKSxcclxuICAgICAgICAgICAgY2lyY2xlTGVuZ3RoID0gMiAqIE1hdGguUEkgKiBjaXJjbGVSYWRpdXM7XHJcblxyXG4gICAgICAgIHJldHVybiBjaXJjbGVMZW5ndGg7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vINC/0YDQuNC80LXQvdC10L3QuNC1INC6INC+0LrRgNGD0LbQvdC+0YHRgtC4INGB0LLQvtC50YHRgtCyINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXHJcbiAgICBbXS5zbGljZS5jYWxsKGNpcmNsZXMpLmZvckVhY2goZnVuY3Rpb24gKGNpcmNsZSkge1xyXG5cclxuICAgICAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IGNpcmNsZUxlbmd0aChjaXJjbGUpO1xyXG4gICAgICAgIGNpcmNsZS5zdHlsZS5zdHJva2VEYXNoYXJyYXkgPSBjaXJjbGVMZW5ndGgoY2lyY2xlKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDQsNC90LjQvNC40YDQvtCy0LDQvdC40LUg0L7QutGA0YPQttC90L7RgdGC0Lgg0LIg0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDQvtGCINC/0YDQvtGG0LXQvdGC0L7QslxyXG4gICAgdmFyIGNpcmNsZUFuaW1hdGlvbiA9IGZ1bmN0aW9uIChza2lsbCkge1xyXG5cclxuICAgICAgICB2YXIgY2lyY2xlRmlsbCA9IHNraWxsLnF1ZXJ5U2VsZWN0b3IoJy5za2lsbHNfX2NpcmNsZS1hYm92ZScpLFxyXG4gICAgICAgICAgICBza2lsbFBlcmNlbnQgPSBza2lsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGVyY2VudCcpLFxyXG4gICAgICAgICAgICBsZW5ndGggPSBjaXJjbGVMZW5ndGgoY2lyY2xlRmlsbCksXHJcbiAgICAgICAgICAgIHBlcmNlbnQgPSBsZW5ndGggKiAoMTAwIC0gc2tpbGxQZXJjZW50KSAvIDEwMDtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNpcmNsZUZpbGwuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IHBlcmNlbnQ7XHJcbiAgICAgICAgICAgIGNpcmNsZUZpbGwuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMnO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNraWxsUGVyY2VudCA8IDUwKSB7XHJcbiAgICAgICAgICAgICAgICBza2lsbC5zdHlsZS5vcGFjaXR5ID0gMC40O1xyXG4gICAgICAgICAgICAgICAgc2tpbGwuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgNTAwKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ3JvdzogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgW10uc2xpY2UuY2FsbChza2lsbHMpLmZvckVhY2goZnVuY3Rpb24gKHNraWxsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNpcmNsZVJlY3QgPSBza2lsbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICAgICAgICAgICAgICBjaXJjbGVQb3MgPSBjaXJjbGVSZWN0LmJvdHRvbSxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydEFuaW1hdGlvbiA9IGNpcmNsZVBvcyAtIHdpbmRvd0hlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhcnRBbmltYXRpb24gPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNpcmNsZUFuaW1hdGlvbihza2lsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxuIiwiXHJcbiIsIlxyXG4iLCJ3aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gIGNvbnNvbGUubG9nKCdhcHAgaXMgcmVhZHknKTtcclxuXHJcbiAgLy9JbmRleCBQYXJhbGxheFxyXG4gIHZhciBwYXJhbGxheCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXJhbGxheCcpO1xyXG5cclxuICBpZiAocGFyYWxsYXggIT09IG51bGwpIHtcclxuICAgICAgbWFpblBhcmFsbGF4LmluaXQoKTtcclxuICB9XHJcblxyXG4gIC8vRmxpcFxyXG4gIHZhciBidG5BdXRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtYnV0dG9uLWF1dGgnKSxcclxuICAgICAgYnRuV2VsY29tZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXR1cm4tYnRuJyk7XHJcblxyXG4gIGlmIChidG5BdXRoICE9PSBudWxsKSB7XHJcbiAgICAgIGJ0bkF1dGguYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgIGZsaXAuYXV0aCgpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGlmIChidG5XZWxjb21lICE9PSBudWxsKSB7XHJcbiAgICAgIGJ0bldlbGNvbWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgIGZsaXAud2VsY29tZSgpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vUGFyYWxsYXggaGVhZGVyLCBza2lsbHNcclxuICB2YXIgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmctcGFyYWxsYXgnKSxcclxuICAgICAgc2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNraWxsJyk7XHJcbiAgLy/QpNGD0L3QutGG0LjRjyDRgdC60YDQvtC70LvQsCDRgdGC0YDQsNC90LjRhtGLXHJcbiAgd2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgdmFyIHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG4gICAgICBpZiAoYmcgIT09IG51bGwpIHtcclxuICAgICAgICAgIGhlYWRlclBhcmFsbGF4LmluaXQod1Njcm9sbCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHNraWxscyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgc2tpbGxzRHJhdy5ncm93KCk7XHJcbiAgICAgIH1cclxuICB9O1xyXG5cclxuICAgIC8v0JzQtdC90Y4g0LHQu9C+0LPQsFxyXG4gICAgdmFyIHNpZGVNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGVtZW51LWJ0bicpO1xyXG5cclxuICAgIGlmIChzaWRlTWVudSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHNpZGVNZW51Lm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG1lbnVCbG9nLnRvZ2dsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vINCh0LrRgNC+0LvQuyDQvdCwINC+0LTQuNC9INGN0LrRgNCw0L0g0LLQvdC40LdcclxuICAgIHZhciBzY3JvbGxEb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFycm93Jyk7XHJcblxyXG4gICAgc2Nyb2xsRG93bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciBzZWN0aW9uID0gdGhpcy5wYXJlbnROb2RlLm5leHRTaWJsaW5nLm5leHRTaWJsaW5nLFxyXG4gICAgICAgICAgICBwb3NUb3AgPSBzZWN0aW9uLm9mZnNldFRvcDtcclxuXHJcbiAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBwb3NUb3B9LCAxNTAwKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDQodC60YDQvtC70Lsg0LLQstC10YDRhVxyXG4gICAgdmFyIHNjcm9sbFVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFycm93LXVwJyk7XHJcblxyXG4gICAgc2Nyb2xsVXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgMTIwMCk7XHJcbiAgICB9KTtcclxuXHJcbn07XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=
