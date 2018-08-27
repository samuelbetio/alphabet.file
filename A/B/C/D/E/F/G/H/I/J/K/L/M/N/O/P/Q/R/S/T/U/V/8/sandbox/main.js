// determining absolute path of iframe.html
var scripts = document.getElementsByTagName('script');
var url = scripts[scripts.length-1].src
    .split('/')
    .slice(0, -1)
    .join('/')+'/iframe.html';

window.addEventListener("load", function() {
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.sandbox = 'allow-scripts';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    window.addEventListener('message', function(e) {
        if (e.origin=='null' && e.source == iframe.contentWindow) {
            document.write(e.data.text);
        }
    });
}, 0);
