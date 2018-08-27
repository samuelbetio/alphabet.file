
var createEl = function(cls) {
    var node = document.createElement('div');
    node.className = cls;
    return node;
}


var createSpan = function(cls) {
    var node = document.createElement('span');
    node.className = cls;
    return node;
}



var reflectCapslock = function() {
    window.addEventListener('keydown', function(e) {
        if (e.keyCode == 20) {
            // capslock held
            var indicator = document.getElementById('caps_indicator');
            indicator.className = 'caps_held';
        }
    });

    window.addEventListener('keyup', function(e) {
        if (e.keyCode == 20) {
            // capslock released
            var indicator = document.getElementById('caps_indicator');
            indicator.className = 'caps_released';
        }
    });
}


var suppressKeys = function() {
    var txt = document.getElementById('txt');
    // prevent keydown if it is the key T
    txt.addEventListener('keydown', function(e) {
        if (e.code == 'KeyT') {
            e.preventDefault();
        }
    }, true);

    // prevent keypress if it is the key R
    txt.addEventListener('keypress', function(e) {
        if (e.code == 'KeyR') {
            e.preventDefault();
        }
    }, true);
}

var setPasswordDisplay = function() {
    var password = document.getElementById('password');
    var password_result = document.getElementById('password_result');

    var update = function() {
        password_result.innerText = password.value;
    };

    update();

    password.addEventListener('input', update);
}


var controlEvents = {
    keypress : [
        'type',
        'code',
        'ctrlKey',
        'shiftKey',
        'key',
        'charCode',
        'which',
        'keyCode'
    ],

    keyup : [
        'type',
        'code',
        'ctrlKey',
        'shiftKey',
        'key',
        'charCode',
        'which',
        'keyCode'
    ],

    keydown : [
        'type',
        'code',
        'ctrlKey',
        'shiftKey',
        'key',
        'charCode',
        'which',
        'keyCode'
    ]
}


var basicEvents = [
    'change',
    'input',
    'focus',
    'blur'
];




var indicateLog = function() {
    var logInputContainer = createEl('box');
    document.getElementById('input_indicators').appendChild(logInputContainer);
    var header = createEl('boxheader_event');
    var headertext = document.createTextNode('input events');
    header.appendChild(headertext);
    logInputContainer.appendChild(header);

    
    var logInputHolder = createEl('logHolder1');
    logInputContainer.appendChild(logInputHolder);

    var logInputHolder2 = createEl('logHolder2');
    logInputHolder.appendChild(logInputHolder2);

    
    var logWindowContainer = createEl('box');
    document.getElementById('window_indicators').appendChild(logWindowContainer);

    header = createEl('boxheader_event');
    headertext = document.createTextNode('window events');
    header.appendChild(headertext);
    logWindowContainer.appendChild(header);

    var logWindowHolder = createEl('logHolder1');
    logWindowContainer.appendChild(logWindowHolder);

    var logWindowHolder2 = createEl('logHolder2');
    logWindowHolder.appendChild(logWindowHolder2);


    var addlog = function(el, name) {
        var holder = el == window ?
                logWindowHolder2 :
                logInputHolder2;

        el.addEventListener(name, function(e) {
            var line = createEl('logline');
            line.innerHTML = name;
            holder.appendChild(line);

            line.style.transition = 'color 0s';
            line.style.color = '#99BeE7';
            line.offsetHeight;
            line.style.transition = 'color 2s';
            line.style.color = '#496e87';

            holder.scrollTop = holder.scrollHeight;
        });
        
    }

    for (var name in controlEvents) if (controlEvents.hasOwnProperty(name)) {
        addlog(window, name);
        addlog(document.getElementById('txt'), name);
    }

    for (var i = 0; i < basicEvents.length; i++) {
        name = basicEvents[i];
        addlog(window, name);
        addlog(document.getElementById('txt'), name);
    }
}


var indicateControlEvents = function() {
    var reflect = function(el, name) {
        var reflector = createEl('box');
        var header = createEl('boxheader');
        var headertext = document.createTextNode(name + ': 0');
        header.appendChild(headertext);
        reflector.appendChild(header);

        var props = createEl('props');
        var propstext = createEl('propcontainer');
        props.appendChild(propstext);
        reflector.appendChild(props);


        var parent = document.getElementById(
            el == window ?
                  'window_indicators' :
                  'input_indicators'
        );
        parent.appendChild(reflector);

        var lastvals = {};

        var count = 0;
        el.addEventListener(name, function(e) {
            if (e.code != 'CapsLock') {
                count++;
                headertext.textContent = name + ': ' + count;

                while(propstext.firstChild) {
                    propstext.removeChild(propstext.firstChild);
                }

                var list = controlEvents[name];

                for (var i = 0; i < list.length; i++) {
                    var prop = list[i];
                    var oldval = typeof lastvals[prop] != 'undefined' ? lastvals[prop] : ' ';
                    var changed = lastvals[prop] != e[prop];
                    lastvals[prop] = e[prop];
                    var line = createEl('propline');
                    var propname = createSpan('propname');
                    var val = createSpan('propval');
                    propname.innerHTML = prop + ' ';
                    val.innerHTML = e[prop] + ' <span class=oldval>' + oldval + '</span>';
                    line.appendChild(propname);
                    line.appendChild(val);
                    propstext.appendChild(line);


                    if (changed) {
                        line.style.transition = 'color 0s';
                        line.style.color = '#99BeE7';
                        line.offsetHeight;
                        line.style.transition = 'color .3s';
                        line.style.color = '#496e87';
                    }
                }


                header.style.transition = 'background-color 0s';
                header.style.backgroundColor = '#223344';
                header.offsetHeight;
                header.style.transition = 'background-color .4s';
                header.style.backgroundColor = '#112233';
            }
        });
    }


    for (var name in controlEvents) if (controlEvents.hasOwnProperty(name)) {
        reflect(window, name);
    }

    for (name in controlEvents) if (controlEvents.hasOwnProperty(name)) {
        reflect(document.getElementById('txt'), name);
    }
}


var indicateBasicEvents = function() {
    // reflecting basic events
    var basicInputContainer = createEl('basicBox');
    document.getElementById('input_indicators').appendChild(basicInputContainer);
    var basicInputHolder = createEl('basicHolder');
    basicInputContainer.appendChild(basicInputHolder);

    
    var basicWindowContainer = createEl('basicBox');
    document.getElementById('window_indicators').appendChild(basicWindowContainer);
    var basicWindowHolder = createEl('basicHolder');
    basicWindowContainer.appendChild(basicWindowHolder);



    var reflectBasic = function(el, name) {
        var container = el == window ?
            basicWindowHolder :
            basicInputHolder;

        var reflector = createEl('basicReflector');

        var text = document.createTextNode(name + ': 0');
        reflector.appendChild(text);
        container.appendChild(reflector);

        var count = 0;
        el.addEventListener(name, function(e) {
            count++;
            text.textContent = name + ': ' + count;

            reflector.style.transition = 'background-color 0s';
            reflector.style.backgroundColor = '#223344';
            reflector.offsetHeight;
            reflector.style.transition = 'background-color .4s';
            reflector.style.backgroundColor = '#112233';
        });
        
    }

    for (var i = 0; i < basicEvents.length; i++) {
        var name = basicEvents[i];
        reflectBasic(window, name);
        reflectBasic(document.getElementById('txt'), name);
    }
}




window.addEventListener('load', function() {
    suppressKeys();
    reflectCapslock();
    setPasswordDisplay();
    indicateLog();
    indicateControlEvents();
    indicateBasicEvents();
});
