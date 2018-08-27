/**
 * @fileoverview fuckcapslock - ignores capslock state
 * @version 0.0.0
 * 
 * @license MIT, see http://github.com/asvd/fuckcapslock
 * @copyright 2015 asvd <heliosframework@gmail.com> 
 */


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else {
        factory();
    }
}(this, function () {
    // returns the given element if it is input or textarea
    var ifBasicInput = function(el) {
        var result = null;
        if (el) {
            var nodename = el.nodeName.toLowerCase();
            if (nodename == 'input' || nodename == 'textarea') {
                result = el;
            }
        }
        return result;
    }

    var blurTrackedEls = [];


    // prints the given character in the currently edited element
    var putChr = function(chr) {
        var basicInputEl = null;

        var sel = window.getSelection();
        if (sel.rangeCount) {
            var ran = sel.getRangeAt(0);

            if (ran.startContainer == ran.endContainer &&
                ran.startOffset == ran.endOffset
            ) {
                // in Chrome input element is the given subchild
                // in FF startContainer points to input element itself
                basicInputEl = 
                    ifBasicInput(ran.startContainer) ||
                    (ran.startContainer.firstChild ? 
                     ifBasicInput(ran.startContainer.childNodes[ran.startOffset]) :
                     null);
            }

            var contenteditable = false;
            var node = ran.startContainer;

            do {
                if (node.getAttribute &&
                    node.getAttribute('contenteditable')=='true'
                ) {
                    contenteditable = true;
                    break;
                }
                node = node.parentNode;
            } while (node.parentNode);

            if (contenteditable) {
                var endnode = ran.endContainer;
                if (contenteditable &&
                    (endnode == node ||
                     // contenteditable node contains endnode
                     endnode.compareDocumentPosition(node) & 8)
                ) {
                    // selection fully inside contenteditable area
                    ran.deleteContents();
                    node = ran.startContainer;
                    if (node.firstChild &&
                        ran.startOffset > 0 &&
                        node.childNodes[ran.startOffset-1].length
                    ) {
                        // standing right after text node, moving into
                        node = node.childNodes[ran.startOffset-1];
                        ran.setStart(node, node.length);
                        ran.setEnd(node, node.length);
                    }

                    if (node.length) {
                        // text node, inserting inside element
                        value = node.textContent;
                        var point = ran.startOffset;
                        node.textContent = 
                            value.substr(0, point) +
                            chr +
                            value.substr(point, value.length-point);
                        ran.setStart(node, point+1);
                        ran.setEnd(node, point+1);
                    } else {
                        // between nodes, inserting textnode
                        var textnode = document.createTextNode(chr);
                        ran.insertNode(textnode);
                        ran.setStartAfter(textnode);
                        ran.setEndAfter(textnode);
                    }
                    sel.removeAllRanges();
                    sel.addRange(ran);
                }
            }
        } else {
            // in FF focused inputs are sometimes not reflected in
            // selection
            basicInputEl = ifBasicInput(document.activeElement);
        }

        if (basicInputEl) {
            var value = basicInputEl.value;
            var selStart = basicInputEl.selectionStart;
            var selEnd = basicInputEl.selectionEnd;
            basicInputEl.value =
                value.substr(0, selStart) +
                chr +
                value.substr(selEnd, value.length-selEnd);

            basicInputEl.setSelectionRange(selStart+1, selStart+1);

            // blur and focus will scroll to selection
            // (also suppressing the respective events)

            // check if we are not in FF where this trick is not
            // needed and leads to caret disappear
            if (typeof InstallTrigger == 'undefined') {
                var suppress = function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation(); 
                }

                window.addEventListener('focus', suppress, true);
                window.addEventListener('blur', suppress, true);

                basicInputEl.blur();
                basicInputEl.focus();

                window.removeEventListener('focus', suppress, true);
                window.removeEventListener('blur', suppress, true);

                basicInputEl.setSelectionRange(selStart+1, selStart+1);
            }

// not for IE 11
// TODO
            try {
                var evt = new KeyboardEvent('input', {
                    bubbles : true
                });
                basicInputEl.dispatchEvent(evt);
            } catch(e) {}

            // change event should be fired on blur, which does not
            // happen if the element was only changed via putChr(), so
            // it should be tracked and re-emitted
            var tracked = false;
            for (var i = 0; i < blurTrackedEls.length; i++) {
                if (blurTrackedEls[i] == basicInputEl) {
                    tracked = true;
                    break;
                }
            }

            if (!tracked) {
                var blurListener = function(e) {
                    if (basicInputEl == (e.target || e.srcElement)) {
                        // blur should be fired after change, so we
                        // suppress and reemit the events in the right
                        // order
                        var ev;
                        try {
                            ev = new KeyboardEvent('change', {
                                bubbles : true
                            });
                        } catch(e) {
                            ev = document.createEvent('CustomEvent');

                            ev.initCustomEvent(
                                'change',
                                true,
                                false,
                                null
                            )
                            
                        }
                        basicInputEl.dispatchEvent(ev);

                        e.stopImmediatePropagation(); 
                    }
                }

                var changeListener = function() {
                    // cancelling the tracking
                    basicInputEl.removeEventListener(
                        'change', changeListener, true
                    );
                    basicInputEl.removeEventListener(
                        'blur', blurListener, true
                    );

                    for (var i = 0; i < blurTrackedEls.length; i++) {
                        if (blurTrackedEls[i] == basicInputEl) {
                            blurTrackedEls.splice(i, 1);
                            break;
                        }
                    }
                }

                basicInputEl.addEventListener(
                    'change', changeListener, true
                );

                basicInputEl.addEventListener(
                    'blur', blurListener, true
                );

                blurTrackedEls.push(basicInputEl);
            } // otherwise blur already tracked
        }

    }


    // redefining preventDefault to recognize if it was called for
    // artificially emitted events
    var preventingDefault = false;
    var defaultPrevented;
    var preventDefaultOriginal = Event.prototype.preventDefault;
    Event.prototype.preventDefault = function() {
        if (preventingDefault) {
            defaultPrevented = true;
        }

        preventDefaultOriginal.apply(this, arguments);
    }


    var events = [
        'keypress',
        'keydown',
        'keyup'
    ];

    for (var i = 0; i < events.length; i++) {
        var name = events[i];

        // handler is generated in order to prevent event name from
        // getting into the closure
        var genHandler = function(name) {
            return function(e) {
                var shift = e.shiftKey;
                var ctrl = e.ctrlKey;

                var chr = false;
                if (e.key && e.key.length == 1) {
                    chr = e.key;
                } else if (typeof e.which != 'undefined') {
                    chr = String.fromCharCode(e.which);
                } else if (typeof e.keyCode != 'undefined') {
                    chr = String.fromCharCode(e.keyCode);
                }

                var isLetter = chr.toLowerCase() != chr.toUpperCase();

                var capslock = 
                        e.getModifierState ?
                        e.getModifierState('CapsLock') :
                   ((chr != chr.toLowerCase() && !shift) ||
                    (chr != chr.toUpperCase() &&  shift));

                if (isLetter && capslock) {
                    chr = chr[shift ? 'toUpperCase' : 'toLowerCase']();
                    var chrcode = chr.charCodeAt(0);

                    // fixed event config
                    var cfg = {
                        bubbles       : e.bubbles,
                        composed      : e.composed,
                        view          : e.view,
                        ctrlKey       : e.ctrlKey,
                        shiftKey      : e.shiftKey,
                        altKey        : e.altKey,
                        metaKey       : e.metaKey,

                        key           : chr,
                        code          : e.code,
                        charCode      : e.charCode,
                        which         : e.which,
                        keyCode       : e.keyCode
                    }

                    if (name == 'keypress') {
                        cfg.charCode  = chrcode;
                        cfg.which     = chrcode;
                        // can be 0 in FF, and should be preserved
                        if (e.keyCode != 0) {
                            cfg.keyCode   = chrcode;
                        }
                    }

                    // creating the event
                    var fixedEvent;
                    try {
                        fixedEvent = new KeyboardEvent(name, cfg);
                    } catch(e) {
                        var all = [
                            'Ctrl', 'Shift', 'Alt', 'Meta'
                        ];
                        var modifiers = [];
                        for (var i = 0; i < all.length; i++) {
                            if (e[all[i].toLowerCase() + 'Key']) {
                                modifiers.push(all[i]);
                            }
                        }

                        fixedEvent = document.createEvent('KeyboardEvent');

                        fixedEvent.initKeyboardEvent(
                            name,
                            cfg.bubbles,
                            cfg.cancelable,
                            window,
                            chr,
                            e.location,
                            modifiers.join(' '),
                            e.repeat,
                            e.locale
                        );
                    }

                    // defining getters for the event properties
                    for (var cfgKey in cfg) if (cfg.hasOwnProperty(cfgKey)) {
                        var cfgVal = cfg[cfgKey];
                        Object.defineProperty(
                            fixedEvent,
                            cfgKey,
                            { // val should not get into closure
                                get: (function(val){
                                    return function(){return val}
                                })(cfg[cfgKey])
                            }
                        );
                    }

                    // emitting the event and tracking preventDefault
                    preventingDefault = true;
                    defaultPrevented = false;
                    e.target.dispatchEvent(fixedEvent);
                    preventingDefault = false;

                    if (name == 'keydown') {
                        if (defaultPrevented) {
                            e.preventDefault();
                        }  // default emits the keypress
                    } else {
                        e.preventDefault();
                        if (name == 'keypress') {
                            if (!defaultPrevented && !ctrl) {
                                // default prints the character
                                putChr(chr);
                            }
                        }
                    }

                    e.stopImmediatePropagation(); 
                }
            }
        }

        window.addEventListener(name, genHandler(name), true);
    }


    
}));

