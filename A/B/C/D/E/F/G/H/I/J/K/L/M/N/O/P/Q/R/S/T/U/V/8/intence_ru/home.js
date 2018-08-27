


var _el = function(id) {
    return document.getElementById(id);
}

function start() {
    _el('loading_container').style.display = 'none';

    if (intence.enabled) {
        _el('everything').style.display = 'block';

        DlHighlight.HELPERS.highlightByName('code', 'pre');
        init_intro();
        init_dynamic();
        init_river();
        init_earth();
        init_notext();
        init_nav();


        setTimeout( function() {
            _el('main_scroller').scroller.scrollTop = 0;
        }, 500);

        init_analytics();

    } else {
        _el('not_supported').style.display = 'block';
    }

}



function init_analytics() {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-60744255-1', 'auto');
  ga('send', 'pageview');
}


function init_intro() {
    var example_intro = [
        ['example_intro_text1', 'bottom', 0],
        ['example_intro_text2', 'top', .1],
        ['example_intro_text3', 'top', .37],
        ['example_intro_text4', 'bottom', .68],
        ['example_intro_text5', 'bottom', .98]
    ];

    _el('example_intro_arrow_top').style.opacity = 0;
    _el('example_intro_arrow_bottom').style.opacity = 0;
    for (var i = 0; i < example_intro.length; i++) {
        _el(example_intro[i][0]).style.opacity = 0;
    }

    var ex1_scroller = _el("example_intro_area").scroller;

    var ex1_cur_arrow = null;
    var ex1_cur_annotation = null;
    var ex1_show_annotation = function(num) {
        if (ex1_cur_annotation != num)  {
            if (ex1_cur_annotation !== null) {
                _el(example_intro[ex1_cur_annotation][0]).style.opacity = 0;
            }

            _el(example_intro[num][0]).style.opacity = 1;
            ex1_cur_annotation = num;

            var arrow = example_intro[num][1];

            if (arrow != ex1_cur_arrow) {
                if (ex1_cur_arrow) {
                    _el("example_intro_arrow_"+ex1_cur_arrow).style.opacity = 0;
                }

                _el("example_intro_arrow_"+arrow).style.opacity = 1;
                ex1_cur_arrow = arrow;
            }
        }

    }

    var ex1_onscroll = function() {
        var height = ex1_scroller.getBoundingClientRect().height;
        var full = ex1_scroller.scrollHeight - height;
        var pos = ex1_scroller.scrollTop;
        var rate = pos / full;

        for (var i = example_intro.length-1; i >= 0 ; i--) {
            if (rate >= example_intro[i][2]) {
                ex1_show_annotation(i);
                if (i > 0) {
                    document.getElementById('scroll_me').style.opacity = 0;
                }
                break;
            }
        }

    }

    ex1_scroller.addEventListener(
        'scroll', ex1_onscroll, false
    );

    ex1_onscroll();

}


function init_dynamic() {
    var gIntRoot = _el('goethe_intence');
    var gInt = _el('goethe_intence').scroller;
    var gBar = _el('goethe_bar');

    var points = [];
    var shown = 0;
    var processScroll = function() {
        var height = gInt.getBoundingClientRect().height;
        var full = gInt.scrollHeight - height;
        var pos = gInt.scrollTop;

        if (full-pos < 100 && shown < 4) {
            points[shown++] = pos;
            _el('goethe'+shown+'_intence').style.display = 'block';
            _el('goethe'+shown+'_bar').style.display = 'block';
            if (shown == 4) {
                gIntRoot.removeAttribute('scrollInfiniteSouth');
            }
        } else if (pos < points[shown-1]) {
            _el('goethe'+shown+'_intence').style.display = 'none';
            _el('goethe'+shown+'_bar').style.display = 'none';
            shown--;
            if (shown == 3) {
                gIntRoot.setAttribute('scrollInfiniteSouth', null);
            }
        }
    }

    gInt.addEventListener('scroll', processScroll, false);
}


var init_river = function() {
    var river = _el('river_scroll');
    var river_scroller = _el('river_scroll').scroller;
    var scroll = function(e) {
        if (e.deltaY) {
            river_scroller.scrollLeft += Math.round(e.deltaY/4);
//            river_scroller.scrollLeft += e.deltaY;
            e.preventDefault();
            e.stopPropagation();
        }
    }
    river.addEventListener("wheel", scroll);
}


var init_earth = function() {
    var wheel = function(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    var earth_scroller = _el('earth').scroller;
    earth_scroller.addEventListener("wheel", wheel);
    earth_scroller.addEventListener('scroll', earth_onscroll, false);

    setTimeout( function() {
        earth_scroller.scrollTop = 300;
        earth_scroller.scrollLeft = 1300;
    }, 500);
}


var earth_onscroll = function() {
    var earth = _el('earth');
    var earth_scroller = _el('earth').scroller;
    var earth_inner = _el('earth_inner');

    var width = earth.getBoundingClientRect().width;
    var full = earth_inner.getBoundingClientRect().width;
    var pos = earth_scroller.scrollLeft;
    var lim = 300;
    var offset = 1350;

    if (pos < lim) {
        earth_switch();
        earth_scroller.scrollLeft += offset;
    } else if (full-width-pos < lim) {
        earth_switch();
        earth_scroller.scrollLeft -= offset;
    }

}


var earth_switch = function() {
    var e1 = _el('earth1');
    var e3 = _el('earth3');

    if (e1.style.display == 'block') {
        e1.style.display = 'none';
        e3.style.display = 'block';
    } else {
        e3.style.display = 'none';
        e1.style.display = 'block';
    }
}


function init_notext() {
    var high = _el('notext_high').scroller;
    var low = _el('notext_low').scroller;

    var height = 300;
    var full = 1200;
    var lim = 100;
    var offset = 400;
    var fix_low = function() {
        var pos = low.scrollTop;
        if (pos < lim) {
            low.scrollTop += offset;
        } else if (full-height-pos < lim) {
            low.scrollTop -= offset;
        }
    }

    var fix_high = function() {
        var pos = high.scrollTop;
        if (pos < lim) {
            high.scrollTop += offset;
        } else if (full-height-pos < lim) {
            high.scrollTop -= offset;
        }
    }

    high.addEventListener('scroll', fix_high, false);
    low.addEventListener('scroll', fix_low, false);

    setTimeout( function() {
        high.scrollTop = 400;
    }, 500);
}







var encode = function(str) {
    return str.
        replace(/ /g, '%20').
        replace(/,/g, '%2C').
        replace(/\./g, '%2E').
        replace(/#/g, '%23').
        replace(/:/g, '%3A');
}


var share = function(type) {
    var site = 'http://asvd.github.io/intence_ru/';
    var image = 'http://asvd.github.io/intence_ru/intence_preview.png';
    var name = encode('Интэнс');
    var tag = encode('#intence');
    var comma = encode(', ');
    var dot = encode('. ');
    var semi = encode(': ');
    var subtitle = encode('индикатор прокрутки');
    var description = encode('Полоса прокрутки больше не нужна');


    var url = null;

    switch (type) {
    case 'fb':
        url = 'https://www.facebook.com/sharer/sharer.php?u='+site;
        break;
    case 'vk':
        url = 'https://vk.com/share.php?url='+site+'&title='+name + comma + subtitle+'&description='+description+'&image='+image+'&noparse=true';
        break;
    case 'twitter':
        url = 'https://twitter.com/intent/tweet?text='+tag+comma+subtitle+dot+description+semi+'&url='+site+'';
        break;
    case 'pinterest':
        url = 'https://www.pinterest.com/pin/create/button/?url='+site+'&description='+name + comma + subtitle+ dot +description+dot+'&media='+image+'';
        break;
    case 'googleplus':
        url = 'https://plus.google.com/share?url='+site+'';
        break;
    case 'linkedin':
        url = 'https://www.linkedin.com/shareArticle?mini=true&url='+site+'&title='+name + comma + subtitle+'&summary='+description+'&source='+site+'';
        break;
    case 'xing':
        url = 'https://www.xing-share.com/app/user?op=share;sc_p=xing-share;url='+site+'';
        break;
    }

    popup(url);
}

var popup = function(url) {
    var w = 600, h = 400;
    var dualScreenLeft =
        window.screenLeft !== undefined ?
        window.screenLeft : screen.left;
    var dualScreenTop =
        window.screenTop !== undefined ?
        window.screenTop : screen.top;

    var width = window.innerWidth ?
        window.innerWidth :
        document.documentElement.clientWidth ?
        document.documentElement.clientWidth :
        screen.width;
    var height = window.innerHeight ?
        window.innerHeight :
        document.documentElement.clientHeight ?
        document.documentElement.clientHeight :
        screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 3) - (h / 3)) + dualScreenTop;

    var newWindow = window.open(
        url, 'Intence',
        'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left
    );

    if (window.focus) {
        newWindow.focus();
    }
}


if (document.readyState == "complete") {
    // page has already been loaded
    start();
} else {
    // preserving any existing listener
    var origOnload = window.onload || function(){};

    window.onload = function(){
        start();
    }
}

var menu_items = [];

function init_nav() {
    viewport.reset();

    var container = _el('menu_container');

    var sections = document.getElementsByClassName('section');
    var num = sections.length;

    var item, section;
    for (var i = 0; i < num; i++) {
        section = sections[i];
        item = createMenuItem(section);
        container.appendChild(item.main);

        menu_items.push(item);
    }



    update_container_size();

    window.addEventListener('resize', update_container_size, false);

    _el('main_scroller').scroller.addEventListener(
        'scroll', update_indicator, false
    );


    // otherwise FF does not update for some reason
    setTimeout(function(){
                   viewport.reset();
                   update_indicator();
                         }, 1000);

    setTimeout(function(){
                   viewport.reset();
                   update_indicator();
                         }, 2000);

    setTimeout(function(){
                   viewport.reset();
                   update_indicator();
                         }, 3000);
}

var icon_opacity = .2;

function createMenuItem(section) {
    var dark = section.getAttribute('dark') !== null;

    var main = document.createElement('div');

    main.style.position = 'relative';
    main.style.backgroundColor = dark ?
        'rgba(51, 68, 85, 0.6)' :
        'rgba(246, 255, 251, 0.6)'


    var icon = null;
    var icon_highlight = null;
    var img = section.getAttribute('img');


    if (img) {
        icon = document.createElement('img');
        icon.style.position = 'absolute';
        icon.style.width = '100%';
        icon.style.height = '100%';
        icon.style.opacity = icon_opacity;
        icon.src = img;
        main.appendChild(icon);

        icon_highlight = document.createElement('img');
        icon_highlight.style.position = 'absolute';
        icon_highlight.style.width = '100%';
        icon_highlight.style.height = '100%';
        icon_highlight.style.opacity = 0;
        icon_highlight.src = img;
        main.appendChild(icon_highlight);
    }


    var button = document.createElement('div');
    button.className = 'menu_button';


    button.addEventListener(
        'mouseover',
        function() {
            icon_highlight.style.opacity = 1;
        },
        false
    );

    button.addEventListener(
        'mouseout',
        function() {
            icon_highlight.style.opacity = 0;
        },
        false
    );

    button.addEventListener(
        'mousedown',
        function() {
            icon_highlight.style.opacity = .6;
        },
        false
    );

    button.addEventListener(
        'mouseup',
        function() {
            icon_highlight.style.opacity = 1;
        },
        false
    );

    button.addEventListener(
        'click',
        function() {
            naturalScroll.scrollTop(
                _el('main_scroller'),
                section.viewportScrollTopTarget
            );
        },
        false
    );

    main.appendChild(button);

    return {
        main: main,
        section: section,
        icon : icon,
        icon_highlight : icon_highlight
    };
}



function update_container_size() {
    var container = _el('menu_container');
    var num = menu_items.length;
    var w = document.body.clientWidth;
    var h = document.body.clientHeight;

    var item_size = Math.min(200, Math.floor(h*.8 / num));

    container.style.top = ''+ Math.floor(h*.1) + 'px';

    container.style.height = '' + (item_size * num) + 'px';
    container.style.width = '' + item_size + 'px';

    var i, item;
    for (i = 0; i < num; i++) {
        item = menu_items[i];

        item.main.style.width = ''+(item_size)+'px';
        item.main.style.height = ''+(item_size)+'px';
    }

    update_indicator();
}




function update_indicator() {
    var i, item, intensity;
    for (i = 0; i < menu_items.length; i++) {
        item = menu_items[i];

        intensity =
            lim(item.section.viewportTopEnd, 0, 1) -
            lim(item.section.viewportTopStart, 0, 1);

        item.icon.style.opacity = icon_opacity + (1-icon_opacity) * intensity;
    }
}


function lim(val, min, max) {
    return Math.max(min, Math.min(max, val));
}
