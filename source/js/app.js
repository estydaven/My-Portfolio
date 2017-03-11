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







