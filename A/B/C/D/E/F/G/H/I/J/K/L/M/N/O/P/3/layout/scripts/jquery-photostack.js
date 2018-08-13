$(function() {
    /**
     * navR,navL are flags for controlling the categories navigation
     * first gives us the position of the category on the left
     * positions are the left positions for each of the 5 categories displayed at a time
     */
    var navR, navL = false;
    var first = 1;
    var positions = {
        '0': 0,
        '1': 194,
        '2': 388,
        '3': 582,
        '4': 776
    }
    var $categories = $('#categories');
    /**
     * number of categories available
     */
    var elems = $categories.children().length;
    var $slider = $('#slider');
    /**
     * let's position all the categories on the right side of the window
     */
    var hiddenRight = $(window).width() - $categories.offset().left;
    $categories.children('li').css('left', hiddenRight + 'px');
    /**
     * move the first 5 categories to the viewport
     */
    $categories.children('li:lt(5)').each(function(i) {
        var $elem = $(this);
        $elem.animate({
            'left': positions[i] + 'px',
            'opacity': 1
        }, 800, function() {
            if (elems > 5) enableNavRight();
        });
    });
    /**
     * next category
     */
    $slider.find('.next').bind('click', function() {
        if (!$categories.children('li:nth-child(' + parseInt(first + 5) + ')').length || !navR) return;
        disableNavRight();
        disableNavLeft();
        moveRight();
    });
    /**
     * we move the first category (the one on the left) to the left side of the window
     * the next 4 categories slide one position, and finally the next one in the list
     * slides in, to fill the space of the first one
     */
    function moveRight() {
            var hiddenLeft = $categories.offset().left + 163;
            var cnt = 0;
            $categories.children('li:nth-child(' + first + ')').animate({
                'left': -hiddenLeft + 'px',
                'opacity': 0
            }, 500, function() {
                var $this = $(this);
                $categories.children('li').slice(first, parseInt(first + 4)).each(function(i) {
                    var $elem = $(this);
                    $elem.animate({
                        'left': positions[i] + 'px'
                    }, 800, function() {
                        ++cnt;
                        if (cnt == 4) {
                            $categories.children('li:nth-child(' + parseInt(first + 5) + ')').animate({
                                'left': positions[cnt] + 'px',
                                'opacity': 1
                            }, 500, function() {
                                //$this.hide();
                                ++first;
                                if (parseInt(first + 4) < elems) enableNavRight();
                                enableNavLeft();
                            });
                        }
                    });
                });
            });
        }
    /**
    * previous category
    */
    $slider.find('.prev').bind('click', function() {
        if (first == 1 || !navL) return;
        disableNavRight();
        disableNavLeft();
        moveLeft();
    });
    /**
     * we move the last category (the one on the right) to the right side of the window
     * the previous 4 categories slide one position, and finally the previous one in the list
     * slides in, to fill the space of the last one
     */
    function moveLeft() {
            var hiddenRight = $(window).width() - $categories.offset().left;
            var cnt = 0;
            var last = first + 4;
            $categories.children('li:nth-child(' + last + ')').animate({
                'left': hiddenRight + 'px',
                'opacity': 0
            }, 500, function() {
                var $this = $(this);
                $categories.children('li').slice(parseInt(last - 5), parseInt(last - 1)).each(function(i) {
                    var $elem = $(this);
                    $elem.animate({
                        'left': positions[i + 1] + 'px'
                    }, 800, function() {
                        ++cnt;
                        if (cnt == 4) {
                            $categories.children('li:nth-child(' + parseInt(last - 5) + ')').animate({
                                'left': positions[0] + 'px',
                                'opacity': 1
                            }, 500, function() {
                                //$this.hide();
                                --first;
                                enableNavRight();
                                if (first > 1) enableNavLeft();
                            });
                        }
                    });
                });
            });
        }
    /**
    * disable or enable category navigation
    */
    function disableNavRight() {
        navR = false;
        $slider.find('.next').addClass('disabled');
    }

    function disableNavLeft() {
        navL = false;
        $slider.find('.prev').addClass('disabled');
    }

    function enableNavRight() {
        navR = true;
        $slider.find('.next').removeClass('disabled');
    }

    function enableNavLeft() {
        navL = true;
        $slider.find('.prev').removeClass('disabled');
    }
});