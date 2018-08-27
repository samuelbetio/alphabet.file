
var start = function(){
    var additional = document.getElementById('additional');
    var firts = document.getElementById('first');
    var rombs = document.getElementById('rombs');

    var more = false;

    var max = 2000;

    
    var handle = function() {
        var top = scr.scrollTop;

        if (top > max && !more) {
            more = true;
//            debugger;

//            console.log('more');
            additional.style.display = 'block';

            rombs.removeAttribute('squeezeInfiniteSouth');
            firts.className = 'normal';
            squeeze.resqueeze();
        } else if (top <= max && more) {
            more = false
//            console.log('less');
            additional.style.display = 'none';

            rombs.setAttribute('squeezeInfiniteSouth', '');
            firts.className = 'squeeze normal';
            squeeze.resqueeze();
        }
    }

    var scr;
    scr = document.getElementById('rombs-scroller');
    scr.addEventListener('scroll', handle, false);
}

window.addEventListener("load", start, false);
