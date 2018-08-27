
// determining absolute path
var scripts = document.getElementsByTagName('script');
var abs = scripts[scripts.length-1].src
        .split('/').slice(0, -1).join('/')+'/';


// loads the plugin and provides it with the api
var loadPlugin = function(path, api) {
    // creating a Worker as a Blob enables import of local files
    var code = 'importScripts("'+abs+'shovel.js");';
    var worker = new Worker(
        window.URL.createObjectURL(new Blob([code]))
    );

    var names = [];
    for (var i in api) {
        if (api.hasOwnProperty(i)) {
            names.push(i);
        }
    }

    worker.postMessage({path: path, api: names});

    // messages treated as a remote method request
    worker.addEventListener('message', function(e) {
        api[e.data.name].apply(null, e.data.args);
    });
}



// set of exported functions
var api = {
    setImage: function(src) {
        document.getElementById('image').style.backgroundImage
            = 'url('+src+')';
    },
    setLink: function(src) {
        document.getElementById('link').href = src;
    }
}



loadPlugin(abs+'plugin.js', api);

