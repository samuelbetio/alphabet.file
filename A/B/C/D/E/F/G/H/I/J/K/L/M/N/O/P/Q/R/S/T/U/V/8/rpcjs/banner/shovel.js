
// stores the 'exported' methods
var remote = {};

// creates an 'exported' method
var setMethod = function(name) {
    remote[name] = function() {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }

        // requesting the actual method invocation
        self.postMessage({name: name, args: args});
    };
}

// application only sends an initialization message
self.addEventListener('message', function(e){
    for (var i = 0; i < e.data.api.length; i++) {
        setMethod(e.data.api[i]);
    }

    importScripts(e.data.path);
});

