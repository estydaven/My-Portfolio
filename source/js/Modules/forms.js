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
