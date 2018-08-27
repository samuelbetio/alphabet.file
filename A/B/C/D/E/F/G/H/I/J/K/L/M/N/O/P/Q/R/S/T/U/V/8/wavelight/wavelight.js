/**
 * @fileoverview wavelight - high-performance language-agnostic live
 *                           syntax-highlighting library
 *
 * @version 0.0.1
 *
 * @license MIT, see http://github.com/asvd/wavelight
 * @copyright 2015 asvd <heliosframework@gmail.com>
 *
 * Code structure aims at following points in the given priority:
 *  1. performance
 *  2. compressed library size
 *  3. readability
 */


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.wavelight = {}));
    }
}(this, function (exports) {
    // shortcuts for better compression
    var _window    = window;
    var _document  = document;
    var wavelight = 'wavelight';
    var createElement  = 'createElement';
    var spanSample     = _document[createElement]('span');
    var brSample       = _document[createElement]('br');
    var compareDocumentPosition = 'compareDocumentPosition';

    // style and color templates
    var textShadow    = ';text-shadow:',
        opacity       = 'opacity:.',
        _0px_0px      = ' 0px 0px ',
        _3px_0px_5    = '3px 0px 5',
        brace         = ')';

    var observerOptions = {
        characterData : 1,
        subtree       : 1,
        childList     : 1
    }

    var reset = function(
        cls,  // element class to highlight, defaults to 'wavelight'
        // locals
        wavelighted,
        i,
        el
    ) {
        wavelighted = _document.getElementsByClassName(cls||wavelight);

        for (i = 0; el = wavelighted[i++];) {
            if (!el[wavelight]) {
                // fixing the el in the closure
                (function(el) {

var

/**
 * True if highlight is currently in progress
 */
highlightRunning,



/**
 * Start and end nodes suspicious for changes. The mentioned nodes,
 * and the content in between is suspicious and should be rechecked.
 *
 * After the end node is reached, the tail might be reformatted.
 */
redrawStart,
redrawEnd,

// keeps mutation observer
observer,



// TODO Where did I forgot to run through mutation observer events?
                    
/**
 * Extends the redraw range to include the given point. Just like as
 * with selection borders, the point is determined by anode and offest
 *
 * @param {Object} node must be el, or a (sub)child
 * @param {Object} offset
 */
extendRedrawRange = function(node, offset) {
    // moving to the top until we reach the element
    while (node != el && node.parentNode != el) {
        node = node.parentNode;
        offset = 0;
    }

    if (redrawStart) {
        // redrawEnd can be before redrawStart, fixing
        redrawEnd =
            // 1 if redrawEnd follows redrawEnd
            redrawEnd[compareDocumentPosition](redrawStart) & 2 ?
            redrawEnd : redrawStart;

        var node1 = node;
        var node2 = node;
        if (node == el) {
            node1 = el.childNodes[offset-1] || el.firstChild;
            node2 = el.childNodes[offset]   || el.lastChild;
        }

        redrawStart =
            // 1 if redrawStart precedes node
            redrawStart[compareDocumentPosition](node1) & 4 ?
            redrawStart : node1;

        redrawEnd =
            // 1 if redrawEnd follows node
            redrawEnd[compareDocumentPosition](node2) & 2 ?
            redrawEnd : node2;
    } else {
        // creating new redraw range
        if (node == el) {
            // position between the nodes
            redrawStart = el.childNodes[offset-1] || el.firstChild;
            redrawEnd   = el.childNodes[offset]   || el.lastChild;
        } else {
            redrawStart = redrawEnd = node;
        }
    }

},


// keeps drop coordinates if change caused by content drop
dropCoord,


/**
 * Listens for the changes on the element. If new content was dropped
 * on the element, converts it into plain text, so that any foreign
 * formatting is removed. Initiates the highlighting if it is not
 * running yet.
 */
changeListener = function() {
    var sel = window.getSelection();
    var caret;
    if (sel.rangeCount) {
        var ran = sel.getRangeAt(0);
        extendRedrawRange(ran.startContainer, ran.startOffset);
        extendRedrawRange(ran.endContainer,   ran.endOffset);
        var comp;

        if (
            // element contains selection start and end
            // (.contains() method works wrong at least in IE11)
            ((!(comp = ran.startContainer[compareDocumentPosition](el))) ||
                comp & 8) &&
            ((!(comp = ran.endContainer[compareDocumentPosition](el))) ||
                comp & 8)
        ) {
            // calculating the pasted content region
            if (dropCoord) {
                // firefox does not select the dropped content
                // moving selection to the pointer position
                if (document.caretPositionFromPoint) {
                    caret = document.caretPositionFromPoint(
                        dropCoord.x, dropCoord.y
                    );

                    ran.setStart(caret.offsetNode, caret.offset);
                    // selection end is normally somwhere
                    // after the pasted content
                }
            }
            dropCoord = 0;

            if (ran.startNode   != ran.endNode   ||
                ran.startOffset != ran.endOffset
            ) {
                // converting the selection into plain text
                observer.disconnect();

                var content = ran.extractContents();
                var text = '';
                var node = content;
                var pos = 0;
                var out = {n: node, p: pos};

                do {
                    text += (out = getChr(out.n, out.p, content)).c;
                } while (out.c);
                var newNode = document.createTextNode(text);
                ran.insertNode(newNode);
                
                if (caret) {
                    // leave FF without selection range
                    // (it may have its end in a wrong place)
                    ran.setStart(newNode, newNode.length);
                    ran.setEnd(newNode, newNode.length);
                }

                sel.removeAllRanges();
                sel.addRange(ran);

                observer.observe(el, observerOptions);
            }

            if (!highlightRunning) {
                drawToken();
            }
        }
    }
},



/**
 * Scans the first dirty range, generates a single token and schedules
 * itself, in case there is something dirty still left
 */
drawToken = function() {
    observer.disconnect();

    highlightRunning = 1;

    var lastTokenText = '';
    var lastTokenType = 0;
    var lastUncompletedTokenType = 0;
    var node = el;
    var pos = 0;

    // selection position, if should be inside token
    var selStart = -1;
    var selEnd = -1;

    if (redrawStart.previousSibling) {
        lastTokenText = redrawStart.previousSibling.tokenText;
        lastTokenType = redrawStart.previousSibling.tokenType;
        lastUncompletedTokenType =
            redrawStart.previousSibling.uncompletedTokenType;
    }
    
    node = el;
    pos = 0;
    while (el.childNodes[pos] != redrawStart) {
        pos++;
    }

    var changeStartNode = node;
    var changeStartPos = pos;

    var tokenText = '';
    var tokenIncomplete; // 1 if interrupted with a newline

    // calculating the colors for the style templates
    var colorArr = /(\d*\, \d*\, \d*)(, ([.\d]*))?/g.exec(
            _window.getComputedStyle(el).color
        ),
        pxColor = 'px rgba('+colorArr[1]+',',
        alpha = colorArr[3]||1;


// TODO add strings with `

    // token types:
    //  0: anything else (not highlighted)
    //  1: newline (separate token as <br/> tag)
    //  2: whitespaces
    //  3: operators and braces
    //  4: closing brace (after which '/' is division not regex)
    //  5: (key)word
    //  6: regex
    //  7: string starting with "
    //  8: string starting with '
    //  9: xml comment  <!-- -->
    // 10: multiline comment /* */
    // 11: single-line comment starting with two slashes //
    // 12: single-line comment starting with a hash #
    var tokenType = 0;

    // points where the selection range is restored upon redraw
    var sel = window.getSelection();
    var ran;
    var startNode, startPos, endNode, endPos;
    if (sel.rangeCount) {
        ran = sel.getRangeAt(0);
        startNode = ran.startContainer;
        startPos  = ran.startOffset;
        endNode   = ran.endContainer;
        endPos    = ran.endOffset;
        
        // node count may change, moving selection inside nodes
        if (startNode == el) {
            if (el.firstChild) {
                if (startPos < el.childNodes.length) {
                    // taking the node right after the point
                    startNode = el[startPos];
                    startPos = 0;
                } else {
                    // taking the end of the last node
                    startNode = el.lastChild;
                    startPos =
                        startNode.length ||
                        startNode.childNodes.length;
                }
            }  // otherwise el has no children
        }

        if (endNode == el) {
            if (el.firstChild) {
                if (endPos < el.childNodes.length) {
                    // taking the node right after the point
                    endNode = el[endPos];
                    endPos = 0;
                } else {
                    // taking the end of the last node
                    endNode = el.lastChild;
                    endPos =
                        endNode.length ||
                        endNode.childNodes.length;
                }
            }  // otherwise el has no children
        }
    }

    while (1) {
        // determining token type
        // (can be changed upon new symbol added, if i.e token starts
        // as '<!--' which will be first recognized as punctuation,
        // but then change into xml comment)

        var firstChr = tokenText[0];
        var last1Chr  = tokenText[tokenText.length-1];
        var last2Chr  = tokenText[tokenText.length-2];
        if (firstChr == '\n') {
            tokenType = 1;
        } else if (lastUncompletedTokenType) {
            tokenType = lastUncompletedTokenType;
        } else if ('{}[(-+*=>:;|\\.,?!&@~'.indexOf(firstChr) != -1) {
            // slash and winkel checked later, can be a comment or a regex
            tokenType = 3;
        } else {
            // going down until matching a token type start condition
            tokenType = 13;
            while (![
                1,                   //  0: anything else 
                0,                   //  1: newline
                /\s/.test(firstChr), //  2: whitespaces
                                     //  3: operator or braces
                firstChr == '/' || firstChr == '<',
                                     //     (others checked above)
                                     //  4: closing brace
                firstChr == ']' || firstChr == ')',
                                     //  5: word
                firstChr && /[$\w]/.test(firstChr),
                firstChr == '/' &&   //  6: regex
                    // previous token was an
                    // opening brace or an
                    // operator (otherwise
                    // division, not a regex)
                    lastTokenType < 4 &&
                    // workaround for xml
                    // closing tags
                    lastTokenText[lastTokenText.length-1] != '<',
                firstChr == '"',     //  7: string with "
                firstChr == "'",     //  8: string with '
                                     //  9: xml comment
                tokenText.substr(0,4) == '<!--',
                                     // 10: multiline comment
                tokenText.substr(0,2) == '/*',
                                     // 11: single-line comment
                tokenText.substr(0,2) == '//',
                firstChr == '#'      // 12: hash-style comment
            ][--tokenType]);
        }

        // picking the next character from the DOM
        var chrData = getChr(
            node, pos, 0, startNode, startPos, endNode, endPos
        );

        // noting the selection poistion
        if (chrData.S) {
            // selection start right before the scanned character
            selStart = tokenText.length;
        }

        if (chrData.E) {
            // selection end right before the scanned character
            selEnd = tokenText.length;
        }


        // escaping the last character, so that it is not recognized
        // as a token finalize condition (with except for compents)
        if (tokenType < 9 && last2Chr == '\\') {
            last1Chr = 0;
        }

        var tokenMultichar = tokenText.length > 1;
        
        // checking if token should be finalized
        if (!chrData.c || // end of content
            [ // finalize conditions for every token type
                // 0: anything else
                tokenText != '',
                // 1: newline, consist of a single character
                1,
                // 2: whitespaces, merged together
                /\S/.test(chrData.c),
                // 3: operators and braces
                // consist of a single character with except for the
                // cases when text matches the start pattern for the
                // comments
                (
                    !'<!--'.indexOf(tokenText) ||
                    !'/*'.indexOf(tokenText)   ||
                    !'//'.indexOf(tokenText)
                ) ? 
                    // maybe comment start
                   '{}[(-+*=<>:;|\\./,?!&@~'.indexOf(chrData.c) == -1 :
                    // ordinary punctuation, consist of a single character
                    1,
                // 4: closing brace, single character
                1,
                // 5: (key)word
                !/[$\w]/.test(chrData.c),
                // 6: regex
                last1Chr == '/' && tokenMultichar,
                // 7: string starting with "
                last1Chr == '"' && tokenMultichar,
                // 8: string starting with '
                last1Chr == "'" && tokenMultichar,
                // 9: xml comment
                tokenText.substr(tokenText.length-3) == '-->',
                // 10: multiline comment /* */
                tokenText.substr(tokenText.length-2) == '*/'
                // 11-12: single-line comments interrupted with a newline
            ][tokenType] ||
            // interrupted with a newline
            (tokenText.length &&
             chrData.c == '\n' && (
                // single-line comments and punctuation end with a newline
                tokenType > 10 ||
                // other token types interrupted
                (tokenIncomplete = 1)
            ))
        ) {
            // marking uncompleted token type
            var uncompletedTokenType = 0;

            if (tokenType == 1 && lastUncompletedTokenType) {
                // newline
                uncompletedTokenType = lastUncompletedTokenType;
            } else if (tokenIncomplete) {
                // normal token
                uncompletedTokenType = tokenType;
            }



            // checking if we should finish the highlight
            if (!chrData.c) {
                highlightRunning = 0;
            } else {
               // finding the topmost node at change position
               var currentTokenNode = node;
               while (currentTokenNode.parentNode != el) {
                   currentTokenNode = currentTokenNode.parentNode;
               }

                if (el[compareDocumentPosition](redrawEnd) & 1 ||
                    // redrawEnd passed
                    currentTokenNode[compareDocumentPosition](redrawEnd) & 2
                ) {
                    // generated token maches already existing
                    if (currentTokenNode.tokenText == tokenText &&
                        currentTokenNode.uncompletedTokenType == uncompletedTokenType
                       ) {
                        highlightRunning = 0;
                    }
                }
            }

            if (highlightRunning) {
                // extracting the originas contents
                var contents;
                sel.removeAllRanges();
                ran = document.createRange();
                ran.setStart(changeStartNode, changeStartPos);
                ran.setEnd(node, pos);  // current parsing point
                sel.addRange(ran);

                contents = ran.extractContents();                

                // rendering the token
                var tokenWholeNode, tokenTextNode;

                if (tokenType == 1) {
                    // newline, represented with a <br/> element
                    tokenTextNode = 
                        tokenWholeNode = brSample.cloneNode(0);
                } else {
                    // normal node, inline <span> element
                    tokenWholeNode  = spanSample.cloneNode(0);
                    var tokenShadowNode = spanSample.cloneNode(0);
                    var tokenWrapperNode = spanSample.cloneNode(0);
                    var tokenContentNode = spanSample.cloneNode(0);
                    tokenTextNode = document.createTextNode(tokenText);

                    tokenContentNode.appendChild(tokenTextNode);

                    tokenContentNode.setAttribute('style', [
                        // 0: not formatted
                        '',
                        // 1: keywords
                        textShadow + _0px_0px+9+pxColor + alpha * .7 + '),' +
                                     _0px_0px+2+pxColor + alpha * .4 + brace,
                        // 2: punctuation
                        opacity + 6 +
                        textShadow + _0px_0px+7+pxColor + alpha / 4 + '),' +
                                     _0px_0px+3+pxColor + alpha / 4 + brace,
                        // 3: strings and regexps
                        opacity + 7 +
                        textShadow + _3px_0px_5+pxColor + alpha / 5 + '),-' +
                                     _3px_0px_5+pxColor + alpha / 5 + brace,
                        // 4: comments
                        'font-style:italic;'+
                        opacity + 5 +
                        textShadow + _3px_0px_5+pxColor + alpha / 4 + '),-' +
                                     _3px_0px_5+pxColor + alpha / 4 + brace
                    ][
                        // not formatted
                        tokenType < 3 ? 0 :
                        // punctuation
                        tokenType < 5 ? 2 :
                        // comments
                        tokenType > 8 ? 4 :
                        // regex and strings
                        tokenType > 5 ? 3 :
                        // otherwise tokenType == 5, (key)word
                        // (1 if regexp matches, 0 otherwise)
                        + /^(a(bstract|lias|nd|rguments|rray|s(m|sert)?|uto)|b(ase|egin|ool(ean)?|reak|yte)|c(ase|atch|har|hecked|lass|lone|ompl|onst|ontinue)|de(bugger|cimal|clare|f(ault|er)?|init|l(egate|ete)?)|do|double|e(cho|ls?if|lse(if)?|nd|nsure|num|vent|x(cept|ec|p(licit|ort)|te(nds|nsion|rn)))|f(allthrough|alse|inal(ly)?|ixed|loat|or(each)?|riend|rom|unc(tion)?)|global|goto|guard|i(f|mp(lements|licit|ort)|n(it|clude(_once)?|line|out|stanceof|t(erface|ernal)?)?|s)|l(ambda|et|ock|ong)|m(icrolight|odule|utable)|NaN|n(amespace|ative|ext|ew|il|ot|ull)|o(bject|perator|r|ut|verride)|p(ackage|arams|rivate|rotected|rotocol|ublic)|r(aise|e(adonly|do|f|gister|peat|quire(_once)?|scue|strict|try|turn))|s(byte|ealed|elf|hort|igned|izeof|tatic|tring|truct|ubscript|uper|ynchronized|witch)|t(emplate|hen|his|hrows?|ransient|rue|ry|ype(alias|def|id|name|of))|u(n(checked|def(ined)?|ion|less|signed|til)|se|sing)|v(ar|irtual|oid|olatile)|w(char_t|hen|here|hile|ith)|xor|yield)$/.test(tokenText)
                    ]);


                    tokenShadowNode.appendChild(contents);
                    tokenShadowNode.setAttribute(
                        'style',
                        '-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;pointer-events:none;overflow: hidden; position:absolute;'
                    );

                    // indicator
                    tokenShadowNode.style.textDecoration = 'line-through';
//                  tokenShadowNode.style.backgroundColor = '#000000';
//                    tokenShadowNode.style.textShadow =  '0px 0px 9px rgba(124, 255, 0, 0.7), 0px 0px 2px rgba(0, 255, 142, 0.6)';


                    tokenShadowNode.wavelightShadow = 1;

                    tokenWholeNode.appendChild(tokenShadowNode);
                    tokenWrapperNode.appendChild(tokenContentNode);
                    tokenWholeNode.appendChild(tokenWrapperNode);
                }


                ran.insertNode(tokenWholeNode);

                if (tokenType != 1) {
                    // setting-up the animation
                    var duration = .3;
                    setTimeout(
                        function() {
                            observer.disconnect();
                            tokenShadowNode.parentNode.removeChild(tokenShadowNode);
                            observer.observe(el, observerOptions);
                        }, duration*1000
                    );
                    tokenWrapperNode.style.opacity = 0;
                    tokenShadowNode.style.opacity = 1;
                    tokenWholeNode.offsetHeight;            // force redraw
                    tokenWrapperNode.style.transitionProperty = 'opacity';
                    tokenWrapperNode.style.transitionDuration = duration + 's';
                    tokenShadowNode.style.transitionProperty = 'opacity';
                    tokenShadowNode.style.transitionDuration = duration + 's';
                    tokenShadowNode.style.transitionDelay = duration/4 + 's';
                    tokenWrapperNode.style.opacity = 1;
                    tokenShadowNode.style.opacity = 0;
                }


                // storing token info
                tokenWholeNode.tokenText = tokenText;

                // skipping whitespaces and comments
                tokenWholeNode.tokenType =
                    (tokenType > 2 && tokenType < 9) ?
                    tokenType :
                    lastTokenType;

                tokenWholeNode.uncompletedTokenType = uncompletedTokenType;

                // fixing selection range before restoratino
// TODO properly set between the nodes of el
                if (selStart >= 0) {
                    startNode = tokenTextNode;
                    startPos  = selStart;
                }

                if (selEnd >= 0) {
                    endNode = tokenTextNode;
                    endPos  = selEnd;
                }

                // restoring the selection
                sel.removeAllRanges();
                if (startNode) {
// TODO fails if selection inside modified token - maybe put a marker node
                    try {
                    ran.setStart(startNode, startPos);
                    } catch(e) {debugger}
                    ran.setEnd(endNode, endPos);
                    sel.addRange(ran);
                }


                redrawStart = tokenWholeNode.nextSibling;
                setTimeout(drawToken, 0);
            } else {
                redrawStart = redrawEnd = 0;
            }

            observer.observe(el, observerOptions);

            break;
        }
        
        // appending another character
        tokenText += chrData.c;
        node       = chrData.n;
        pos        = chrData.p;
    }

},


/**
 * Recursively runs through DOM starting from the given point, until a
 * single character is extracted. Returns an object containing the
 * character, the new point after that character. Also returns the
 * flags designating if the current selection start or end points are
 * located right before the extracted character
 *
 * @param {Object} node to start burrowing from
 * @param {Number} pos of a sub-element inside that node
 * @param {Object} limitEl not to exceed
 * @param {Object} startNode of the selection
 * @param {Number} startPos of the selection
 * @param {Object} endNode of the selection
 * @param {Number} endPos of the selection
 *
 * @returns {Object} with following fields
 *  .c - newly scanned character
 *  .n - node of the point after the character
 *  .p - position of the point after the character
 *  .S - true if selection start is right before the point
 *  .E - true if selection end is right before the point
 */
getChr = function(
    node, pos, limitEl, startNode, startPos, endNode, endPos
) {
    var chr = '';
    var selStart = 0, selEnd = 0;

    var nodeIsOver = 0;

    while (!chr) {
        selStart |= (startNode == node) && (startPos == pos);
        selEnd   |= (endNode   == node) && (endPos   == pos);

        if (node.length) {
            // text node
            if (pos < node.length) {
                chr = node.textContent[pos];
                pos++;
            } else if (node == (limitEl||el)) {
                // end of content
                break;
            } else {
                nodeIsOver = 1;
            }
        } else {
            // normal node
            if (node.wavelightShadow) {
                // skipping wavelight shadow nodes
                nodeIsOver = 1;
            } else if (pos < node.childNodes.length) {
                // switching into the node
                node = node.childNodes[pos];
                pos = 0;
            } else if (node == (limitEl||el)) {
                // end of content
                break;
            } else {
                if (/(br|tr)/i.test(node.nodeName) &&
                    // mozilla adds <br>'s when it wants
                    node.getAttribute('type') != '_moz'
                ) {
                    chr = '\n';
                }

                nodeIsOver = 1;
            }
        }

        if (nodeIsOver) {
            nodeIsOver = 0;
            
            if (node.nextSibling) {
                node = node.nextSibling;
                pos = 0;
            } else {
                // going to the end of parent node
                node = node.parentNode;
                pos = node.childNodes.length;
            }
        }
    }

    return {
        c : chr,
        n : node,
        p : pos,
        S : selStart,
        E : selEnd
    };
};


/**
 * Resets the highlight for the whole element
 *
 * Stored as the element method to be accessible from outside
 */
el[wavelight] = function() {
    redrawStart = el.firstChild;
    redrawEnd = el.lastChild;

    if (!highlightRunning) {
        drawToken();
    }
}

el.addEventListener('paste', function(e) {
    var sel = window.getSelection(), ran;
    if (sel.rangeCount) {
        ran = sel.getRangeAt(0);
        extendRedrawRange(ran.startContainer, ran.startOffset);
        extendRedrawRange(ran.endContainer,   ran.endOffset);
    }

    e.preventDefault();

    // throws IndexSizeError on FF, but works
    document.execCommand(
        "insertText",
        0,
        e.clipboardData.getData("text/plain")
    );
});

// subscribing to the node change event
(observer = new MutationObserver(
    changeListener
)).observe(el, observerOptions);


el.addEventListener(
    'drop',
    function(e) {
        dropCoord = {
            x : e.clientX,
            y : e.clientY
        };
    }
);


                })(el);
            }

            // reset highlight for the element
            el[wavelight]();
        }

    }


    if (_document.readyState == 'complete') {
        reset();
    } else {
        _window.addEventListener('load', function(){reset()});
    }

    exports.reset = reset;
}));

