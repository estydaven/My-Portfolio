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
