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







