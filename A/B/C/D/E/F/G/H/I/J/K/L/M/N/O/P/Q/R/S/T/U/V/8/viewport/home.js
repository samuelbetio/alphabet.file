
function _el(id) {
    return document.getElementById(id);
}

function lim(val, min, max) {
    return Math.max(min, Math.min(max, val));
}


// invoked on page load
function start() {
    window.addEventListener('resize', handle_resize, false);
    handle_resize();

    // let layout update before initializing everything
    setTimeout( function() {
        viewport.reset();

        create_bloomberg();
        create_dailybeast();
        create_icons();
    }, 100 );
}



// creates the bloomberg-style indicator on top of the viewport
function create_bloomberg() {
    _el('article').scroller.addEventListener(
        'scroll', update_bloomberg, false
    );

    update_bloomberg();
}


// updates bloomberg-indicator
function update_bloomberg() {
    var current = _el('article').currentSection;

    if (current) {
        var location = Math.min(
            1, Math.max(0, current.viewportTopLocation)
        );
        var title = current.getAttribute('section_title');
        
        _el('bloomberg_title').innerHTML = 'Now reading: '+title;
        _el('bloomberg_line').style.width = ''+ (location*100) + '%';
    }
}



var dailybeasts = {};


// creates the daisybeasts-style indicator on the right side
function create_dailybeast() {
    var container = _el('dailybeast_container');
    var sections = document.getElementsByClassName('section');

    var i, section, id, title, button, currentMark, indicator, label;
    for (i = 0; i < sections.length; i++) {
        section = sections[i];
        title = section.getAttribute('section_title');
        id = section.getAttribute('id');

        button = document.createElement('div');
        button.className = 'dailybeast_button';

        currentMark = document.createElement('div');
        currentMark.className = 'dailybeast_currentmark';
        
        indicator = document.createElement('div');
        indicator.className = 'dailybeast_indicator';

        label = document.createElement('div');
        label.className = 'dailybeast_label';
        label.innerHTML = title;

        label.addEventListener(
            'click',
            (function(id) {
                 return function() {
                     var target = _el(id).viewportScrollTopTarget;
                     naturalScroll.scrollTop(_el('article'), target);
                 }
            })(id),
            false
        );

        button.appendChild(indicator);
        button.appendChild(currentMark);
        button.appendChild(label);

        container.appendChild(button);

        dailybeasts[id] = {
            currentMark : currentMark,
            indicator : indicator
        };
    }

    _el('article').scroller.addEventListener(
        'scroll', update_dailybeast, false
    );

    update_dailybeast();
}


// updates dailybeasts-style indicator
function update_dailybeast() {
    var current = _el('article').currentSection;
    var sections = document.getElementsByClassName('section');

    var i, section, id, beast, location;
    for (i = 0; i < sections.length; i++) {
        section = sections[i];
        beast = dailybeasts[section.getAttribute('id')];
        
        if (current == section) {
            beast.currentMark.style.opacity = 1;
        } else {
            beast.currentMark.style.opacity = 0;
        }

        location = lim(section.viewportTopLocation, 0, 1);
        beast.indicator.style.width = '' + (location*100) + '%';
    }
}



var icons = {};

// creates icons menu on the left side
function create_icons() {
    var container = _el('icons_container');
    var sections = document.getElementsByClassName('section');

    var i, section, id, icon, block, indicator, position, image;
    for (i = 0; i < sections.length; i++) {
        section = sections[i];
        icon = section.getAttribute('icon');
        id = section.getAttribute('id');

        block = document.createElement('div');
        block.className = 'icon_block';

        indicator = document.createElement('div');
        indicator.className = 'icon_indicator';

        position = document.createElement('div');
        position.className = 'icon_position';

        image = document.createElement('img');
        image.className = 'icon_image';
        image.src = icon;
        image.width = 100;

        image.addEventListener(
            'click',
            (function(id) {
                 return function() {
                     var target = _el(id).viewportScrollTopTarget;
                     naturalScroll.scrollTop(_el('article'), target);
                 }
            })(id),
            false
        );

        indicator.appendChild(position);
        block.appendChild(indicator);
        block.appendChild(image);

        container.appendChild(block);

        icons[id] = {
            indicator : indicator,
            position : position
        };
    }
    
    _el('article').scroller.addEventListener(
        'scroll', update_icons, false
    );

    update_icons();
}


// updates icons and their indicators
function update_icons() {
    var current = _el('article').currentSection;
    var sections = document.getElementsByClassName('section');

    var i, section, id, icon, pos, start, end, size;
    for (i = 0; i < sections.length; i++) {
        section = sections[i];
        icon = icons[section.getAttribute('id')];

        start = lim(section.viewportTopStart, 0, 1);
        end = lim(section.viewportTopEnd, 0, 1);
        size = (end-start)/end;
        icon.indicator.style.height = '' + (end*100) + '%';
        icon.position.style.height = '' + (size*100) + '%';
    }
    
}



// stretches viewport to the 'full' height
function handle_resize() {
    var article = _el('article');
    article.style.height =
        ''+Math.max(500, document.body.clientHeight - 320)+'px';
}



if (document.readyState == "complete") {
    start();
} else {
    window.addEventListener("load", start, false);
}



