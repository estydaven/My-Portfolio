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
