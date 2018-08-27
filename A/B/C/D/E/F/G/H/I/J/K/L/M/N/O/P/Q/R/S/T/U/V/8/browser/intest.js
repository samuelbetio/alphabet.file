
    var elemSample = {
        div    : document.createElement('div'),
        img    : document.createElement('img'),
        canvas : document.createElement('canvas'),
        object : document.createElement('object')
    };


    /**
     * Checks if the CSS property may have as a value the CSS function
     * with the given parameters
     * 
     * @param {String} name of the property
     * @param {String} value (or a function name)
     * @param {String} params of a function as example
     * 
     * @returns {Boolean}
     */
    var checkCSSProperty = function(name, value, params) {
        var idx, camel = name;
        while ((idx = camel.indexOf('-')) != -1) {
            camel = camel.slice(0, idx) +
                    camel.slice(idx+1, idx+2).toUpperCase() +
                    camel.slice(idx+2);
        }

        var elem = elemSample.div.cloneNode(false);
        var csstext = name + ': ' + value;
        if (params) {
            csstext += '('+params+')';
        }

        elem.style.cssText = csstext;
        return camel in document.documentElement.style &&
            elem.style[camel].indexOf(value) != '-1';
    }
    
    var IS_FF = typeof InstallTrigger !== 'undefined';
    var IS_IE = /*@cc_on!@*/false || !!document.documentMode;
    var IS_SAFARI =
        Object.prototype.toString.call(window.HTMLElement).
        indexOf('Constructor') > 0;
    var IS_CHROME = !!window.chrome;


    // what is supported by the browser
    var features = {
        classList : !!elemSample.div.classList,
        
        event : !!window.addEventListener,

        canvas : !!elemSample.canvas.getContext,

        isolation : checkCSSProperty('isolation', 'isolate'),
        
        opacity : checkCSSProperty('opacity', '.5'),

        transform : checkCSSProperty(
            'transform', 'translate3d', '0, 0, 0'
        ),

        webkitTransform : checkCSSProperty(
            '-webkit-transform', 'rotate', '-180deg'
        ),

        backgroundCanvas : {
            webkit :
              !!document.getCSSCanvasContext &&
              checkCSSProperty(
                  'background', '-webkit-canvas', 'a'
              ),

            mozElement : checkCSSProperty(
                'background', '-moz-element', '#a'
            )
        },

        gradientMask : {
            alphaFilter : checkCSSProperty(
                'filter',
                'progid:DXImageTransform.Microsoft.Alpha',
                'opacity=100,finishOpacity=0,style=1,'+
                    'startX=0,finishX=1,startY=0,finishY=1'
            ),

            webkit : checkCSSProperty(
                '-webkit-mask-image',
                '-webkit-linear-gradient',
                'top, rgba(0,0,0,1), rgba(0,0,0,0) 100%'
            ),

            svgReuse : IS_FF
        }
    };


    var IS_IE9 = IS_IE && features.gradientMask.alphaFilter;

    var INTENCE_ENABLED = true;

    // implementations to use according to the available features
    var METHODS = {
        // list of element classes
        hasClass : features.classList ? 'classList' : 'className',
        // asynchronous function invocation
        async  : features.event ? 'event' : 'setTimeout',
        // creating own z-index stacking context for an element
        stackingContext : null,
        // rendering a set of image blocks
        blocks : features.webkitTransform ?  'webkitTransform': 'div',
        // applying a transparency gradient mask
        mask   : null,
        // using a canvas element as a background
        canvas : null
    };


    if (features.canvas) {
        if (features.gradientMask.webkit) {
            METHODS.mask = 'webkit';
            METHODS.canvas = features.backgroundCanvas.webkit ?
                'webkit' : 'dataURL';
        } else if (features.gradientMask.svgReuse) {
            if (features.backgroundCanvas.mozElement) {
                METHODS.canvas = 'mozElement';
                METHODS.mask = 'svgReuse';
            } else {
                METHODS.blocks = 'svg';
            }
        } else if (features.gradientMask.alphaFilter) {
            METHODS.canvas = 'dataURL';
            METHODS.mask = 'alphaFilter';
            METHODS.blocks = 'div';
        } else {
            METHODS.blocks = 'svg';
        }

        if (features.isolation) {
            METHODS.stackingContext = 'isolation';
        } else if (!IS_IE9) {
            if (features.transform) {
                METHODS.stackingContext = 'transform';
            } else if (features.opacity) {
                METHODS.stackingContext = 'opacity';
            }
        }  // IE9 messes up indicator filters
    } else {
        // cannot do anything without canvas
        INTENCE_ENABLED = false;
    }

    if (METHODS.blocks == 'svg' && !IS_IE) {
        // svg variant only works reasonably fast in IE
        INTENCE_ENABLED = false;
    }

    // disabling particular browsers
    var UA = navigator.userAgent;
    var match;
    if (
        // supported Opera 15+ does not contain its name in UA
        UA.indexOf('Opera') != -1 ||
        // FF < 8 not supported
        (IS_FF && (match = UA.match(/Firefox\/(\d+)/)) && +match[1] < 8) ||
        // Safari < 7 not supported
        (IS_SAFARI && (match = UA.match(/Version\/(\d+)/)) && +match[1] < 7) ||
        // Chrome on iPad < 15 not supported
        (IS_SAFARI && (match = UA.match(/CriOS\/(\d+)/)) && +match[1] < 15) ||
        // Chrome < 15 not supported
        (IS_CHROME && (match=UA.match(/Chrome\/(\d+)/)) && +match[1] < 15)
    ) {
        INTENCE_ENABLED = false;
    }




var out = [
    'Intence test:',
    'navigator.userAgent: ' + navigator.userAgent,
    '',
    'IS_FF: ' + IS_FF,
    'IS_IE: ' + IS_IE,
    'IS_SAFARI: ' + IS_SAFARI,
    'IS_CHROME: ' + IS_CHROME,
    '',
    'FEATURES:'
];


var f, f2;
for (f in features) {
    if (features.hasOwnProperty(f)) {
        if (typeof features[f] === 'boolean') {
            out.push(f + ': ' + features[f]);
        } else {
            for (f2 in features[f]) {
                if (features[f].hasOwnProperty(f2)) {
                    out.push(f + '.' + f2 + ': ' +features[f][f2]);
                }
            }
        }
    }
}


out.push('', 'METHODS:');

var m;
for (m in METHODS) {
    if (METHODS.hasOwnProperty(m)) {
        out.push(m + ': ' + METHODS[m]);
    }
}

out.push('', 'INTENCE_ENABLED: '+INTENCE_ENABLED);





document.write('<div style="font-family:monospace;">'+out.join('<br/>')+'</div>');