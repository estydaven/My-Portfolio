var slider = (function () {
    var timeIn = 1000,
        timeOut = 2000;

    var _moveUp = function (container, direction) {
        var items = $(container).children('.toggle__pic'),
            itemActive = items.filter('.active-work'),
            itemNext = itemActive.next(),
            directions = direction == 'down' ? 100 : -100;

        if (itemNext.length == 0) {
            items.first().addClass('active-work');
            items.last().removeClass('active-work');
            items.first().css('top', '0');
        }

        itemActive.animate({
           'top': directions + '%'
        }, timeIn);

        itemNext.animate({
            'top': '0'
        }, timeIn, function () {
            itemActive.removeClass('active-work');
            $(this).addClass('active-work');
        });
    };

    var _moveDown = function (container, direction) {
      var items = $(container).children('.toggle__pic'),
          itemActive = items.filter('.active-work'),
          itemPrev = itemActive.prev(),
          directions = direction == 'down' ? 100 : -100;

        if (itemPrev.length == 0) {
            items.last().addClass("active-work");
            items.first().removeClass("active-work");
            items.last().css("top", "0");
        }

        itemActive.animate({
            "top": directions + "%"
        }, timeIn);

        itemPrev.animate({
            'top': "0"
        }, timeIn, function () {
            itemActive.removeClass("active-work");
            $(this).addClass("active-work");
        });
    };

    var _showNext = function (container, children) {
        var items = $(container).children(children),
            itemActive = items.filter(".active-work"),
            itemNext = itemActive.next();

        if (itemNext.length == 0) {
            items.first().addClass("active-work");
            items.first().fadeIn(timeIn);
            items.last().removeClass("active-work");
            items.last().fadeOut(timeOut);
        } else if (itemNext.length !== 0) {
            itemActive.fadeOut(timeOut);
            itemNext.fadeIn(timeIn);
            itemNext.addClass("active-work");
            itemNext.prev().removeClass("active-work");
        }
    };

    var _showPrev = function (container, children) {
        var items = $(container).children(children),
            itemActive = items.filter(".active"),
            itemPrev = itemActive.prev();

        if (itemPrev.length == 0) {
            items.last().addClass("active-work");
            items.last().fadeIn(timeIn);
            items.first().removeClass("active-work");
            items.first().fadeOut(timeOut);
        } else if (itemPrev.length !== 0) {
            itemActive.fadeOut(timeOut);
            itemPrev.fadeIn(timeIn);
            itemPrev.addClass("active-work");
            itemPrev.next().removeClass("active-work");
        }
    };

    return {
        init: function () {
            $('.toggle__link-left').on("click", function () {
                _moveUp($(".prev"), "down");
                _moveUp($(".next"), "up");
                _showNext($(".work__descr-container"), $(".work__descr"));
                _showNext($(".work__preview"), $(".work__preview-pic"));
            });

            $('.toggle__link-right').on("click", function () {
                _moveDown($(".prev"), "down");
                _moveDown($(".next"), "up");
                _showPrev($(".work__descr-container"), $(".work__descr"));
                _showPrev($(".work__preview"), $(".work__preview-pic"));
            });
        }
    }
})();

if ($('.work__slider') !== null) {
    slider.init();
}
