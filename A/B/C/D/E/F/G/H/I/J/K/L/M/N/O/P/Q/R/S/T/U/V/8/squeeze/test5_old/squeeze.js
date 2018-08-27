/**
 * @fileoverview squeeze - scrolling indicaton
 * @version 0.1.0
 * 
 * @license MIT, see http://github.com/asvd/squeeze
 * Copyright (c) 2014 asvd <heliosframework@gmail.com> 
 * 
 */


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.squeeze = {}));
    }
}(this,
function (exports) {

    // squeeze factor at the last frame
    var MAXSQUEEZE = 1000;
    var BLOCKSNUM = 1+Math.ceil(Math.log(MAXSQUEEZE)/Math.log(4));

    // gradient mask speed coefficient
    var MASK_SLOWNESS = 4000;



    // Duck-typing feature detection

    /**
     * Checks if the CSS property can have the CSS function with the
     * given name as a value
     * 
     * @param {String} name of the property
     * @param {String} func
     * @param {String} params of a function as example
     * 
     * @returns {Boolean}
     */
    var checkCssProperty = function(name, func, params) {
        var idx, camel = name;
        while ((idx = camel.indexOf('-')) != -1) {
            camel = camel.slice(0, idx) +
                    camel.slice(idx+1, idx+2).toUpperCase() +
                    camel.slice(idx+2);
        }

        var elem = document.createElement('div')
        elem.style.cssText = name + ': ' + func + '('+params+')';
        return camel in document.documentElement.style &&
            elem.style[camel].indexOf(func) != '-1';
    }


    var IS_IE = /*@cc_on!@*/false || !!document.documentMode;

    // list of features supported by the browser
    var features = {
        event : !!window.addEventListener,

        canvas : !!document.createElement("canvas").getContext,

        backgroundCanvas : {
            webkit :
              !!document.getCSSCanvasContext &&
              checkCssProperty(
                  'background', '-webkit-canvas', 'a'
              ),

            mozElement : checkCssProperty(
                'background', '-moz-element', '#a'
            )
        },

        gradientMask : {
            alphaFilter : checkCssProperty(
                'filter',
                'progid:DXImageTransform.Microsoft.Alpha',
                'opacity=100,finishOpacity=0,style=1,'+
                    'startX=0,finishX=1,startY=0,finishY=1'
            ),

            webkit : checkCssProperty(
                '-webkit-mask-image',
                '-webkit-linear-gradient',
                'top, rgba(0,0,0,1), rgba(0,0,0,0) 100%'
            ),

            // check against firefox actually
            svgReuse : typeof InstallTrigger !== 'undefined'
        }
    };


    // implementations to use according to the available features

    var SQUEEZE_ENABLED = true;
    var METHODS = {
        async  : features.event ? 'event' : 'setTimeout',
        mask   : null,
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
                METHODS.canvas = 'svg';
                METHODS.mask = 'svg';
            }
        } else if (features.gradientMask.alphaFilter) {
            METHODS.canvas = 'dataURL';
            METHODS.mask = 'alphaFilter';
        } else {
            METHODS.canvas = 'svg';
            METHODS.mask = 'svg';
        }
    } else {
        // cannot do anything without canvas
        SQUEEZE_ENABLED = false;
    }
    
 METHODS.canvas = 'svg';
 METHODS.mask = 'svg';

    
    // string unique within a session
    var UNIQUE = 'squeeze-unique-' + (new Date().getTime());


    var util = {};

    util.dir = ['north','east','south','west'];

    util.sample = {
        div    : document.createElement('div'),
        img    : document.createElement('img'),
        canvas : document.createElement('canvas'),
        object : document.createElement('object')
    };


    /**
     * Checks if the given element has the given class
     * 
     * @param {Element} elem to check against having the class
     * @param {String} cls class name
     */
    util.hasClass = function(elem, cls) {
        var result = false;
        var list = elem.classList;
        for (var i = 0; i < list.length; i++){
            if (list[i] == cls) {
                result = true;
                break;
            }
        }

        return result;
    }


    /**
     * Applies the style to the element
     * 
     * @param {Element} elem to apply style to
     * @param {Object} style
     */
    util.setStyle = function(elem, style) {
        for (var key in style) {
            if (style.hasOwnProperty(key)) {
                elem.style[key] = style[key];
            }
        }
    }
    
    
    /**
     * Removes all child nodes from the given element, and returns
     * those as array
     * 
     * @param {Element} elem to remove nodes from
     * 
     * @returns {Array} nodes removed from the element
     */
    util.detachChildren = function(elem) {
        var detached = [];

        while (elem.firstChild) {
            detached.push(elem.removeChild(elem.firstChild));
        }

        return detached;
    }


    /**
     * Attaches the given set of nodes to the given element
     * 
     * @param {Element} elem to attach nodes to
     * @param {Array} nodes to attach as children
     */
    util.attachChildren = function(elem, nodes) {
        for (var i = 0; i < nodes.length; i++) {
            elem.appendChild(nodes[i]);
        }
    }


    /**
     * Returns the string with the first letter capitalized
     * 
     * @param {String} str
     * @returns {String}
     */
    util.cap1 = function(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    /**
     * Creates and returns a new SVG element
     * 
     * @param {String} name of the SVG element to create
     * @param {Element} parent element
     * @param {Object} attrs attributes for the new element
     * 
     * @returns {Element} newly created SVG element
     */
    util._svgNS = 'http://www.w3.org/2000/svg';
    util._xlinkNS = 'http://www.w3.org/1999/xlink';
    util.genSVGElement = function(name, parent, attrs) {
        var elem = document.createElementNS(util._svgNS, name);

        if (attrs) {
            for (var key in attrs) {
                if (attrs.hasOwnProperty(key)) {
                    if (key.indexOf('xlink') != -1) {
                        elem.setAttributeNS(
                            util._xlinkNS, key, attrs[key]
                        );
                    } else {
                        elem.setAttribute(key, attrs[key]);
                    }
                }
            }
        }

        if (parent) {
            parent.appendChild(elem);
        }

        return elem;
    }


    /**
     * Creates and returns a new canvas element
     * 
     * @param {Number} w width
     * @param {Number} h height
     * 
     * @returns {Element} created canvas element
     */
    util.genCanvas = function(w,h) {
        var canvas = util.sample.canvas.cloneNode(false);
        canvas.width = w;
        canvas.height = h;
        util.setStyle(canvas, {
            width   : w,
            height  : h,
            display : 'none'
        });

        return canvas;
    }


    /**
     * Produces the canvas element containing the image from the given
     * img element
     * 
     * @param {Element} img
     * 
     * @returns {Element} canvas
     */
    util.img2canvas = function(img) {
        var canvas = util.genCanvas(img.width, img.height);
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img,0,0);
        return canvas;
    }



    /**
     * Generates a linearGradient SVG element in the given direction
     * 
     * @param {Element} paretn parent element (defs)
     * @param {String} dir gradient direction (north, east, ...)
     * @param {String} id of the gradient to assign
     * 
     * @returns {Element} generated element
     */
    util.genSVGLinearGradient = function(parent, dir, id) {
        var full = {
            north : 'y2',
            east  : 'x1',
            south : 'y1',
            west  : 'x2'
        };

        var gradientAttr = {
            id : id,
            x1: '0%',
            y1: '0%',
            x2: '0%',
            y2: '0%'
        };

        gradientAttr[full[dir]] = '100%';

        var linearGradient = util.genSVGElement(
            'linearGradient', parent, gradientAttr
        );

        var stop1 = util.genSVGElement(
            'stop', linearGradient, {
                'stop-color': 'white',
                offset: '0%'
            }
        );

        var stop2 = util.genSVGElement(
            'stop', linearGradient, {
                'stop-color': 'black',
                offset: '100%'
            }
        );

        return linearGradient;
    }



    // applying a transparency mask in different browsers

    var gradientMask = {};

    /**
     * Generates an SVG image containing a gradient mask
     * 
     * @param {String} dir direction of the mask gradient
     * 
     * @return {String} mask id to reuse
     */
    var genMaskSVG = function(dir) {
        var id = 'svg-mask-'+dir+'-'+UNIQUE;
        var maskId = 'mask-'+id;
        var gradientId = 'gradient-'+id;

        var svg = util.genSVGElement('svg');
        var defs = util.genSVGElement('defs', svg);

        var linearGradient = util.genSVGLinearGradient(
            defs, dir, gradientId
        );

        var mask = util.genSVGElement(
            'mask', defs, {
                id               : maskId,
                maskUnits        : 'objectBoundingBox',
                maskContentUnits : 'objectBoundingBox'
            }
        );

        var rect = util.genSVGElement(
            'rect', mask, {
                y      : '0',
                width  : '1',
                height : '1',
                fill   : 'url(#'+gradientId+')'
            }
        );

        util.setStyle(svg, {
            position : 'absolute',
            width    : 0,
            height   : 0
        });

        document.body.appendChild(svg);

        return maskId;
    }

    var svgMaskIds = {
        north : null,
        east  : null,
        south : null,
        west  : null
    };

    /**
     * Creates gradient mask on the given component
     * 
     * Uses generated SVG element
     * 
     * @param {Element} elem DOM element to apply mask to
     * @param {String} dir direction of the mask
     */
    gradientMask.svgReuse = function(elem, dir) {
        if (!svgMaskIds[dir]) {
            svgMaskIds[dir] = genMaskSVG(dir);
        }

        elem.style.mask = 'url(#'+svgMaskIds[dir]+')';
    }


    /**
     * Creates gradient mask on the given component
     * 
     * Uses -webkit-mask-image CSS property
     * 
     * @param {Element} elem DOM element to apply mask to
     * @param {String} dir direction of the mask
     */
    gradientMask.webkit = function(elem, dir) {
        var where = {
            north : 'top',
            east  : 'right',
            south : 'bottom',
            west  : 'left'
        };

        elem.style.WebkitMaskImage =
            '-webkit-linear-gradient('+ where[dir] + ', '+
            'rgba(0,0,0,1), rgba(0,0,0,0) 100%)';
    }


    /**
     * Creates gradient mask on the given component
     * 
     * Uses DXImageTransform.Microsoft.Alpha filter
     * 
     * @param {Element} elem DOM element to apply mask to
     * @param {String} dir direction of the mask
     */
    gradientMask.alphaFilter = function(elem, dir) {
        var full = {
            north : 'y2',
            east  : 'x1',
            south : 'y1',
            west  : 'x2'
        };

        var pos = {
            x1 : 0,
            x2 : 0,
            y1 : 0,
            y2 : 0
        };

        pos[full[dir]] = '100%';

        var filter =
            'progid:'+
            'DXImageTransform.Microsoft.Alpha('+
                'opacity=100,'+
                'finishOpacity=0,'+
                'style=1,'+ // linear
                'startX=' +pos.x1+','+
                'finishX='+pos.x2+','+
                'startY=' +pos.y1+','+
                'finishY='+pos.y2+''+
            ')';

        elem.style.filter = filter;
        elem.style.MsFilter = filter;
    }


    /**
     * Applies gradient mask on the given component
     * 
     * @param {Element} elem DOM element to apply mask to
     * @param {String} dir direction of the mask
     */
    util.gradientMask = gradientMask[METHODS.mask]||null;



    // Using canvas as an element background in different browsers
    var backgroundCanvas = {};


    /**
     * Sets the content of the given canvas as a background for the
     * given element
     * 
     * Obtains the raw data using toDataURL() method and places it as
     * a background
     * 
     * @param {Element} elem to set background for
     * @param {Element} canvas element to use as a background
     */
    backgroundCanvas.dataURL = function(elem, canvas) {
        if (typeof canvas.dataURL == 'undefined') {
            canvas.dataURL = canvas.toDataURL();
        }

        elem.style.backgroundImage = 'url('+canvas.dataURL+')';
    }
    
    

    /**
     * Sets the content of the given canvas as a background for the
     * given element
     * 
     * Uses the global css canvas context along with -webkit-canvas
     * CSS function
     * 
     * @param {Element} elem to set background for
     * @param {Element} canvas element to use as a background
     */
    var canvasCSSCounter = 0;
    backgroundCanvas.webkit = function(elem, canvas) {
        if (typeof canvas.CSSContextId == 'undefined') {
            var id = 'canvasCSSContext-'+
                (canvasCSSCounter++)+'-'+
                UNIQUE;

            var ctx = document.getCSSCanvasContext(
                '2d', id, canvas.width, canvas.height
            );

            ctx.drawImage(canvas, 0,0);
            canvas.CSSContextId = id;
        }

        elem.style.background =
            '-webkit-canvas('+canvas.CSSContextId+')';
    }

    
    /**
     * Sets the content of the given canvas as a background for the
     * given element
     * 
     * Uses the existing canvas along with the -moz-element CSS
     * function
     * 
     * @param {Element} elem to set background for
     * @param {Element} canvas element to use as a background
     */
    var canvasMozElementCounter = 0;
    backgroundCanvas.mozElement = function(elem, canvas) {
        if (!canvas.getAttribute('id')) {
            var id = 'MozElement-'+
                (canvasMozElementCounter++)+'-'+
                UNIQUE;

            canvas.setAttribute('id', id);
            util.setStyle(canvas, {
                position: 'absolute',
                width: 0,
                height: 0
            });
            
            document.body.appendChild(canvas);
        }

        elem.style.background =
            '-moz-element(#'+canvas.getAttribute('id')+')';
    }


    util.backgroundCanvas = backgroundCanvas[METHODS.canvas]||null;




    // Asynchronous function invocation
    var async = {};
    
    /**
     * Performs a method asynchronously
     * 
     * Event emission version
     * 
     * @param {Function} func method to invoke
     * @param {Object} obj context object
     * @param {Array} args
     */
    async.event = function(func, obj, args) {
        asyncs.push([func, obj||window, args]);
        window.postMessage(asyncMsg, '*');
    }
    var asyncs = [];
    var asyncMsg = 'async-' + UNIQUE;
    var invoke = function(event) {
        if (event.source == window &&
             event.data == asyncMsg) {
            if (asyncs.length > 0) {
                var async = asyncs.shift();
                async[0].apply(async[1], async[2]);
            }
        }
    };
    window.addEventListener('message', invoke, true);



    /**
     * Performs a method asynchronously
     * 
     * setTimeout() version
     * 
     * @param {Function} func method to invoke
     * @param {Object} obj context object
     * @param {Array} args
     */
    async.setTimeout = function(func, obj, args) {
       setTimeout(
            function() {
                func.apply(obj||null, args||[]);
            }, 0
       );
    }

    util.async = async[METHODS.async];
    
    

    // Whenable patter

    var wl = {};
    
    /**
     * Whenable event object constructor
     */
    wl.Whenable = function() {
        this._emitted = false;  // event state, emitted or not
        this._listeners = [];
        this._result = [];  // args transfered to the listener
    }

      
    /**
     * Fires the event, issues the listeners
     * 
     * @param ... all given arguments are forwarded to the listeners
     */
    wl.Whenable.prototype.emit = function(){
        if (!this._emitted) {
            this._emitted = true;

            for (var i = 0; i < arguments.length; i++) {
                this._result.push(arguments[i]);
            }

            var listener;
            while(listener = this._listeners.pop()) {
                this._invoke(
                    listener[0], listener[1], this._result
                );
            }
        }
    }
      
    
    /**
     * @returns {Function} whenable subscriber to the event
     */
    wl.Whenable.prototype.getSubscriber = function() {
        var me = this;
        return function(listener, ctx) {
            me._whenEmitted(listener, ctx);
        }
    }

      
    /**
     * Adds another listener to be executed upon the event emission
     * 
     * @param {Function} func listener function to subscribe
     * @param {Object} ctx optional context to call the listener in
     */
    wl.Whenable.prototype._whenEmitted = function(func, ctx){
        func = this._checkListener(func);
        if (this._emitted) {
            this._invoke(func, ctx, this._result);
        } else {
            this._listeners.push([func, ctx||null]);
        }
    }
      
      
    /**
     * Checks if the provided object is suitable for being subscribed
     * to the event (= is a function), throws an exception otherwise
     * 
     * @param {Object} obj to check for being subscribable
     * 
     * @throws {Exception} if object is not suitable for subscription
     * @returns {Object} the provided object if yes
     */
    wl.Whenable.prototype._checkListener = function(listener){
        var type = typeof listener;
        if (type != 'function') {
            var msg =
                'A function may only be subsribed to the event, '
                + type
                + ' was provided instead'
            throw new Error(msg);
        }

        return listener;
    }
      
      
    /**
     * (Asynchronously) invokes the given listener in the context with
     * the arguments
     * 
     * @param {Function} listener to invoke
     * @param {Object} ctx context to invoke the listener in
     * @param {Array} args to provide to the listener
     */
    wl.Whenable.prototype._invoke = function(listener, ctx, args) {
        util.async(listener, ctx, args);
    }


    /**
     * For the given whenable subscribers produces another whenable
     * subscriber which fires when any of the given subscribers fire
     * 
     * @param {Function} when1
     * @param {Function} when2
     * 
     * @returns {Function}
     */
    wl.whenAny = function(when1, when2) {
        var when = new wl.Whenable;

        when1(function(){when.emit()});
        when2(function(){when.emit()});

        return when.getSubscriber();
    }
    
    
    
    /**
     * For the given whenable subscribers produces another whenable
     * subscriber which fires when all of the given subscribers fire
     * 
     * @param {Function} when1
     * @param {Function} when2
     * 
     * @returns {Function}
     */
    wl.whenAll = function(when1, when2) {
        var when = new wl.Whenable;

        when1(function(){
            when2(function(){
                when.emit();
            });
        });

        return when.getSubscriber();
    }
    
    
    
    /**
     * Images cache
     * 
     * Loads and stores the images by the given url, along with the
     * squeezed canvas
     */
    var imgCache = {};


    /**
     * Represents a single cached background image
     * 
     * Loads an image, creates stretched canvas
     */
    var CachedImg = function(url) {
        if (typeof imgCache[url] != 'undefined') {
            return imgCache[url];
        } else {
            imgCache[url] = this;

            this._url = url;
            this._load = new wl.Whenable;
            this._fail = new wl.Whenable;
            this.whenLoaded = this._load.getSubscriber();
            this.whenFailed = this._fail.getSubscriber();

            this._download();

            return this;
        }
    }
    
    
    
    /**
     * Loads an image
     */
    CachedImg.prototype._download = function() {
        this._img = util.sample.img.cloneNode(false);
        this._img.src = this._url;
        this._img.style.display = 'none';

        this._sides = {};  // stretched canvases
        this._data = {};

        var me = this;
        this._img.addEventListener('load', function() {
            me._init();
            me._load.emit();
        }, false);

        this._img.addEventListener('error', function() {
            document.body.removeChild(me._img);
            me._fail.emit();
        }, false);
        
        document.body.appendChild(this._img);
    }
    
    
    /**
     * @returns {Object} containing the generated stretched images
     * canvases rotated in every direction
     */
    CachedImg.prototype.getSides = function() {
        return this._sides;
    }
    

    /**
     * @returns {Object} additional data
     */
    CachedImg.prototype.getData = function() {
        return this._data;
    }
    


    /**
     * Ininitializes the CachedImg object with its stretched canvas
     * images, and with some additional data later used for rendering
     */
    CachedImg.prototype._init = function(image) {
        document.body.removeChild(this._img);

        var original = util.img2canvas(this._img);
        var stretched = this._stretch(original);
        this._data = this._genData(stretched.canvas);
        this._data.points = stretched.points;
        this._data.origSize = this._img.height;
            
        var rotated = this._rotate(stretched.canvas);
        this._sides.north = stretched.canvas;
        this._sides.east = rotated.east;
        this._sides.south = rotated.south;
        this._sides.west = rotated.west;
    }
    
    
    
    /**
     * Stretches the given canvas data and returns the new canvas with
     * the stretched content. The image is stretched in a special way,
     * so that horizontal pixels density is unchanged, but the
     * vertical density is decreased from top to bottom, therefore
     * pixels on the top edge have the same density as the original
     * image, while the pixels on the bottom edge are 4 times
     * stretched.
     * 
     * The density function
     * 
     *   ro(x) = 45/68*x*x - 24/17*x + 1
     * 
     * comes from the following conditions:
     * 
     * 1) ro(0) = 1 (destiny at the top edge equals the orig. image)
     * 2) ro(1) = 1/4 (density at the bottom is 4 times less)
     * 3) ro'(1) = ro2'(0), where:
     *    ro2(x) = 1/4 * ro(x/4), which is a density of the same
     *    image, linearly stretched four times. The last condition
     *    means that the speed of density change for the two images
     *    attached one to another is continuous
     * 
     * @param {Element} canvas containing the original image
     * 
     * @returns {Object} stretched canvas and density points
     */
    CachedImg.prototype._stretch = function(canvas) {
        var w = canvas.width;
        var h = canvas.height;

        // if webkit throws an error for a local image,
        // restart Chrome with --allow-file-access-from-files
        // (otherwise load an image from the same origin)
        var data1 = canvas.getContext('2d').getImageData(0, 0, w, h);
        var h2 = h * 68 / 35;
        var h2floor = Math.floor(h2);
        var stretchedCanvas = util.genCanvas(w, h2floor);
        var ctx2 = stretchedCanvas.getContext('2d');
        var data2 = ctx2.createImageData(w, h2floor);

        var D1 = data1.data;
        var D2 = data2.data;

        // Index of variables

        var ro;        // current density function value
        var y2;        // y, stretched image
        var y1;        // y, original image (calculated, float)
        var y1_floor;  // y, original image (floored)
        var y2_norm;   // y2 / h2 (normalized, 0 <= y2_norm <= 1)
        var y2_norm_2; // y2_norm squared
        var y1_norm;   // calculated normalized y of the orig img

        var rate0;     // ratios of the current pixel,
        var rate1;     // and the one on the next row

        var row = w*4; // imageData row (4 channels)
        var idx1;      // current pixel start idx (original image)
        var idx2;      // current pixel start idx (stretched image)
        var c;         // runs through color channels

        // saves the current coordinate of the stretched image
        // indexed by original coordinate (so that we may
        // later figure out where on the stretched image
        // original coordinate could be located)
        var points = [];

        var _15_68 = 15/68;
        var _12_17 = 12/17;
        var _45_68 = 45/68;
        var _24_17 = 24/17;

        // generating image
        for (y2 = 0; y2 < h2floor; y2++) {
            // calculating destiny at the point of y2
            y2_norm = y2/h2;
            y2_norm_2 = y2_norm * y2_norm;
            ro = _45_68 * y2_norm_2 - _24_17 * y2_norm + 1;

            // normalized coordinate of the original image
            // calculated as antiderivative of density function
            y1_norm =  _15_68 * y2_norm_2 * y2_norm
                     - _12_17 * y2_norm_2
                     +          y2_norm;

            // current y-coordinate on the original image
            y1 = y1_norm * h2;
            y1_floor = Math.floor(y1);

            points[y1_floor] = y2;
           
            rate0 = Math.min(ro, y1_floor + 1 - y1);
            rate1 = ro - rate0;

            idx1 = row*y1_floor;
            idx2 = row*y2;
            for (var col = 0; col < w; col++) {
                for (c = 0; c < 4; c++) {
                    D2[idx2+c] = Math.round((
                        rate0 *  D1[idx1+c] +
                        rate1 * (D1[idx1+c+row]||0)
                    ) / ro);
                }

                idx1 += 4;
                idx2 += 4;
            }
        }

        ctx2.putImageData(data2, 0, 0);

        return {
            canvas: stretchedCanvas,
            points: points
        };
    }
    
    
    /**
     * Rotates the given canvas in every other direction
     * 
     * @param {Element} north canvas in original position
     * 
     * @returns {Object} containing rotated canvases
     */
    CachedImg.prototype._rotate = function(north) {
        var w = north.width;
        var h = north.height;

        var east = util.genCanvas(h,w);
        var ctxE = east.getContext('2d');
        ctxE.rotate(Math.PI/2);
        ctxE.drawImage(north, 0, -h);

        var south = util.genCanvas(w,h);
        var ctxS = south.getContext('2d');
        ctxS.rotate(Math.PI);
        ctxS.drawImage(north, -w, -h);

        var west = util.genCanvas(h,w);
        var ctxW = west.getContext('2d');
        ctxW.rotate(-Math.PI/2);
        ctxW.drawImage(north, -w, 0);

        return {
            east: east,
            south: south,
            west: west
        };
    }
    
    
    /**
     * Calculates additional data for the given stretched canvas
     * element later reused for calculations
     * 
     * @param {Element} to generate data for
     * 
     * @returns {Object} data
     */
    CachedImg.prototype._genData = function(canvas) {
        var w = canvas.width;
        var h = canvas.height;

        // size of the side layer
        var maxLayerSize = 0;
        var curSize = h;
        for (var i = 1; i < BLOCKSNUM; i++) {
            curSize /= 4;
            maxLayerSize += Math.floor(curSize);
        }

        // layer may be a bit smaller depending on offset
        maxLayerSize = Math.floor(maxLayerSize * .99);
        
        // how many virtual elements do we need to reach 1 px
        var virtualNum = 1 + Math.ceil(
            Math.log(1/h) / Math.log(1/4)
        );
        
        // total height of all virtual elements altogether
        var virtualSize = 0;
        curSize = h;
        for (i = 1; i < virtualNum; i++) {
            curSize /= 4;
            virtualSize += Math.floor(curSize);
        }
        
        return {
            // size of the stretched image
            stretchedSize : h,
            // texture size along the side
            sideSize      : w,
            // maximal size of the indicator layer
            maxLayerSize : maxLayerSize,
            // values used during calculations
            virtualPow   : 1-Math.pow(1/4, virtualNum-1),
            virtualSize3 : virtualSize*3
        };
    }
    
    
    /**
     * Represents the element upgraded with the resize event detector
     * 
     * @param {Element} elem to upgarde
     */
    var Resizable = function(elem) {
        this._elem = elem;
        this._detector = util.sample.object.cloneNode(false);
        util.setStyle(this._detector, {
            display       : 'block',
            position      : 'absolute',
            top           : 0,
            left          : 0,
            height        : '100%',
            width         : '100%',
            overflow      : 'hidden',
            pointerEvents : 'none',
            zIndex        : -2048
        });

        var me = this;
        this._detector.onload = function() {
            this.contentDocument.defaultView.addEventListener(
                'resize', me.onresize, false
            );
        }

        this._detector.type = 'text/html';

        if (IS_IE) {
            this._elem.appendChild(this._detector);
            this._detector.data = 'about:blank';
        } else {
            this._detector.data = 'about:blank';
            this._elem.appendChild(this._detector);
        }
    }


    
    /**
     * Handler for the resize event, to be defined for an instance
     */
    Resizable.prototype.onresize = function() {}
    

    /**
     * Removes the resize detector from the element
     */
    Resizable.prototype.destroy = function() {
        this._elem.removeChild(this._detector);
    }
    

    
    /**
     * Represents a scrollable element shipped with squeeze-indicators
     * 
     * @param {Element} elem to create scrollable indicators for
     */
    var Squeeze = function(elem) {
        this._elem = elem;
        this._hideScrollbars();
        this._createResizable();
        this._createSides();
        this._loadImages();
    }
    
    
    /**
     * Returns the element corresponding to the Squeeze
     */
    Squeeze.prototype._getElem = function() {
        return this._elem;
    }
    
    
    /**
     * Upgrades the element with the set of additional elements one
     * inside another so that the scrollbars are properly hidden
     */
    Squeeze.prototype._hideScrollbars = function() {
        var children = util.detachChildren(this._elem);

        this._styleBackup = {
            overflow : this._elem.style.overflow
        };

        var newStyle = {
            overflow : 'hidden'
        };

        var wrapper2Style = {};
        var createWrapper2 = false;

        if (this._elem.nodeName.toLowerCase() == 'body') {
            var cs = window.getComputedStyle(this._elem, null);
            wrapper2Style.margin = cs.margin;
            wrapper2Style.marginTop = cs.marginTop;
            wrapper2Style.marginRight = cs.marginRight;
            wrapper2Style.marginBottom = cs.marginBottom;
            wrapper2Style.marginLeft = cs.marginLeft;
            this._styleBackup.margin = this._elem.style.margin;
            this._styleBackup.marginTop = this._elem.style.marginTop;
            this._styleBackup.marginRight = this._elem.style.marginRight;
            this._styleBackup.marginBottom = this._elem.style.marginBottom;
            this._styleBackup.marginLeft = this._elem.style.marginLeft;
            newStyle.margin = 0;
            createWrapper2 = true;
        }

        util.setStyle(this._elem, newStyle);

        this._cmp = {};

        this._cmp.wrapper = util.sample.div.cloneNode(false);
        util.setStyle(this._cmp.wrapper, {
            position  : 'relative',
            overflow : 'hidden',
            width: '100%',
            height: '100%'
        });
        this._cmp.scroller = util.sample.div.cloneNode(false);
        util.setStyle(this._cmp.scroller, {
            position  : 'absolute',
            overflowX : 'scroll',
            overflowY : 'scroll'
        });
        
        var id = this._elem.getAttribute('id');
        if (id) {
            this._cmp.scroller.setAttribute('id', id + '-scroller');
        }

        this._cmp.container = util.sample.div.cloneNode(false);

        util.attachChildren(this._cmp.container, children);
        this._cmp.scroller.appendChild(this._cmp.container);



        if (createWrapper2) {
            this._cmp.wrapper2 = util.sample.div.cloneNode(false);
            this._cmp.wrapper2.setAttribute('id', 'wrapper2');

            util.setStyle(this._cmp.wrapper2, {
                position  : 'relative',
                overflow : 'hidden',
                width: '100%',
                height: '100%'
            });

            util.setStyle(this._cmp.wrapper2, wrapper2Style);
            this._cmp.wrapper2.appendChild(this._cmp.scroller);
            this._cmp.wrapper.appendChild(this._cmp.wrapper2);
        } else {
            this._cmp.wrapper.appendChild(this._cmp.scroller);
        }

        this._elem.appendChild(this._cmp.wrapper);

    }


    /**
     * Removes additional elements created in order to hide the
     * scrollbars thus restoring the element to its original state
     */
    Squeeze.prototype._revealScrollbars = function() {
        var children = util.detachChildren(this._cmp.container);
        util.detachChildren(this._elem);

        for (var prop in this._styleBackup) {
            if (this._styleBackup.hasOwnProperty(prop)) {
                this._elem.style[prop] = this._styleBackup[prop];
            }
        }
        
        util.attachChildren(this._elem, children);
    }
    

    /**
     * Adds Resizable detector on the element
     */
    Squeeze.prototype._createResizable = function() {
        var me = this;
        this._resizable = new Resizable(this._cmp.wrapper);
        this._resizable.onresize = function() {
            me._setGeometry();
            me._indicate();
        }

        this._setGeometry();
    }


    /**
     * Removes the Resizable
     */
    Squeeze.prototype._destroyResizable = function() {
        this._resizable.destroy();
    }
    
    
    /**
     * Updates the subcomponents geometry according to the element
     * dimensions
     */
    Squeeze.prototype._setGeometry = function() {
        var geom = this._cmp.wrapper.getBoundingClientRect();
        util.setStyle(this._cmp.container, {
            width  : Math.ceil(geom.width),
            height : Math.ceil(geom.height)
        });
    }



    /**
     * Creates side components
     */
    Squeeze.prototype._createSides = function() {
        this._cmp.sides = {};

        var side, style, dir;
        var dirs = ['east','west','north','south'];
        for (var i = 0; i < dirs.length; i++) {
            dir = dirs[i];
            style = {
                pointerEvents : 'none',
                display  : 'inline',
                position : 'absolute',
                overflow : 'hidden',
                width    : 0,
                height   : 0,
                top      : 0,
                left     : 0
            };

            switch(dir) {
            case 'north':
            case 'south':
                style.width = '100%';
                break;

            case 'east':
            case 'west':
                style.height = '100%';
                break;
            }
            
            side = util.sample.div.cloneNode(false);
            util.setStyle(side, style);

            this._cmp.sides[dir] = {
                main: side,
                blocks: [],
                ready : false
            };

            this._cmp.wrapper.appendChild(side);
        }
    }
    
    
    /**
     * Destroys the side components
     */
    Squeeze.prototype._destroySides = function() {
        for (var i = 0; i < util.dir.length; i++) {
            this._cmp.wrapper.removeChild(
                this._cmp.sides[util.dir[i]].main
            );
        }
    }
    
    
    
    /**
     * Initiates loading of images corresponding to each side
     */
    Squeeze.prototype._loadImages = function() {
        this._images = {};

        var me = this;
        var sideInitialized = {};
        var url = this._elem.getAttribute('squeezeImg')||'';
        var img, dir;
        for (var i = 0; i < util.dir.length; i++) {
            dir = util.dir[i];
            img = new CachedImg(
                this._elem.getAttribute(
                    'squeezeImg'+util.cap1(dir)
                )||url
            );

            sideInitialized[dir] = new wl.Whenable;

            this._images[dir] = img;
            img.whenLoaded(
                (function(dir, img){
                     return function() {
                         me._initSide(dir, img);
                         sideInitialized[dir].emit();
                     }
                 })(dir, img)
            );
        }
        
        wl.whenAll(
            wl.whenAny(
                sideInitialized.north.getSubscriber(),
                this._images.north.whenFailed
            ),
            wl.whenAny(
                sideInitialized.east.getSubscriber(),
                this._images.east.whenFailed
            ),
            wl.whenAny(
                sideInitialized.south.getSubscriber(),
                this._images.south.whenFailed
            ),
            wl.whenAny(
                sideInitialized.west.getSubscriber(),
                this._images.west.whenFailed
            )
        )(function(){
 var newtime = (new Date).getTime();
 console.log(newtime-time);
            me._indicate();
        });

 var time = (new Date).getTime();


        this._cmp.scroller.addEventListener(
            'scroll', function(){me._indicate();}, false
        );
    }
    

    // initializes a set of blocks on each side

    var createBlocks = {};
    
    /**
     * Creates a set of blocks for the scrolling indication
     * 
     * Blocks are created within a single SVG element
     * 
     * @param {String} dir direction of indication
     * @param {Element} container to create blocks on
     * @param {Element} canvas element to use as a background
     * 
     * @returns {Object} set of created elements
     */
    var svgBlockCounter = 0;
    createBlocks.svg = function(dir, container, canvas) {
        var geom = container.getBoundingClientRect();

        var blocksetId = 'svgBlock-'+
                (svgBlockCounter++)+'-'+
                UNIQUE;

        var svg = util.genSVGElement('svg');
        var defs = util.genSVGElement('defs', svg);

        var gradientId = 'gradient-'+blocksetId;

        var linearGradient = util.genSVGLinearGradient(
            defs, dir, gradientId
        );

        var maskId = 'mask-'+blocksetId;
        var mask = util.genSVGElement('mask', defs, {
            id : maskId,
            x : '0',
            y : '0',
            width : '100%',
            height : '100%'
        });

        var rectWidth = '100%';
        var rectHeight = '100%';
        if (dir == 'north' || dir == 'south') {
            rectHeight = '0';
        } else {
            rectWidth = '0';
        }

        var maskRect = util.genSVGElement('rect', mask, {
            x : '0',
            y : '0',
            width : rectWidth,
            height : rectHeight,
            style : 'stroke: none; fill: url(#'+gradientId+')'
        });


        var g = util.genSVGElement('g', svg, {
            style : 'mask:url(#'+maskId+');'
        });

        var blockWidth = 0;
        var blockHeight = 0;

        if (dir == 'north' || dir == 'south') {
            blockWidth = canvas.width;
        } else {
            blockHeight = canvas.height;
        }

        var imageURL = canvas.toDataURL();
        var patternId;
        var patterns = [];
        var images = [];
        var rects = [];

        for (var i = 0; i < BLOCKSNUM; i++) {
            patternId = 'pattern-'+i+'-'+blocksetId;
            patterns[i] = util.genSVGElement('pattern', defs, {
                id : patternId,
                x : '0',
                y : '0',
                width : '' + blockWidth + 'px',
                height : '' + blockHeight + 'px',
                patternUnits : 'userSpaceOnUse'
            });

            images[i] = util.genSVGElement('image', patterns[i], {
                id : 'image-'+i+'-'+blocksetId,
                x : '0',
                y : '0',
                width : '' + blockWidth + 'px',
                height : '' + blockHeight + 'px',
                preserveAspectRatio : 'none',
                'xlink:href' : imageURL
            });

            rects[i] = util.genSVGElement('rect', g, {
                id : 'rect-'+i+'-'+blocksetId,
                x : '0px',
                y : '0px',
                width : '' + geom.width + 'px',
                height : '' + geom.height + 'px',
                style : 'fill: url(#' + patternId + ');'
            });
        }

        util.setStyle(svg, {
            position: 'absolute',
            top : 0,
            left : 0,
            width: rectWidth,
            height: rectHeight
        });

        container.appendChild(svg);

        return {
            svg : svg,
            maskRect : maskRect,
            patterns : patterns,
            images : images,
            rects : rects
        };
    }
    


    /**
     * Creates a set of blocks for the scrolling indication
     * 
     * Blocks are created as a separate DOM elements
     * 
     * @param {String} dir direction of indication
     * @param {Element} container to create blocks on
     * @param {Element} canvas element to use as a background
     * 
     * @returns {Array} of created blocks
     */
    createBlocks.div = function(dir, container, canvas) {
        var style = {
            position: 'absolute'
        };

        if (dir == 'north' || dir == 'south') {
            style.width = '100%';
        } else {
            style.height = '100%';
        }

        var block, blocks = [];
        for (var i = 0; i < BLOCKSNUM; i++) {
            block = util.sample.div.cloneNode(false);
            util.setStyle(block, style);
            util.backgroundCanvas(block, canvas);
            container.appendChild(block);
            blocks.push(block);
        }

        util.gradientMask(container, dir);

        return blocks;
    }


    if (METHODS.canvas == 'svg') {
        Squeeze.prototype._createBlocks = createBlocks.svg;
    } else {
        Squeeze.prototype._createBlocks = createBlocks.div;
    }
    
    

    /**
     * Initializes the scrolling indicator for the given side with the
     * given CachedImage
     * 
     * @param {String} dir direction to initialize
     * @param {Object} image stretched image
     */
    Squeeze.prototype._initSide = function(dir, image) {
        var side = this._cmp.sides[dir];
        side.blocks = this._createBlocks(
            dir, side.main, image.getSides()[dir]
        );

        side.ready = true;
    }
    
    
    // updates a set of indicator blocks

    var updateBlocks = {};
    
    /**
     * Updates a set of blocks for the scrolling indication
     * 
     * Blocks are updated within an SVG element
     * 
     * @param {String} dir direction of the block indicator
     * @param {Array} blocks elements to update
     * @param {Array} coordinates to apply to blocks
     * @param {Element} container to apply intensity to
     * @param {Number} containerSize in px
     * @param {Number} sideOffset
     * @param {Number} sideSize
     * @param {Number} areaSize
     */
    updateBlocks.svg = function(
        dir, blocks, coordinates, container, containerSize,
        sideOffset, sideSize, areaSize, areaSideSize
    ) {
        var w = 0, h = 0;
        if (dir == 'north'||dir == 'south') {
            w = areaSideSize;
            h = containerSize;
        } else {
            w = containerSize;
            h = areaSideSize;
        }

        var style = {
            width: w,
            height: h
        };

        util.setStyle(blocks.svg, style);

        var coord = areaSize - containerSize;
        switch (dir) {
        case 'east':
            style.left = coord;
            break;
        case 'south':
            style.top = coord;
            break;
        }

        util.setStyle(container, style);

        blocks.svg.setAttribute('width', w);
        blocks.svg.setAttribute('height', h);
        blocks.maskRect.setAttribute('width', w);
        blocks.maskRect.setAttribute('height', h);

	var i, size;
        var offset = '' + (-sideOffset%sideSize) + 'px';
        for (i = 0; i < BLOCKSNUM; i++) {
            if (dir == 'north'||dir =='west') {
                coord = ''+coordinates[i].offset+'px';
            } else {
                coord = ''+containerSize -
                           coordinates[i].size -
                           coordinates[i].offset + 'px';
            }

            size = ''+coordinates[i].size+'px';

            if (dir =='north'||dir =='south') {
                blocks.images[i].setAttribute('height',size);
                blocks.rects[i].setAttribute('y',coord);
                blocks.rects[i].setAttribute('height',size);
                blocks.rects[i].setAttribute(
                    'width',''+areaSideSize+'px'
                );
                blocks.patterns[i].setAttribute('y',coord);
                blocks.patterns[i].setAttribute('x',offset);
                blocks.patterns[i].setAttribute('height',size);
            } else {
                blocks.images[i].setAttribute('width',size);
                blocks.rects[i].setAttribute('x',coord);
                blocks.rects[i].setAttribute('width',size);
                blocks.rects[i].setAttribute(
                    'height',''+areaSideSize+'px'
                );
                blocks.patterns[i].setAttribute('y',offset);
                blocks.patterns[i].setAttribute('x',coord);
                blocks.patterns[i].setAttribute('width',size);
            }
        }
    }
    


    /**
     * Updates a set of blocks for the scrolling indication
     * 
     * Blocks are updated within an ordinary element
     * 
     * @param {String} dir direction of the block indicator
     * @param {Array} blocks elements to update
     * @param {Array} coordinates to apply to blocks
     * @param {Element} container to apply intensity to
     * @param {Number} containerSize in px
     * @param {Number} sideOffset
     * @param {Number} sideSize
     * @param {Number} areaSize
     */
    updateBlocks.div = function(
        dir, blocks, coordinates, container, containerSize,
        sideOffset, sideSize, areaSize
    ) {
        var style = {};

        switch (dir) {
        case 'north':
            style.height = containerSize;
            break;
        case 'south':
            style.top = areaSize - containerSize;
            style.height = containerSize;
            break;
        case 'east':
            style.left = areaSize - containerSize;
            style.width = containerSize;
            break;
        case 'west':
            style.width = containerSize;
            break;
        }
        
        util.setStyle(container, style);

        var i;
        switch (dir) {
        case 'north':
            for (i = 0; i < blocks.length; i++) {
                util.setStyle(blocks[i], {
                    top : coordinates[i].offset,
                    height: coordinates[i].size,
                    backgroundSize:
                        sideSize + 'px '+coordinates[i].size+'px',
                    backgroundPosition: '-'+sideOffset + 'px 0px'
                });
            }
            break;

        case 'east':
            for (i = 0; i < blocks.length; i++) {
                util.setStyle(blocks[i], {
                    left : containerSize -
                          coordinates[i].size -
                          coordinates[i].offset,
                    width : coordinates[i].size,
                    backgroundSize:
                        coordinates[i].size + 'px '+sideSize+'px',
                    backgroundPosition: '0px -'+sideOffset + 'px'
                });
            }
            break;

        case 'south':
            for (i = 0; i < blocks.length; i++) {
                util.setStyle(blocks[i], {
                    top : containerSize -
                          coordinates[i].size -
                          coordinates[i].offset,
                    height: coordinates[i].size,
                    backgroundSize:
                        sideSize + 'px '+coordinates[i].size+'px',
                    backgroundPosition: '-'+sideOffset + 'px 0px'
                });
            }
            break;
        case 'west':
            for (i = 0; i < blocks.length; i++) {
                util.setStyle(blocks[i], {
                    left : coordinates[i].offset,
                    width : coordinates[i].size,
                    backgroundSize:
                        coordinates[i].size + 'px '+sideSize+'px',
                    backgroundPosition: '0px -'+sideOffset + 'px'
                });
            }
            break;
        }

    }


    if (METHODS.canvas == 'svg') {
        Squeeze.prototype._updateBlocks = updateBlocks.svg;
    } else {
        Squeeze.prototype._updateBlocks = updateBlocks.div;
    }
    
    

    /**
     * Updates the scrolling indicators on each side according to the
     * current scroll state of the element
     */
     Squeeze.prototype._indicate = function() {
        var geom = this._cmp.wrapper.getBoundingClientRect();
        var el = this._cmp.scroller;

        // amount of pixels beyond the displayed area
        var beyond = {
            north : Math.max(0, Math.floor(el.scrollTop)),
            south : Math.max(
                0, Math.floor(
                    el.scrollHeight - el.scrollTop - geom.height
                )
            ),
            west  : Math.max(0, Math.floor(el.scrollLeft)),
            east  : Math.max(
                0, Math.floor(
                    el.scrollWidth - el.scrollLeft - geom.width
                )
            )
        };
        
        var i, j;
        for (i = 0; i < util.dir.length; i++) {
            var dir = util.dir[i];
            if (this._cmp.sides[dir].ready) {
                var data = this._images[dir].getData();

                var origCoord = beyond[dir] % data.origSize;

                if (dir == 'south') {
                    origCoord = data.origSize
                        - beyond.north % data.origSize;
                } else if (dir == 'east') {
                    origCoord = data.origSize
                        - beyond.west % data.origSize;
                }

                if (origCoord == data.origSize) {
                    origCoord = 0;
                }

                
                var offset = data.points[origCoord];
                // percentage of visible area of the first entry
                var F = offset / data.stretchedSize;

                // actual size of the image
                var size = data.virtualSize3 / (data.virtualPow + 3*F);
                var realOffset = size * (offset / data.stretchedSize);

                var total = 0;
                var sizes = [];
                var firstSize = size;
                for (j = 0; j < BLOCKSNUM; j++) {
                    sizes.push(size);
                    total += size;
                    size /= 4;
                }

                var blockOffset = Math.round(
                    data.maxLayerSize - total + firstSize - realOffset
                );

                var blockSize;
                var coordinates = [];
                for (j = 0; j < BLOCKSNUM; j++) {
                    blockSize = sizes[BLOCKSNUM-1-j];
                    coordinates.push({
                        offset : Math.round(blockOffset),
                        size : Math.round(blockSize)
                    });

                    blockOffset += Math.round(blockSize);
                }

                var intensity = 1 - 1 / (beyond[dir]/MASK_SLOWNESS + 1);
                var containerSize = Math.ceil(
                    intensity * data.maxLayerSize
                );

                var sideOffsets = {
                    north : 'west',
                    east  : 'north',
                    south : 'west',
                    west  : 'north'
                };

                var areaSize = geom.height;
                var areaSideSize = geom.width;
                if (dir == 'west' || dir == 'east') {
                    areaSize = geom.width;
                    areaSideSize = geom.height;
                }

                this._updateBlocks(
                    dir, this._cmp.sides[dir].blocks, coordinates,
                    this._cmp.sides[dir].main, containerSize,
                    beyond[sideOffsets[dir]], data.sideSize,
                    areaSize, areaSideSize
                );
            }
        }
    }

    
    /**
     * Removes the additional indicator elements, thus restores the
     * element in its original state
     */
    Squeeze.prototype.destroy = function() {
        this._destroySides();
        this._destroyResizable();
        this._revealScrollbars();
    }
    
    


    var squeezes = [];
    
    /**
     * Runs through all Squeezes, destroys those with elements which
     * do not have squeeze class anymore
     */
    var destroyUnsqueezed = function() {
        var elem;
        for (var i=0; i < squeezes.length; i++) {
            elem = squeezes[i].getElem();
            if (!util.hasClass(elem, 'squeeze')) {
                squeezes[i].destroy();
                elem.squeeze = null;
                delete elem.squeeze
                squeezes.splice(i,1);
                i--;
            }
        }
    }
    
        
    /**
     * Runs through all elements with squeeze class, creates the
     * Squeeze instance for those which do not have one
     */
    var createSqueezed = function() {
        var elems = document.getElementsByClassName('squeeze');
        for (var i = 0; i < elems.length; i++) {
            if (!elems[i].squeeze) {
                squeezes.push(new Squeeze(elems[i]));
            }
        }
    }


    /**
     * Updates the set of scrollable elements featured with the
     * squeeze scroll indicators
     */
    var resqueeze = function() {
        if (SQUEEZE_ENABLED) {
            destroyUnsqueezed();
            createSqueezed();
        }
    }
    

    
    if (document.readyState == "complete") {
        // page has already been loaded
        resqueeze();
    } else {
        // preserving any existing listener
        var origOnload = window.onload || function(){};

        window.onload = function(){
            origOnload();
            resqueeze();
        }
    }



//    SQUEEZE_ENABLED = false;


    exports.resqueeze = resqueeze;
    exports.enabled = SQUEEZE_ENABLED;
}));

