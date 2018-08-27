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
}(
    this,
    function (exports) {

        // squeeze factor at the last frame
        var MAXSQUEEZE = 1000;
        var FRAMENUM = 1+Math.ceil(Math.log(MAXSQUEEZE)/Math.log(4));
        
        var BROWSER = null;
        
        if (!!window.opera ||
            navigator.userAgent.indexOf(' OPR/') >= 0) {
            // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
            BROWSER = 'opera';
        } else if (typeof InstallTrigger !== 'undefined') {
            // Firefox 1.0+        
            BROWSER = 'firefox';
        } else if (Object.prototype.toString.call(
                       window.HTMLElement
                   ).indexOf('Constructor') > 0) {
            // At least Safari 3+: "[object HTMLElementConstructor]"
            BROWSER = 'safari';
        } else if (!!window.chrome) {
            // Chrome 1+
            BROWSER = 'chrome';
        } else if (/*@cc_on!@*/false || !!document.documentMode) {
            // At least IE6
            BROWSER = 'IE';
        }


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
         * Attaches to the given element the given set of nodes
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
         * Routines for applying a transparency mask in different
         * browsers
         */

        util._applyMaskWebkit = function(elem, dir, size) {
            var where;
            switch (dir) {
            case 'north': where = 'top';    break;
            case 'east' : where = 'right';  break;
            case 'south': where = 'bottom'; break;
            case 'west' : where = 'left';   break;
            }

            var percent = Math.round(size * 100);
            elem.style.WebkitMaskImage =
                '-webkit-linear-gradient('+ where + ', '+
                'rgba(0,0,0,1), rgba(0,0,0,0) '+percent+'%)';
        }

        /**
         * Generates SVG mask image for the given element
         * 
         * @param {Element} elem
         * @param {String} dir direction of the mask gradient
         */
        util._maskCounterSVG = 0;
        util._genMaskSVG = function(elem, dir) {
            var id = 'svg-mask-'+
                (util._maskCounterSVG++)+'-'+
                UNIQUE;
            var pointId = 'point-'+id;
            var maskId = 'mask-'+id;
            var gradientId = 'gradient-'+id;

            var ns = 'http://www.w3.org/2000/svg';

            var create = function(name, parent, attrs) {
                var elem = document.createElementNS(ns, name);

                if (attrs) {
                    for (var key in attrs) {
                        if (attrs.hasOwnProperty(key)) {
                            elem.setAttribute(key, attrs[key]); 
                        }
                    }
                }

                if (parent) {
                    parent.appendChild(elem);
                }

                return elem;
            }

            
            var svg = create('svg');
            var defs = create('defs', svg);
            var linearGradient = create(
                'linearGradient', defs, {
                    id : gradientId,
                    x1 : '0',
                    y1: '00%',
                    x2: '0',
                    y2: '100%'
                }
            );


            var stop1 = create(
                'stop', linearGradient, {
                    'stop-color': 'white',
                    offset: '0'
                }
            );
            
            var stop2 = create(
                'stop', linearGradient, {
                    'stop-color': 'black',
                    offset: '1',
                    id: pointId
                }
            );

            var mask = create(
                'mask', defs, {
                    id: maskId,
                    maskUnits: 'objectBoundingBox',
                    maskContentUnits: 'objectBoundingBox'
                }
            );

            
            var rect = create(
                'rect', mask, {
                    y: '0',
                    width: '1',
                    height: '1',
                    fill: 'url(#'+gradientId+')'
                }
            );

            util.setStyle(svg, {
                position: 'absolute',
                width: 0,
                height: 0
            });
            
            elem.appendChild(svg);
            elem.setAttribute('pointId', pointId);
            elem.setAttribute('maskId', maskId);

            util._maskSVG = svg;
        }

        util._applyMaskSVG = function(elem, dir, size) {
            if (!elem.getAttribute('maskId')) {
                util._genMaskSVG(elem, dir);
            }

            var maskId = elem.getAttribute('maskId');
            var pointId = elem.getAttribute('pointId');
            document.getElementById(pointId).setAttribute("offset", size);
            elem.style.mask = 'url(#'+maskId+')';
        }
        
        
        util._applyMaskAlphaFilter = function(elem, dir, size) {
            var x1, y1, x2, y2;
            var percent = Math.floor(100*size);
            switch(dir) {
            case 'north':
                y2 = percent;
                x1 = x2 = y1 = 0;
                break;
            case 'east':
                x1 = percent;
                y1 = x2 = y2 = 0;
                break;
            case 'south':
                y1 =  percent;
                x1 = x2 = y2 = 0;
                break;
            case 'west':
                x2 =  percent;
                x1 = y1 = y2 = 0;
                break;
            }

            var filter =
                'progid:'+
                'DXImageTransform.Microsoft.Alpha('+
                    'opacity=100,'+
                    'finishOpacity=0,'+
                    'style=1,'+ // linear
                    'startX=' +x1+','+
                    'finishX='+x2+','+
                    'startY=' +y1+','+
                    'finishY='+y2+''+
                ')';

            elem.style.filter = filter;
            elem.style.MsFilter = filter;
        }
        
        

        /**
         * Applies gradient mask on the given component
         * 
         * @param {Element} elem DOM element to apply mask to
         * @param {String} dir direction of the mask
         * @param {Number} size of the mask (0 to 1)
         * @param {Number} fullSize of the element (px)
         */
        switch (BROWSER) {
        case 'opera':
        case 'chrome':
        case 'safari':
            util.gradientMask = util._applyMaskWebkit;
            break;
        case 'firefox':
            util.gradientMask = util._applyMaskSVG;
            break;
        case 'ie':
            util.gradientMask = util._applyMaskAlphaFilter;
            break;
        default:
            util.gradientMask = util._applyMaskWebkit;
            break;
        }
        



        /**
         * Using canvas as an element background in different browsers
         */

        util._backgroundCanvasDataURL = function(elem, canvas) {
            if (typeof canvas.dataURL == 'undefined') {
                canvas.dataURL = canvas.toDataURL();
            }

            elem.style.backgroundImage = 'url('+canvas.dataURL+')';
        }

        util._backgroundCanvasCSSCounter = 0;
        util._backgroundCanvasCSSContext = function(elem, canvas) {
            if (typeof canvas.CSSContextId == 'undefined') {
                var id = 'CSSContext-'+
                    (util._backgroundCanvasCSSCounter++)+'-'+
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

        
        util._backgroundCanvasMozElementCounter = 0;
        util._backgroundCanvasMozElement = function(elem, canvas) {
            if (!canvas.getAttribute('id')) {
                var id = 'MozElement-'+
                    (util._backgroundCanvasMozElementCounter++)+'-'+
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
        
        
        /**
         * Uses the content of the given canvas element as a
         * background for the given element
         */
        switch (BROWSER) {
        case 'opera':
        case 'chrome':
        case 'safari':
            util.backgroundCanvas = util._backgroundCanvasCSSContext;
            break;
        case 'firefox':
            util.backgroundCanvas = util._backgroundCanvasMozElement;
            break;
        case 'ie':
        default:
            util.backgroundCanvas = util._backgroundCanvasDataURL;
            break;
        }



        /**
         * Messaging is a bit faster than setTimeout(func, 0) for the
         * sake of invoking a function asynchronously
         */
        if (typeof window != 'undefined'
            && typeof window.addEventListener != 'undefined') {
            util.async = function(func, obj, args) {
                util._asyncs.push([func, obj||window, args]);
                window.postMessage(util._asyncMsg, '*');
            }

            util._asyncs = [];
            util._asyncMsg = UNIQUE + '-async';

            util._invoke = function(event) {
                if (event.source == window &&
                     event.data == util._asyncMsg) {
                    if (util._asyncs.length > 0) {
                        var async = util._asyncs.shift();
                        async[0].apply(async[1], async[2]);
                    }
                }
            };

            window.addEventListener('message', util._invoke, true);
        } else {
            // fallback version
            util.async = function(func, obj, args) {
                setTimeout(
                    function() {
                        func.apply(obj||null, args||[]);
                    }, 0
               );
            };
        }


        
        
        /**
         * Whenable event object constructor
         */
        var Whenable = function() {
            this._emitted = false;  // event state, emitted or not
            this._listeners = [];
            this._result = [];  // args transfered to the listener
        }

          
        /**
         * Fires the event, issues the listeners
         * 
         * @param ... all given arguments are forwarded to the listeners
         */
        Whenable.prototype.emit = function(){
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
        Whenable.prototype.getSubscriber = function() {
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
        Whenable.prototype._whenEmitted = function(func, ctx){
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
        Whenable.prototype._checkListener = function(listener){
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
        Whenable.prototype._invoke = function(listener, ctx, args) {
            util.async(listener, ctx, args);
        }


        /**
         * For the given whenable subscribers produces another
         * whenable subscriber which fires when any of the given
         * subscribers fire
         * 
         * @param {Function} when1
         * @param {Function} when2
         * 
         * @returns {Function}
         */
        var whenAny = function(when1, when2) {
            var when = new Whenable;

            when1(function(){when.emit()});
            when2(function(){when.emit()});

            return when.getSubscriber();
        }
        
        
       
        /**
         * For the given whenable subscribers produces another
         * whenable subscriber which fires when all of the given
         * subscribers fire
         * 
         * @param {Function} when1
         * @param {Function} when2
         * 
         * @returns {Function}
         */
        var whenAll = function(when1, when2) {
            var when = new Whenable;

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
         * Loads and stores the images by the given url, along with
         * the squeezed canvas
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
                this._load = new Whenable;
                this._fail = new Whenable;
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
            this._stretched = null;

            var me = this;
            this._img.addEventListener('load', function() {
                document.body.removeChild(me._img);
                me._stretched = me._stretch(me._img);
                me._load.emit();
            });

            this._img.addEventListener('error', function() {
                document.body.removeChild(me._img);
                me._fail.emit();
            });
            
            document.body.appendChild(this._img);
        }
        
        
        /**
         * Returns the object containing the generated stretched
         * images dataURL's, and the resulting dimensions
         */
        CachedImg.prototype.getStretched = function() {
            return this._stretched;
        }
        
        
        /**
         * Produces the stretched version of the given loaded image,
         * returns an object with dataURL strings of the stretched
         * image rotated in each direction.
         * 
         * The image is stretched in a special way, so that horizontal
         * pixels density is unchanged, but the vertical density is
         * decreased from top to bottom, therefore pixels on the top
         * edge have the same density as the original image, while the
         * pixels on the bottom edge are 4 times stretched.
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
         *    means that the speed of density change for the two
         *    images attached one to another is continuous
         * 
         * @param {Element} image dom element containing the image
         * 
         * @returns {Object} dataURL's of the stretched image
         */
        CachedImg.prototype._stretch = function(image) {
            var w = image.width;
            var h = image.height;

            // canvas1 contains the original image
            var canvas1 = this._genCanvas(w,h);
            var ctx1 = canvas1.getContext('2d');
            ctx1.drawImage(image,0,0);

            // if Chrome throws an error for a local image,
            // restart it with --allow-file-access-from-files
            // (otherwise load an image from the same origin)
            var imageData1 = ctx1.getImageData(0,0,w,h);

            // canvas2 contains the stretched image
            var h2 = h * 68 / 35;
            var h2floor = Math.floor(h2);
            var canvas2 = this._genCanvas(w, h2floor);

            var ctx2 = canvas2.getContext('2d');
            var imageData2 = ctx2.createImageData(w, h2floor);

            var D1 = imageData1.data;
            var D2 = imageData2.data;

            // Index of variables:

            var ro;        // current density function value
            var y2;        // y, stretched image
            var y1;        // y, original image (calculated, float)
            var y1_floor;  // y, original image (floored)
            var y2_norm;   // y2 / h2 (normalized, 0 <= y2_norm <= 1)
            var y2_norm_2; // y2_norm squared
            var y1_norm;   // calculated normalized y of the orig img

            var rate0; // ratios of the current pixel,
            var rate1; // and the one on the next row

            var row = w*4; // imageData row (4 channels)
            var idx1;  // current pixel start idx (original image)
            var idx2;  // current pixel start idx (stretched image)
            var c;     // runs through color channels

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

            ctx2.putImageData(imageData2, 0, 0);

            // size of the side layer
            var layerSize = 0;
            var curSize = h2floor;
            for (var i = 1; i < FRAMENUM; i++) {
                curSize /= 4;
                layerSize += Math.floor(curSize);
            }

            // layer may be a bit smaller depending on offset
            layerSize = Math.floor(layerSize * .99);
            
            // how many steps do we need to reach 1 px
            var fullNum = 1 + Math.ceil(
                Math.log(1/h2floor) /
                Math.log(1/4)
            );
            
            // total height of the full num of layers
            var fullSize = 0;
            curSize = h2floor;
            for (i = 1; i < fullNum; i++) {
                curSize /= 4;
                fullSize += Math.floor(curSize);
            }
            

            // rotated images
            var S = this._genCanvas(w, h2floor);
            var ctxS = S.getContext('2d');
            ctxS.rotate(Math.PI);
            ctxS.drawImage(canvas2, -w, -h2floor);

            var E = this._genCanvas(h2floor, w);
            var ctxE = E.getContext('2d');
            ctxE.rotate(Math.PI/2);
            ctxE.drawImage(canvas2, 0, -h2floor);

            var W = this._genCanvas(h2floor, w);
            var ctxW = W.getContext('2d');
            ctxW.rotate(-Math.PI/2);
            ctxW.drawImage(canvas2, -w, 0);


            return {
                north    : canvas2,
                south    : S,
                east     : E,
                west     : W,
                size     : h2floor,
                layerSize : layerSize,
                fullNum  : fullNum,
                fullPow  : 1-Math.pow(1/4, fullNum-1),
                fullSize : fullSize,
                fullSize3 : fullSize*3,
                origSize : h,
                sideSize : w,
                points   : points
            };
        }
        
        
        /**
         * Creates and returns a canvas element
         * 
         * @param {Number} w width
         * @param {Number} h height
         * 
         * @returns {Element} created canvas element
         */
        CachedImg.prototype._genCanvas = function(w,h) {
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
         * Represents the element upgraded with the resize event
         * detector
         * 
         * @param {Element} elem to upgarde
         */
        var Resizable = function(elem) {
            this._elem = elem;
            this._detector = util.sample.object.cloneNode(false);
            util.setStyle(this._detector, {
                display  : 'block',
                position : 'absolute',
                top      : 0,
                left     : 0,
                height   : '100%',
                width    : '100%',
                overflow : 'hidden',
                pointerEvents : 'none',
                zIndex   : -2048
            });

            var me = this;
            this._detector.onload = function() {
                this.contentDocument.defaultView.addEventListener(
                    'resize', me.onresize
                );
            }

            this._detector.type = 'text/html';
            this._detector.data = 'about:blank';
            this._elem.appendChild(this._detector);
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
         * Represents a scrollable element shipped with
         * squeeze-indicators
         * 
         * @param {Element} elem to create scrollable indicators for
         */
        var Squeeze = function(elem) {
            this._elem = elem;
            var me = this;

            var children = util.detachChildren(this._elem);
            
            this._styleBackup = {
                margin : this._elem.style.overflow,
                overflow : this._elem.style.margin
            };

            var cs = getComputedStyle(elem);

            var innerStyle = {
                margin: cs.margin
            };

            util.setStyle(this._elem, {
                overflow: 'hidden',
                margin: 0
            });

            this._resizable = new Resizable(elem);
            this._resizable.onresize = function() {
                me._setGeometry();
            }

            this._cmp = {};
            this._cmp.scroller = util.sample.div.cloneNode(false);
            util.setStyle(this._cmp.scroller, {
                position  : 'absolute',
                overflowX : 'scroll',
                overflowY : 'scroll'
            });
            
            this._cmp.container = util.sample.div.cloneNode(false);
            util.attachChildren(this._cmp.container, children);

            util.setStyle(this._cmp.container, innerStyle);

            this._cmp.scroller.appendChild(this._cmp.container);
            this._elem.appendChild(this._cmp.scroller);

            this._cmp.sides = {};
            this._images = {};
            this._sideInitialized = {};
            this._whenSideInitialized = {};
            var url = this._elem.getAttribute('squeezeImg')||'';
            var side, img, initialize, dir;
            for (var i = 0; i < util.dir.length; i++) {
                dir = util.dir[i];
                side = util.sample.div.cloneNode(false);
                util.setStyle(side, {
                    display       : 'none',
                    pointerEvents : 'none',
                    position      : 'absolute'
                });

                this._cmp.sides[dir] = {
                    main: side,
                    subs: [],
                    ready : false,
                    size: 0
                };

                this._elem.appendChild(side);

                img = new CachedImg(
                    elem.getAttribute(
                        'squeezeImg' + util.cap1(dir)
                    )||url
                );

                this._sideInitialized[dir] = new Whenable;
                this._whenSideInitialized[dir] =
                    this._sideInitialized[dir].getSubscriber();

                this._images[dir] = img;

                img.whenLoaded(
                    (function(dir, img){
                         return function() {
                             me._initSide(dir, img.getStretched());
                             me._sideInitialized[dir].emit();
                         }
                     })(dir, img)
                );
            }

            whenAll(
                whenAny(
                    this._whenSideInitialized.north,
                    this._images.north.whenFailed
                ),
                whenAny(
                    this._whenSideInitialized.east,
                    this._images.east.whenFailed
                ),
                whenAny(
                    this._whenSideInitialized.south,
                    this._images.south.whenFailed
                ),
                whenAny(
                    this._whenSideInitialized.west,
                    this._images.west.whenFailed
                )
            )(function(){
// var end = (new Date).getTime();
// console.log(end-start);
                me._indicate()
            });

// var start = (new Date).getTime();

            this._cmp.scroller.addEventListener(
                'scroll', function(){me._indicate();}
            );

            this._setGeometry();
        }

        
        
        /**
         * Applies the geometry of subcomponents according to the
         * element dimensions
         */
        Squeeze.prototype._setGeometry = function() {
            var geom = this._elem.getBoundingClientRect();
            util.setStyle(this._cmp.container, {
                width  : geom.width,
                height : geom.height
            });
        }
        
        

        /**
         * Initializes the scrolling indicator for the given side with
         * the given CachedImage
         * 
         * @param {String} dir direction to initialize
         * @param {Object} image stretched image data
         */
        Squeeze.prototype._initSide = function(dir, image) {
            var size = image.layerSize;
            var sideObj = this._cmp.sides[dir];
            var side = sideObj.main;
            var style;

            switch(dir) {
            case 'north':
                style = {
                    width: '100%',
                    height: size,
                    top: 0,
                    left: 0
                };
                break;
            case 'east':
                style = {
                    width: size,
                    height: '100%',
                    top: 0,
                    right: 0
                };
                break;
            case 'south':
                style = {
                    width: '100%',
                    height: size,
                    bottom: 0,
                    left: 0
                };
                break;
            case 'west':
                style = {
                    width: size,
                    height: '100%',
                    top: 0,
                    left: 0
                };
                break;
            }

            style.display = 'inline';
            style.overflow = 'hidden';

            util.setStyle(side, style);

            // sub-elements
            style = {
                position: 'absolute'
            };

            switch(dir) {
            case 'north':
            case 'south':
                style.width = '100%';
                break;
            case 'west':
            case 'east':
                style.height = '100%';
                break;
            }

            var sub;
            for (var i = 0; i < FRAMENUM; i++) {
                sub = util.sample.div.cloneNode(false);
                util.setStyle(sub, style);
                util.backgroundCanvas(sub, image[dir]);
                side.appendChild(sub);
                sideObj.subs.push(sub);
            }

            sideObj.ready = true;
            sideObj.size = size;
        }
        
        
        /**
         * Updates the scrolling indicators on each side according to
         * the current scroll state of the element
         */
        Squeeze.prototype._indicate = function() {
            var geom = this._elem.getBoundingClientRect();
            var el = this._cmp.scroller;

            // amount of pixels beyond the displayed area
            var beyond = {
                north : el.scrollTop,
                south : el.scrollHeight - el.scrollTop - geom.height,
                west  : el.scrollLeft,
                east  : el.scrollWidth - el.scrollLeft - geom.width
            };

            var i;

            // NORTH
            var dir = 'north';
            if (this._cmp.sides[dir].ready) {
                var image = this._images[dir].getStretched();

                var origCoord = Math.round(beyond[dir]) % image.origSize;
                
                var offset = image.points[origCoord];
                
                // percentage of visible area of the first entry
                var F = offset / image.size;

                // actual size of the image
                var size = image.fullSize3 / (image.fullPow + 3*F);

                var realOffset = size * (offset/image.size);

                var subs = this._cmp.sides[dir].subs;

                var total = 0;
                var sizes = [];
                var firstSize = size;
                for (i = 0; i < subs.length; i++) {
                    sizes.push(size);
                    total += size;
                    size /= 4;
                }

                var top = Math.round(
                    image.layerSize - total + firstSize - realOffset
                );

                for (i = 0; i < subs.length; i++) {
                    size = sizes[subs.length-1-i]
                    util.setStyle(subs[i], {
                        top : Math.round(top),
                        height: Math.round(size),
                        backgroundSize:  image.sideSize + 'px '+Math.round(size)+'px',
                        backgroundPosition: '-'+beyond.west + 'px 0px'
                    });

                    top += Math.round(size);
                }

                var coef = 4000;
                var maskSize = 1 - 1 / (beyond.north/coef + 1);

                // mask
                util.gradientMask(
                    this._cmp.sides[dir].main, dir, maskSize
                );
            }


            
            
        }

        
        /**
         * Checks if the indicated element still has the squeeze class
         * 
         * @returns {Boolean} true if element is still indicated
         */
        Squeeze.prototype.hasSqueezeClass = function() {
            return util.hasClass(this._elem, 'squeeze');
        }

        

        /**
         * Removes the additional indicator elements, and restores the
         * element in its original state
         */
        Squeeze.prototype.destroy = function() {
            this._resizable.destroy();
            var children = util.detachChildren(this._cmp.container);
            util.detachChildren(this._elem);
            this._elem.squeeze = null;
            delete this._elem.squeeze;

            for (var prop in this._styleBackup) {
                if (this._styleBackup.hasOwnProperty(prop)) {
                    this._elem.style[prop] = this._styleBackup[prop];
                }
            }
            
            util.attachChildren(this._elem, children);
        }

        



        var squeezes = [];
        
        /**
         * Runs through all Squeezes, destroys those with elements
         * which do not have squeeze class anymore
         */
        var destroyUnsqueezed = function() {
            for (var i=0; i < squeezes.length; i++) {
                if (!squeezes[i].hasSqueezeClass()) {
                    squeezes[i].destroy();
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
            destroyUnsqueezed();
            createSqueezed();
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
      
    }
));

