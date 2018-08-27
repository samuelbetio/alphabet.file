
// potentially insecure 3rd-party code which may only perform what is
// explicitly permitted by the application

var bad = false;

// updates banner image and link
var update = function() {
    var image = bad ? 'bad.png' : 'good.png';
    var link = bad ? 'http://facebook.com/' : 'http://google.com';

    remote.setImage(image);
    remote.setLink(link);

    bad = !bad;
}

update();
setInterval(update, 2000);

