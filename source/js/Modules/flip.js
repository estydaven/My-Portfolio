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

