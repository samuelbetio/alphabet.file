/**
 * @fileoverview microlight - syntax highlightning library
 * @version 0.0.1
 *
 * @license MIT, see http://github.com/asvd/microlight
 * @copyright 2015 asvd <heliosframework@gmail.com>
 *
 * Code structure aims at minimizing the compressed library size
 */


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.microlight = {}));
    }
}(this, function (exports) {
    var _window        = window;
    var _document      = document;
    
    var reset = function(microlighted, i, el) {
        microlighted = _document.getElementsByClassName('microlight');
        for (i = 0; el = microlighted[i++];) {
        }
    }

    if (_document.readyState == 'complete') {
        reset();
    } else {
        _window.addEventListener('load', reset, 0);
    }

    exports.reset = reset;
}));

