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



