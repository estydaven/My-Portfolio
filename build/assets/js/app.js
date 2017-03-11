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


var Validation = (function () {
    var errorField = document.querySelector('.input-error-msg'),
        captchaError = document.querySelector('.welcome__error'),
        formContainer = document.querySelector('.form__container');

    var _init = function (form) {
        var elems = form.elements;

        console.log(elems);
        return _validate(elems) ? true : false;
    };

    function _validate(inputs) {

        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].tagName === 'BUTTON') continue;

            var elem = inputs[i];

            if (elem.value == '') {
                console.log(elem);
                return _showError(elem)
            }

            if (elem.type === 'checkbox' || elem.type === 'radio') {

                if (elem.checked && elem.value === 'yes') {
                    return true;
                }
                if (!elem.checked) {
                    captchaError.style.display = 'flex';
                }
            }
        }

        return true;

    };

    function _showError(elem) {
        var text = elem.getAttribute('placeholder').toLowerCase();
        var position = elem.parentNode.offsetTop + elem.parentNode.offsetHeight;

        elem.parentNode.classList.add('input-group_error');
        errorField.style.display = 'block';
        errorField.innerText = 'Вы не ввели ' + text;

        // if (position > formContainer.offsetHeight)
        errorField.style.top = position + 'px';
    }

    function _clearError(elem) {
        console.log(elem);
        elem.parentNode.classList.remove('input-group_error');
        errorField.style.display = 'none';
    }


    return {
        init: _init,
        clear: _clearError
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
            _move(user, wScroll, 7);
            _move(starsSection, wScroll, 30);
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
        icon: 'assets/img/map-contact.png',
        position: {lat: 53.658348, lng: 23.786986},
        map: map,
        title: "Я здесь!",
        animation: google.maps.Animation.BOUNCE
    });
}

var BlogMenu = (function () {
    var sidebar = document.querySelector('.blog__tabs');

    function _fixMenu() {
        var nav = document.querySelector('.blog__tabs-list'),
            navCoords = sidebar.getBoundingClientRect().top;

        if (window.innerWidth >= 780) {
            if (navCoords <= -50) {
                nav.style.position = 'fixed';
                nav.style.top = '20px';
                nav.style.width = '20%';
            } else {
                nav.style.position = 'static';
                nav.style.width = 'auto';
            }
        } else {
            nav.style.position = 'absolute';
            nav.style.top = '';
            nav.style.width = 'auto';
        }

    }

    function _initActive () {
        var posts = document.querySelectorAll('.post__title'),
            postLinks = document.querySelectorAll('.blog-menu__link'),
            activeLink = document.getElementsByClassName('blog-menu__link_active');


        for (var i = 0; i < posts.length; i++) {
            var post = posts[i],
                postTop = post.getBoundingClientRect().top;

            if (postTop <= 100) {
                activeLink[0].classList.remove('blog-menu__link_active');
                postLinks[i].classList.add('blog-menu__link_active');
            }
        }
    }

    var _openMenu = function () {
        sidebar.classList.add('blog__tabs-active');
    };
    var _closeMenu = function () {
        sidebar.classList.remove('blog__tabs-active');
    };

    return {
        init: _fixMenu,
        initActive: _initActive,
        toggle: function () {
            if (!sidebar.classList.contains('blog__tabs-active')) {
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


var Slider = (function () {
    var items = $('.work-slider__item', '.work-slider__list_next'),
        index = 1,
        ndx,
        duration = 500,
        title = $('.work__title'),
        skills = $('.work__technology'),
        imgContainer = $('.work__pic');

    function _init() {
        var activeItem = items.eq(index),
            imgSrc = activeItem.find('img').attr('src'),
            activeTitle = activeItem.data('title'),
            activeSlill = activeItem.data('technology');

        imgContainer.attr('src', imgSrc);
        title.text(activeTitle);
        skills.text(activeSlill);

        var nextItem = $('.work-slider__item', '.work-slider__list_next').eq(index + 1);
        nextItem.addClass('work-slider__item_current');
        var prevItem = $('.work-slider__item', '.work-slider__list_prev').eq(index - 1);
        prevItem.addClass('work-slider__item_current');
    }

    function animateSlide(ndx, container, direction) {
        var nextItems = $('.work-slider__item', container),
            currentItem = nextItems.filter('.work-slider__item_current'),
            reqItem = nextItems.eq(ndx);
        direction = direction === 'up' ? -100 : 100;

        currentItem.animate({
            'top': direction + '%'
        }, duration);

        reqItem.animate({
            'top': 0
        }, duration, function () {
            currentItem.removeClass('work-slider__item_current').css('top', -direction + '%');
            reqItem.addClass('work-slider__item_current');
        })
    }

    function _moveNext() {
        var container = $('.work-slider__list_next'),
            direction = 'up';

        if (index == items.length - 1) {
            ndx = 0;
        } else if (index < 0) {
            ndx = items.length - 1;
        } else {
            ndx = index + 1;
        }

        animateSlide(ndx, container, direction);
    }

    function _movePrev() {
        var container = $('.work-slider__list_prev'),
            direction = 'down';

        if (index > items.length - 1) {
            ndx = 0;
        } else if (index <= 0) {
            ndx = items.length - 1;
        } else {
            ndx = index - 1;
        }

        animateSlide(ndx, container, direction);
    }

    function _slideShow() {
        var fadedOut = $.Deferred(),
            loaded = $.Deferred(),
            nextSrc = items.eq(index).find('img').attr('src'),
            nextTitle = items.eq(index).data('title'),
            nextSkills = items.eq(index).data('technology');

        _moveNext();
        _movePrev();

        imgContainer.fadeOut(function () {
            title.slideUp();
            skills.fadeOut();
            fadedOut.resolve();
        });

        fadedOut.done(function () {
            title.text(nextTitle);
            skills.text(nextSkills);
            imgContainer.attr('src', nextSrc).on('load', function () {
                loaded.resolve();
            })
        });

        loaded.done(function () {
            title.slideDown();
            skills.fadeIn();
            imgContainer.fadeIn();
        });
    }

    return {
        init: _init,
        move: function () {

            $('.toggle__link').on('click', function (e) {
                e.preventDefault();

                if ($(this).hasClass('toggle__link_next')) {
                    index++;
                } else if ($(this).hasClass('toggle__link_prev')) {
                    index--;
                }

                if (index > items.length - 1) {
                    index = 0;
                } else if (index < 0) {
                    index = items.length - 1;
                }

                _slideShow();

            })
        }
    }
})
();
var preload = document.querySelector('.preloader');

if (preload !== null) preloader.init();

window.onload = function () {



  //Index Parallax
  var parallax = document.querySelector('#parallax');

  if (parallax !== null) {
      mainParallax.init();
  }

    var slider = document.querySelector('.work__slider');

    if (slider !== null) {
        (function () {
            // Slider.init();
            Slider.init();
            Slider.move();
        })();
    }

    var form = document.querySelector('form');

    if (form !== null) {
        //очистка ошибки
        var inputs = form.elements;
        var closeError = document.querySelector('.input-error-captcha__close');

        for (var i = 0; i < inputs.length; i++) {
            inputs[i].onfocus = function() {
                if (this.parentNode.classList.contains('input-group_error')) {
                    Validation.clear(this);
                }
            }
        }

        if (closeError !== null) {
            closeError.onclick = function() {
                closeError.parentNode.parentNode.style.display = 'none';
            };
        }


        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var valid = Validation.init(form);

            console.log(valid);
        })
    }


  //Parallax header, skills
  var bg = document.querySelector('.bg-parallax'),
      skills = document.querySelector('.skill'),
      blogWrapper = document.querySelector('.blog-container');
  //Функция скролла страницы
  window.onscroll = function () {

      var wScroll = window.pageYOffset;

      if (bg !== null) {
          headerParallax.init(wScroll);
      }
      if (skills !== null) {
          skillsDraw.grow();
      }
      if (blogWrapper !== null) {
          BlogMenu.init();
          BlogMenu.initActive();
      }

  };

    var sideMenu = document.querySelector('.sidemenu-btn');

    if (sideMenu !== null) {
        sideMenu.onclick = function () {
            BlogMenu.toggle();
        }
    }

    window.onresize = function () {
        BlogMenu.init();
    }


    // Скролл на один экран вниз
    var scrollDown = document.querySelector('.arrow');
    var scrollUp = document.querySelector('.arrow-up');

    if (scrollDown !== null) {
        scrollDown.addEventListener('click', function (e) {
            e.preventDefault();

            ScrollPage.down(this);
        })
    }
    if (scrollUp !== null) {
        scrollUp.addEventListener('click', function (e) {
            e.preventDefault();

            ScrollPage.up(this);
        })
    }

};








//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZsaXAuanMiLCJmb3Jtcy5qcyIsImZ1bGxzY3JlZW4tbWVudS5qcyIsImhlYWRlci1wYXJhbGxheC5qcyIsIm1hcC5qcyIsIm1lbnUtYmxvZy5qcyIsInBhcmFsbGF4LmpzIiwicHJlbG9hZGVyLmpzIiwic2Nyb2xsLmpzIiwic2tpbGxzLmpzIiwic2xpZGVyLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZmxpcCA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGZsaXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZsaXBwZXJcIiksXHJcbiAgICAgICAgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jLWJ1dHRvblwiKTtcclxuXHJcbiAgICB2YXIgX2xvZ2luID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgZmxpcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBcInJvdGF0ZVkoMTgwZGVnKVwiO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3VzZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgZmxpcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBcInJvdGF0ZVkoMGRlZylcIjtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgT246IF9sb2dpbixcclxuICAgICAgICBPZmY6IF91c2VyXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn0pKCk7XHJcblxyXG52YXIgYnRuT24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmMtYnV0dG9uXCIpLFxyXG4gICAgYnRuT2ZmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXR1cm4tYnRuXCIpO1xyXG5cclxuaWYgKGJ0bk9uICE9PSBudWxsKSB7XHJcbiAgICBidG5Pbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZsaXAuT24oKTtcclxuICAgIH07XHJcblxyXG4gICAgYnRuT2ZmLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZmxpcC5PZmYoKTtcclxuICAgIH07XHJcbn1cclxuXHJcbiIsInZhciBWYWxpZGF0aW9uID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBlcnJvckZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0LWVycm9yLW1zZycpLFxyXG4gICAgICAgIGNhcHRjaGFFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWxjb21lX19lcnJvcicpLFxyXG4gICAgICAgIGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybV9fY29udGFpbmVyJyk7XHJcblxyXG4gICAgdmFyIF9pbml0ID0gZnVuY3Rpb24gKGZvcm0pIHtcclxuICAgICAgICB2YXIgZWxlbXMgPSBmb3JtLmVsZW1lbnRzO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhlbGVtcyk7XHJcbiAgICAgICAgcmV0dXJuIF92YWxpZGF0ZShlbGVtcykgPyB0cnVlIDogZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIF92YWxpZGF0ZShpbnB1dHMpIHtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGlucHV0c1tpXS50YWdOYW1lID09PSAnQlVUVE9OJykgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICB2YXIgZWxlbSA9IGlucHV0c1tpXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlbGVtLnZhbHVlID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlbGVtKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfc2hvd0Vycm9yKGVsZW0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlbGVtLnR5cGUgPT09ICdjaGVja2JveCcgfHwgZWxlbS50eXBlID09PSAncmFkaW8nKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uY2hlY2tlZCAmJiBlbGVtLnZhbHVlID09PSAneWVzJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0Y2hhRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBfc2hvd0Vycm9yKGVsZW0pIHtcclxuICAgICAgICB2YXIgdGV4dCA9IGVsZW0uZ2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gZWxlbS5wYXJlbnROb2RlLm9mZnNldFRvcCArIGVsZW0ucGFyZW50Tm9kZS5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgIGVsZW0ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdpbnB1dC1ncm91cF9lcnJvcicpO1xyXG4gICAgICAgIGVycm9yRmllbGQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgZXJyb3JGaWVsZC5pbm5lclRleHQgPSAn0JLRiyDQvdC1INCy0LLQtdC70LggJyArIHRleHQ7XHJcblxyXG4gICAgICAgIC8vIGlmIChwb3NpdGlvbiA+IGZvcm1Db250YWluZXIub2Zmc2V0SGVpZ2h0KVxyXG4gICAgICAgIGVycm9yRmllbGQuc3R5bGUudG9wID0gcG9zaXRpb24gKyAncHgnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF9jbGVhckVycm9yKGVsZW0pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlbGVtKTtcclxuICAgICAgICBlbGVtLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXQtZ3JvdXBfZXJyb3InKTtcclxuICAgICAgICBlcnJvckZpZWxkLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogX2luaXQsXHJcbiAgICAgICAgY2xlYXI6IF9jbGVhckVycm9yXHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIi8vINCk0YPQu9C70YHQutGA0LjQvSDQvNC10L3RjlxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgJCgnI3RvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQoJyNvdmVybGF5JykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuXHJcblxyXG4iLCIvLyDQn9Cw0YDQsNC70LvQsNC60YEg0LIg0YjQsNC/0LrQtSDRgdCw0LnRgtCwXHJcbnZhciBoZWFkZXJQYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJnLXBhcmFsbGF4Jyk7XHJcbiAgICB2YXIgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyX19oZXJvLXBhcmFsbGF4Jyk7XHJcbiAgICB2YXIgc3RhcnNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJzLXBhcmFsbGF4Jyk7XHJcblxyXG5cclxuICAgIHZhciBfbW92ZSA9IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bnQpIHtcclxuICAgICAgICB2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VudCArICclJztcclxuICAgICAgICB2YXIgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsICcgKyBzdHJhZmUgKyAnLCAwKSc7XHJcblxyXG4gICAgICAgIHZhciBzdHlsZSA9IGJsb2NrLnN0eWxlO1xyXG4gICAgICAgIGlmICh3aW5kb3dTY3JvbGwgPCB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcclxuICAgICAgICAgICAgc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuICAgICAgICAgICAgX21vdmUoYmcsIHdTY3JvbGwsIDQ1KTtcclxuICAgICAgICAgICAgX21vdmUodXNlciwgd1Njcm9sbCwgNyk7XHJcbiAgICAgICAgICAgIF9tb3ZlKHN0YXJzU2VjdGlvbiwgd1Njcm9sbCwgMzApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcbiIsIlxyXG5mdW5jdGlvbiBpbml0TWFwKCkge1xyXG4gICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XHJcbiAgICAgICAgem9vbTogMTMsXHJcbiAgICAgICAgY2VudGVyOiB7bGF0OiA1My42NTgzNDgsIGxuZzogMjMuNzg2OTg2fSxcclxuICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxyXG4gICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcclxuICAgICAgICBzdHlsZXM6W3tcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM0NDQ0NDRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZjJmMmYyXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZFwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJzYXR1cmF0aW9uXCI6LTEwMH0se1wibGlnaHRuZXNzXCI6NDV9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJzaW1wbGlmaWVkXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuYXJ0ZXJpYWxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwidHJhbnNpdFwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwid2F0ZXJcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM0MzY5YWFcIn0se1widmlzaWJpbGl0eVwiOlwib25cIn1dfV1cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICBpY29uOiAnYXNzZXRzL2ltZy9tYXAtY29udGFjdC5wbmcnLFxyXG4gICAgICAgIHBvc2l0aW9uOiB7bGF0OiA1My42NTgzNDgsIGxuZzogMjMuNzg2OTg2fSxcclxuICAgICAgICBtYXA6IG1hcCxcclxuICAgICAgICB0aXRsZTogXCLQryDQt9C00LXRgdGMIVwiLFxyXG4gICAgICAgIGFuaW1hdGlvbjogZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkJPVU5DRVxyXG4gICAgfSk7XHJcbn1cclxuIiwidmFyIEJsb2dNZW51ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsb2dfX3RhYnMnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBfZml4TWVudSgpIHtcclxuICAgICAgICB2YXIgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsb2dfX3RhYnMtbGlzdCcpLFxyXG4gICAgICAgICAgICBuYXZDb29yZHMgPSBzaWRlYmFyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuXHJcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDc4MCkge1xyXG4gICAgICAgICAgICBpZiAobmF2Q29vcmRzIDw9IC01MCkge1xyXG4gICAgICAgICAgICAgICAgbmF2LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcclxuICAgICAgICAgICAgICAgIG5hdi5zdHlsZS50b3AgPSAnMjBweCc7XHJcbiAgICAgICAgICAgICAgICBuYXYuc3R5bGUud2lkdGggPSAnMjAlJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5hdi5zdHlsZS5wb3NpdGlvbiA9ICdzdGF0aWMnO1xyXG4gICAgICAgICAgICAgICAgbmF2LnN0eWxlLndpZHRoID0gJ2F1dG8nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmF2LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgICAgICAgbmF2LnN0eWxlLnRvcCA9ICcnO1xyXG4gICAgICAgICAgICBuYXYuc3R5bGUud2lkdGggPSAnYXV0byc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfaW5pdEFjdGl2ZSAoKSB7XHJcbiAgICAgICAgdmFyIHBvc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvc3RfX3RpdGxlJyksXHJcbiAgICAgICAgICAgIHBvc3RMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ibG9nLW1lbnVfX2xpbmsnKSxcclxuICAgICAgICAgICAgYWN0aXZlTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jsb2ctbWVudV9fbGlua19hY3RpdmUnKTtcclxuXHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9zdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHBvc3QgPSBwb3N0c1tpXSxcclxuICAgICAgICAgICAgICAgIHBvc3RUb3AgPSBwb3N0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuXHJcbiAgICAgICAgICAgIGlmIChwb3N0VG9wIDw9IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlTGlua1swXS5jbGFzc0xpc3QucmVtb3ZlKCdibG9nLW1lbnVfX2xpbmtfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBwb3N0TGlua3NbaV0uY2xhc3NMaXN0LmFkZCgnYmxvZy1tZW51X19saW5rX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBfb3Blbk1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QuYWRkKCdibG9nX190YWJzLWFjdGl2ZScpO1xyXG4gICAgfTtcclxuICAgIHZhciBfY2xvc2VNZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnYmxvZ19fdGFicy1hY3RpdmUnKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBfZml4TWVudSxcclxuICAgICAgICBpbml0QWN0aXZlOiBfaW5pdEFjdGl2ZSxcclxuICAgICAgICB0b2dnbGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFzaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucygnYmxvZ19fdGFicy1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgX29wZW5NZW51KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfY2xvc2VNZW51KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5cclxuXHJcbiIsIi8vINCf0LDRgNCw0LvQu9Cw0LrRgSDQvdCwINCz0LvQsNCy0L3QvtC5XHJcbnZhciBtYWluUGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgXHJcbiAgICB2YXIgX3Nob3cgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciBwYXJhbGxheENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXJhbGxheCcpLFxyXG4gICAgICAgICAgICBsYXllcnMgPSBwYXJhbGxheENvbnRhaW5lci5jaGlsZHJlbjtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHZhciBwYWdlWCA9IGUucGFnZVgsXHJcbiAgICAgICAgICAgICAgICBwYWdlWSA9IGUucGFnZVksXHJcbiAgICAgICAgICAgICAgICBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gcGFnZVgsXHJcbiAgICAgICAgICAgICAgICBpbml0aWFsWSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIHBhZ2VZO1xyXG5cclxuXHJcbiAgICAgICAgICAgIFtdLnNsaWNlLmNhbGwobGF5ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChsYXllciwgaSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxheWVyU3R5bGUgPSBsYXllci5zdHlsZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXZpZGVyID0gaSAvIDQwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvc2l0aW9uID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpICogZGl2aWRlcixcclxuICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsUG9zaXRpb24gPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAqIGRpdmlkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFggKiBkaXZpZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWSA9IGluaXRpYWxZICogZGl2aWRlcixcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoJyArIHBvc2l0aW9uWCArICdweCwnICsgcG9zaXRpb25ZICsgJ3B4LCAwKSc7XHJcblxyXG4gICAgICAgICAgICAgICAgbGF5ZXJTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgICAgICAgICAgICBsYXllclN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICAgICAgICAgIGxheWVyU3R5bGUuYm90dG9tID0gJy0nICsgYm90dG9tUG9zaXRpb24gKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgbGF5ZXJTdHlsZS5sZWZ0ID0gJy0nICsgaG9yaXpvbnRhbFBvc2l0aW9uICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIGxheWVyU3R5bGUucmlnaHQgPSAnLScgKyBob3Jpem9udGFsUG9zaXRpb24gKyAncHgnO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgaW5pdDogX3Nob3dcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG4gICAgXHJcblxyXG4iLCJ2YXIgcHJlbG9hZGVyID0gKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgcGVyY2VudHNUb3RhbCA9IDA7XHJcbiAgICB2YXIgcHJlbG9hZGVyID0gJCgnLnByZWxvYWRlcicpO1xyXG5cclxuICAgIHZhciBpbWdQYXRoID0gJCgnKicpLm1hcChmdW5jdGlvbiAobmR4LCBlbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIGJhY2tncm91bmQgPSAkKGVsZW1lbnQpLmNzcygnYmFja2dyb3VuZC1pbWFnZScpO1xyXG4gICAgICAgIHZhciBpc0ltZyA9ICQoZWxlbWVudCkuaXMoJ2ltZycpO1xyXG4gICAgICAgIHZhciBwYXRoID0gJyc7XHJcblxyXG4gICAgICAgIGlmIChiYWNrZ3JvdW5kICE9ICdub25lJykge1xyXG4gICAgICAgICAgICBwYXRoID0gYmFja2dyb3VuZC5yZXBsYWNlKCd1cmwoXCInLCAnJykucmVwbGFjZSgnXCIpJywgJycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzSW1nKSB7XHJcbiAgICAgICAgICAgIHBhdGggPSAkKGVsZW1lbnQpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhdGgpIHJldHVybiBwYXRoO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIHNldFBlcmNlbnRzID0gZnVuY3Rpb24odG90YWwsIGN1cnJlbnQpIHtcclxuICAgICAgICB2YXIgcGVyY2VudHMgPSBNYXRoLmNlaWwoY3VycmVudCAvIHRvdGFsICogMTAwKTtcclxuXHJcbiAgICAgICAgJCgnLnByZWxvYWRlcl9fcGVyY2VudCcpLnRleHQocGVyY2VudHMgKyAnJScpO1xyXG5cclxuICAgICAgICBpZiAocGVyY2VudHMgPj0gMTAwKSB7XHJcbiAgICAgICAgICAgIHByZWxvYWRlci5mYWRlT3V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgbG9hZEltYWdlcyA9IGZ1bmN0aW9uKGltYWdlcykge1xyXG5cclxuICAgICAgICBpZiAoIWltYWdlcy5sZW5ndGgpIHByZWxvYWRlci5mYWRlT3V0KCk7XHJcblxyXG4gICAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGltZywgaSwgaW1hZ2VzKXtcclxuICAgICAgICAgICAgdmFyIGZha2VJbWFnZSA9ICQoJzxpbWc+Jywge1xyXG4gICAgICAgICAgICAgICAgYXR0ciA6IHtcclxuICAgICAgICAgICAgICAgICAgICBzcmMgOiBpbWdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmYWtlSW1hZ2Uub24oJ2xvYWQgZXJyb3InLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgICAgICAgICAgc2V0UGVyY2VudHMoaW1hZ2VzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBpbWdzID0gaW1nUGF0aC50b0FycmF5KCk7XHJcblxyXG4gICAgICAgICAgICBsb2FkSW1hZ2VzKGltZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSgpKTtcclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICAgcHJlbG9hZGVyLmluaXQoKTtcclxufSk7XHJcbiIsInZhciBTY3JvbGxQYWdlID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbnJldHVybiB7XHJcbmRvd246IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICB2YXIgc2VjdGlvbiA9IGVsZW0ucGFyZW50Tm9kZS5uZXh0U2libGluZy5uZXh0U2libGluZyxcclxuICAgIHBvc1RvcCA9IHNlY3Rpb24ub2Zmc2V0VG9wO1xyXG5cclxuJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBwb3NUb3B9LCAxNTAwKTtcclxufSxcclxuXHJcbnVwOiBmdW5jdGlvbiAoKSB7XHJcbiQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDEyMDApO1xyXG59XHJcbn1cclxufSkoKTtcclxuIiwiLy8g0JDQvdC40LzQsNGG0LjRjyDRgdC60LjQu9C70L7QslxyXG52YXIgc2tpbGxzRHJhdyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNraWxsJyksXHJcbiAgICAgICAgY2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5za2lsbHNfX2NpcmNsZS1hYm92ZScpLFxyXG4gICAgICAgIHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAvLyDQstGL0YfQuNGB0LvQtdC90LjQtSDQtNC70LjQvdGLINC+0LrRgNGD0LbQvdC+0YHRgtC4XHJcbiAgICB2YXIgY2lyY2xlTGVuZ3RoID0gZnVuY3Rpb24gKGNpcmNsZSkge1xyXG4gICAgICAgIHZhciBjaXJjbGVSYWRpdXMgPSBjaXJjbGUuZ2V0QXR0cmlidXRlKCdyJyksXHJcbiAgICAgICAgICAgIGNpcmNsZUxlbmd0aCA9IDIgKiBNYXRoLlBJICogY2lyY2xlUmFkaXVzO1xyXG5cclxuICAgICAgICByZXR1cm4gY2lyY2xlTGVuZ3RoO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyDQv9GA0LjQvNC10L3QtdC90LjQtSDQuiDQvtC60YDRg9C20L3QvtGB0YLQuCDRgdCy0L7QudGB0YLQsiDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxyXG4gICAgW10uc2xpY2UuY2FsbChjaXJjbGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChjaXJjbGUpIHtcclxuXHJcbiAgICAgICAgY2lyY2xlLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBjaXJjbGVMZW5ndGgoY2lyY2xlKTtcclxuICAgICAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaGFycmF5ID0gY2lyY2xlTGVuZ3RoKGNpcmNsZSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8g0LDQvdC40LzQuNGA0L7QstCw0L3QuNC1INC+0LrRgNGD0LbQvdC+0YHRgtC4INCyINC30LDQstC40YHQuNC80L7RgdGC0Lgg0L7RgiDQv9GA0L7RhtC10L3RgtC+0LJcclxuICAgIHZhciBjaXJjbGVBbmltYXRpb24gPSBmdW5jdGlvbiAoc2tpbGwpIHtcclxuXHJcbiAgICAgICAgdmFyIGNpcmNsZUZpbGwgPSBza2lsbC5xdWVyeVNlbGVjdG9yKCcuc2tpbGxzX19jaXJjbGUtYWJvdmUnKSxcclxuICAgICAgICAgICAgc2tpbGxQZXJjZW50ID0gc2tpbGwuZ2V0QXR0cmlidXRlKCdkYXRhLXBlcmNlbnQnKSxcclxuICAgICAgICAgICAgbGVuZ3RoID0gY2lyY2xlTGVuZ3RoKGNpcmNsZUZpbGwpLFxyXG4gICAgICAgICAgICBwZXJjZW50ID0gbGVuZ3RoICogKDEwMCAtIHNraWxsUGVyY2VudCkgLyAxMDA7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjaXJjbGVGaWxsLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBwZXJjZW50O1xyXG4gICAgICAgICAgICBjaXJjbGVGaWxsLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDFzJztcclxuXHJcbiAgICAgICAgICAgIGlmIChza2lsbFBlcmNlbnQgPCA1MCkge1xyXG4gICAgICAgICAgICAgICAgc2tpbGwuc3R5bGUub3BhY2l0eSA9IDAuNDtcclxuICAgICAgICAgICAgICAgIHNraWxsLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDFzJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDUwMCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdyb3c6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIFtdLnNsaWNlLmNhbGwoc2tpbGxzKS5mb3JFYWNoKGZ1bmN0aW9uIChza2lsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjaXJjbGVSZWN0ID0gc2tpbGwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2lyY2xlUG9zID0gY2lyY2xlUmVjdC5ib3R0b20sXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRBbmltYXRpb24gPSBjaXJjbGVQb3MgLSB3aW5kb3dIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0QW5pbWF0aW9uIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjaXJjbGVBbmltYXRpb24oc2tpbGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuXHJcbiIsInZhciBTbGlkZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGl0ZW1zID0gJCgnLndvcmstc2xpZGVyX19pdGVtJywgJy53b3JrLXNsaWRlcl9fbGlzdF9uZXh0JyksXHJcbiAgICAgICAgaW5kZXggPSAxLFxyXG4gICAgICAgIG5keCxcclxuICAgICAgICBkdXJhdGlvbiA9IDUwMCxcclxuICAgICAgICB0aXRsZSA9ICQoJy53b3JrX190aXRsZScpLFxyXG4gICAgICAgIHNraWxscyA9ICQoJy53b3JrX190ZWNobm9sb2d5JyksXHJcbiAgICAgICAgaW1nQ29udGFpbmVyID0gJCgnLndvcmtfX3BpYycpO1xyXG5cclxuICAgIGZ1bmN0aW9uIF9pbml0KCkge1xyXG4gICAgICAgIHZhciBhY3RpdmVJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG4gICAgICAgICAgICBpbWdTcmMgPSBhY3RpdmVJdGVtLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpLFxyXG4gICAgICAgICAgICBhY3RpdmVUaXRsZSA9IGFjdGl2ZUl0ZW0uZGF0YSgndGl0bGUnKSxcclxuICAgICAgICAgICAgYWN0aXZlU2xpbGwgPSBhY3RpdmVJdGVtLmRhdGEoJ3RlY2hub2xvZ3knKTtcclxuXHJcbiAgICAgICAgaW1nQ29udGFpbmVyLmF0dHIoJ3NyYycsIGltZ1NyYyk7XHJcbiAgICAgICAgdGl0bGUudGV4dChhY3RpdmVUaXRsZSk7XHJcbiAgICAgICAgc2tpbGxzLnRleHQoYWN0aXZlU2xpbGwpO1xyXG5cclxuICAgICAgICB2YXIgbmV4dEl0ZW0gPSAkKCcud29yay1zbGlkZXJfX2l0ZW0nLCAnLndvcmstc2xpZGVyX19saXN0X25leHQnKS5lcShpbmRleCArIDEpO1xyXG4gICAgICAgIG5leHRJdGVtLmFkZENsYXNzKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50Jyk7XHJcbiAgICAgICAgdmFyIHByZXZJdGVtID0gJCgnLndvcmstc2xpZGVyX19pdGVtJywgJy53b3JrLXNsaWRlcl9fbGlzdF9wcmV2JykuZXEoaW5kZXggLSAxKTtcclxuICAgICAgICBwcmV2SXRlbS5hZGRDbGFzcygnd29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFuaW1hdGVTbGlkZShuZHgsIGNvbnRhaW5lciwgZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIG5leHRJdGVtcyA9ICQoJy53b3JrLXNsaWRlcl9faXRlbScsIGNvbnRhaW5lciksXHJcbiAgICAgICAgICAgIGN1cnJlbnRJdGVtID0gbmV4dEl0ZW1zLmZpbHRlcignLndvcmstc2xpZGVyX19pdGVtX2N1cnJlbnQnKSxcclxuICAgICAgICAgICAgcmVxSXRlbSA9IG5leHRJdGVtcy5lcShuZHgpO1xyXG4gICAgICAgIGRpcmVjdGlvbiA9IGRpcmVjdGlvbiA9PT0gJ3VwJyA/IC0xMDAgOiAxMDA7XHJcblxyXG4gICAgICAgIGN1cnJlbnRJdGVtLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAndG9wJzogZGlyZWN0aW9uICsgJyUnXHJcbiAgICAgICAgfSwgZHVyYXRpb24pO1xyXG5cclxuICAgICAgICByZXFJdGVtLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAndG9wJzogMFxyXG4gICAgICAgIH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRJdGVtLnJlbW92ZUNsYXNzKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50JykuY3NzKCd0b3AnLCAtZGlyZWN0aW9uICsgJyUnKTtcclxuICAgICAgICAgICAgcmVxSXRlbS5hZGRDbGFzcygnd29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gX21vdmVOZXh0KCkge1xyXG4gICAgICAgIHZhciBjb250YWluZXIgPSAkKCcud29yay1zbGlkZXJfX2xpc3RfbmV4dCcpLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb24gPSAndXAnO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPT0gaXRlbXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICBuZHggPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIG5keCA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmR4ID0gaW5kZXggKyAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbWF0ZVNsaWRlKG5keCwgY29udGFpbmVyLCBkaXJlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF9tb3ZlUHJldigpIHtcclxuICAgICAgICB2YXIgY29udGFpbmVyID0gJCgnLndvcmstc2xpZGVyX19saXN0X3ByZXYnKSxcclxuICAgICAgICAgICAgZGlyZWN0aW9uID0gJ2Rvd24nO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiBpdGVtcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIG5keCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA8PSAwKSB7XHJcbiAgICAgICAgICAgIG5keCA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmR4ID0gaW5kZXggLSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbWF0ZVNsaWRlKG5keCwgY29udGFpbmVyLCBkaXJlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF9zbGlkZVNob3coKSB7XHJcbiAgICAgICAgdmFyIGZhZGVkT3V0ID0gJC5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBsb2FkZWQgPSAkLkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIG5leHRTcmMgPSBpdGVtcy5lcShpbmRleCkuZmluZCgnaW1nJykuYXR0cignc3JjJyksXHJcbiAgICAgICAgICAgIG5leHRUaXRsZSA9IGl0ZW1zLmVxKGluZGV4KS5kYXRhKCd0aXRsZScpLFxyXG4gICAgICAgICAgICBuZXh0U2tpbGxzID0gaXRlbXMuZXEoaW5kZXgpLmRhdGEoJ3RlY2hub2xvZ3knKTtcclxuXHJcbiAgICAgICAgX21vdmVOZXh0KCk7XHJcbiAgICAgICAgX21vdmVQcmV2KCk7XHJcblxyXG4gICAgICAgIGltZ0NvbnRhaW5lci5mYWRlT3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGl0bGUuc2xpZGVVcCgpO1xyXG4gICAgICAgICAgICBza2lsbHMuZmFkZU91dCgpO1xyXG4gICAgICAgICAgICBmYWRlZE91dC5yZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZhZGVkT3V0LmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aXRsZS50ZXh0KG5leHRUaXRsZSk7XHJcbiAgICAgICAgICAgIHNraWxscy50ZXh0KG5leHRTa2lsbHMpO1xyXG4gICAgICAgICAgICBpbWdDb250YWluZXIuYXR0cignc3JjJywgbmV4dFNyYykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBsb2FkZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsb2FkZWQuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRpdGxlLnNsaWRlRG93bigpO1xyXG4gICAgICAgICAgICBza2lsbHMuZmFkZUluKCk7XHJcbiAgICAgICAgICAgIGltZ0NvbnRhaW5lci5mYWRlSW4oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IF9pbml0LFxyXG4gICAgICAgIG1vdmU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy50b2dnbGVfX2xpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCd0b2dnbGVfX2xpbmtfbmV4dCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcygndG9nZ2xlX19saW5rX3ByZXYnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4LS07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gaXRlbXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIF9zbGlkZVNob3coKTtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG4oKTsiLCJ2YXIgcHJlbG9hZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXInKTtcclxuXHJcbmlmIChwcmVsb2FkICE9PSBudWxsKSBwcmVsb2FkZXIuaW5pdCgpO1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblxyXG5cclxuICAvL0luZGV4IFBhcmFsbGF4XHJcbiAgdmFyIHBhcmFsbGF4ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhcmFsbGF4Jyk7XHJcblxyXG4gIGlmIChwYXJhbGxheCAhPT0gbnVsbCkge1xyXG4gICAgICBtYWluUGFyYWxsYXguaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgICB2YXIgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmtfX3NsaWRlcicpO1xyXG5cclxuICAgIGlmIChzbGlkZXIgIT09IG51bGwpIHtcclxuICAgICAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBTbGlkZXIuaW5pdCgpO1xyXG4gICAgICAgICAgICBTbGlkZXIuaW5pdCgpO1xyXG4gICAgICAgICAgICBTbGlkZXIubW92ZSgpO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XHJcblxyXG4gICAgaWYgKGZvcm0gIT09IG51bGwpIHtcclxuICAgICAgICAvL9C+0YfQuNGB0YLQutCwINC+0YjQuNCx0LrQuFxyXG4gICAgICAgIHZhciBpbnB1dHMgPSBmb3JtLmVsZW1lbnRzO1xyXG4gICAgICAgIHZhciBjbG9zZUVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0LWVycm9yLWNhcHRjaGFfX2Nsb3NlJyk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlucHV0c1tpXS5vbmZvY3VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygnaW5wdXQtZ3JvdXBfZXJyb3InKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFZhbGlkYXRpb24uY2xlYXIodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjbG9zZUVycm9yICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNsb3NlRXJyb3Iub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VFcnJvci5wYXJlbnROb2RlLnBhcmVudE5vZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB2YWxpZCA9IFZhbGlkYXRpb24uaW5pdChmb3JtKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZhbGlkKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgLy9QYXJhbGxheCBoZWFkZXIsIHNraWxsc1xyXG4gIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iZy1wYXJhbGxheCcpLFxyXG4gICAgICBza2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2tpbGwnKSxcclxuICAgICAgYmxvZ1dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxvZy1jb250YWluZXInKTtcclxuICAvL9Ck0YPQvdC60YbQuNGPINGB0LrRgNC+0LvQu9CwINGB0YLRgNCw0L3QuNGG0YtcclxuICB3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICB2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcbiAgICAgIGlmIChiZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgaGVhZGVyUGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoc2tpbGxzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBza2lsbHNEcmF3Lmdyb3coKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoYmxvZ1dyYXBwZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgIEJsb2dNZW51LmluaXQoKTtcclxuICAgICAgICAgIEJsb2dNZW51LmluaXRBY3RpdmUoKTtcclxuICAgICAgfVxyXG5cclxuICB9O1xyXG5cclxuICAgIHZhciBzaWRlTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlbWVudS1idG4nKTtcclxuXHJcbiAgICBpZiAoc2lkZU1lbnUgIT09IG51bGwpIHtcclxuICAgICAgICBzaWRlTWVudS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBCbG9nTWVudS50b2dnbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIEJsb2dNZW51LmluaXQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g0KHQutGA0L7Qu9C7INC90LAg0L7QtNC40L0g0Y3QutGA0LDQvSDQstC90LjQt1xyXG4gICAgdmFyIHNjcm9sbERvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJyb3cnKTtcclxuICAgIHZhciBzY3JvbGxVcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy11cCcpO1xyXG5cclxuICAgIGlmIChzY3JvbGxEb3duICE9PSBudWxsKSB7XHJcbiAgICAgICAgc2Nyb2xsRG93bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIFNjcm9sbFBhZ2UuZG93bih0aGlzKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgaWYgKHNjcm9sbFVwICE9PSBudWxsKSB7XHJcbiAgICAgICAgc2Nyb2xsVXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBTY3JvbGxQYWdlLnVwKHRoaXMpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19
