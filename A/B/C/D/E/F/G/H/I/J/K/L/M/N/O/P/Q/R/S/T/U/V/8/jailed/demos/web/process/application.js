var scripts = document.getElementsByTagName('script');
var path = scripts[scripts.length-1].src
    .split('/')
    .slice(0, -1)
    .join('/')+'/';


// component shortcuts
var el = function(id) {
    return document.getElementById(id);
}


// generates random input and puts it into input field
var input;
function regen_input() {
    input = [];
    var len = 10;
    for (var i = 0; i < len; i++) {
        input.push(Math.floor(Math.random()*10));
    }

    el('input_data').innerHTML = stringify(input);
}

// extracts text content, properly treating <br> as newline
// (which would not be recognized by .textContent property)
function extractTextContent(el, selNode, selPos) {
    var text, pos = -1, content;
    if (el.length) {
        // text node
        text = el.textContent;

        if (selNode == el) {
            pos = selPos
        }
    } else {
        // node with subnodes
        text = '';
        for (var i = 0; i < el.childNodes.length; i++) {
            if (selNode == el && selPos == i) {
                pos = text.length;
            }

            content = extractTextContent(
                el.childNodes[i], selNode, selPos
            )

            if (content.pos >= 0) {
                pos = text.length + content.pos;
            }
            text += content.text;
        }

        if (/(br)/i.test(el.nodeName)) {
            text += '\n';

            if (selNode == el) {
                pos = 0;
            }
        }
    }

    return {text: text, pos: pos};
}

// processes the input data using provided code
function process() {
    el('output_data').innerHTML = '<img class="loading" src="loading.gif"/>';
    var code = extractTextContent(el('code')).text;

    var input = el('input_data').textContent;

    var plugin =  new jailed.Plugin(path+'plugin.js');
    var process = function() {
        var displayResult = function(result) {
            if (result.error) {
                el('output_data').innerHTML =
                    '<span class="error">'+result.error + '</span>';
            } else {
                el('output_data').innerHTML = stringify(result.output);
            }
            plugin.disconnect();
        }

        plugin.remote.process(input, code, displayResult);
    }

    plugin.whenConnected(process);
}


// converts an object into a string
function stringify(object) {
    var result;

    if (typeof object == 'undefined') {
        result = 'undefined';
    } else if (object === null) {
        result = 'null';
    } else {
        result = JSON.stringify(object) || object.toString();
    }

    return result;
}



// removes spaces from the end of the strings
function trim_tails(string) {
    var arr = string.split('\n');

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].replace(/[\s]+$/g, '');
    }

    return arr.join('\n');
}

// fills the processing code textarea with initial content
function fill_code() {
    var code = trim_tails([
        'function(input) {                                 ',
        '    // bubble-sorting the input array             ',
        '                                                  ',
        '    // switches the two elems if needed           ',
        '    // returns true if switched                   ',
        '    function switchEls(idx) {                     ',
        '        var switched = false;                     ',
        '                                                  ',
        '        if (input[idx] < input[idx-1]) {          ',
        '            var tmp = input[idx];                 ',
        '            input[idx] = input[idx-1];            ',
        '            input[idx-1] = tmp;                   ',
        '            switched = true;                      ',
        '        }                                         ',
        '                                                  ',
        '        return switched;                          ',
        '    }                                             ',
        '                                                  ',
        '    var switched;                                 ',
        '    do {                                          ',
        '        switched = false;                         ',
        '        for (var i = 1; i < input.length; i++) {  ',
        '            switched |= switchEls(i);             ',
        '        }                                         ',
        '    } while (switched);                           ',
        '                                                  ',
        '    return input;                                 ',
        '}                                                 ',
        '                                                  ',
        '                                                  '
    ].join('\n'));

//    code = 'aaa=bbb;';


    el('code').innerHTML = code;
}


function init_application() {
    el('input_row').onclick = regen_input;
    el('output_row').onclick = process;
    fill_code();
    regen_input();

    // caching
    var plugin =  new jailed.Plugin(path+'plugin.js');
    plugin.whenConnected(function(){plugin.disconnect();});

    el('code').focus();
}


function init_scrolling() {
    // updates mouse highlight indicator
    var lastActive = null;
    var mousedowned = false;

    var common_timestamp_code;
    var activate_code = function(activate) {
        var timeout = 300;
        var timestamp = common_timestamp_code = (new Date).getTime();

        if (activate) {
            el('code').style.transition = 'opacity .12s';
            el('code').style.opacity = '1';
        } else {
            // unhighlight should be a bit delayed to suppress filckering
            setTimeout( function() {
                if (timestamp == common_timestamp_code) {
                    el('code').style.transition = 'opacity .2s';
                    el('code').style.opacity = '.82';
                } // else new activation requested
            }, timeout);
        }
    }
    
    var common_timestamp_bg;
    var activate_bg = function(activate) {
        if (activate) {
            el('code_background').style.transition = 'opacity .11s';
            el('code_background').style.opacity = '1';
        } else {
            el('code_background').style.transition = 'opacity .25s';
            el('code_background').style.opacity = '.7';
        }
    }
    
    var update_indicator = function(e) {
        if (!mousedowned) {
            var hover = document.elementFromPoint(e.clientX, e.clientY);
            var active = null;
            if (el('code').contains(hover)) {
                active = 'code';
            } else if (hover == el('code_container').container) {
                active = 'code_background';
            }

            if (active != lastActive) {
                if (true) {
                    switch (active) {
                    case 'code':
                        activate_code(true);
                        activate_bg(true);
                        break;
                    case 'code_background':
                        activate_code(false);
                        activate_bg(true);
                        break;
                    default:
                        activate_code(false);
                        activate_bg(false);
                        break;
                    }
                } else {
                    if(lastActive == 'code') {
                        activate_code(false);
                    } else if (lastActive == 'code_background') {
                        activate_bg(false);
                    }

                    if(active == 'code') {
                        activate_code(true);
                    } else if (active == 'code_background') {
                        activate_bg(true);
                    }
                }
                lastActive = active;
            }
        }
    }

    var mousedown = function(e) {
        mousedowned = true;
        update_indicator(e);
    }

    var mouseup = function(e) {
        mousedowned = false;
        update_indicator(e);
    }


    el('code').addEventListener('mouseover', update_indicator, false);
    el('code').addEventListener('mouseout', update_indicator, false);
    el('code_container').addEventListener('mouseover', update_indicator, false);
    el('code_container').addEventListener('mouseout', update_indicator, false);

    window.addEventListener('mousedown', mousedown, false);
    window.addEventListener('mouseup', mouseup, false);

    activate_code(false);
    activate_bg(false);
}



function init_keypress() {
    var handle_keypress = function(e) {
        if (e.keyCode == 13) {  // Enter
            // adding spaces from the left side
            var sel = window.getSelection();
            var ran = sel.getRangeAt(0);
            if (el('code').contains(ran.startContainer) &&
                el('code').contains(ran.endContainer)
            ) {
                ran.deleteContents();

                var textContent = extractTextContent(
                    el('code'), ran.startContainer, ran.startOffset
                );

                // searching for the beginning of the last line
                var lines = textContent.text.
                            slice(0, textContent.pos).split('\n');
                
                var prevLine = lines[lines.length-1];
                var spaces = prevLine.substr(0, (prevLine+'.').search(/\S/));
                var data = '\n'+spaces;

                var node = document.createTextNode(data);
                ran.setStart(ran.endContainer, ran.endOffset);
                ran.insertNode(node);
                
                // putting the selection after the newline
                ran.setStart(node, data.length);
                ran.setEnd(node, data.length);
                sel.removeAllRanges();
                sel.addRange(ran);
                e.preventDefault();
            }
        }


    }

    /*
     var obs = new MutationObserver(function() {
        var sel = window.getSelection();
        var select = sel.rangeCount;
        if (select) {
            var ran = sel.getRangeAt(0);
        }
        var code = extractTextContent(el('code')).text;
        if (code == '') {
            el('code').innerHTML = '\n';
            if (select) {
                ran.setStart(el('code'), 0);
                sel.removeAllRanges();
                sel.addRange(ran);
            }
        }
    });

    obs.observe(el('code'), {
        characterData : 1,
        subtree       : 1,
        childList     : 1
    });
     */

//    el('code').addEventListener('keypress', handle_keypress, false);
}


function init() {
    init_application();
    init_scrolling();
    init_keypress();
}

window.addEventListener("load", init, false);

