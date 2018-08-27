
var start = function() {
    console.log('hello');

    var offset = 0;
    var pattern2 = document.getElementById('pattern2');
    var myrect = document.getElementById('myrect');
    var myimage = document.getElementById('myimage');
    var maskrect = document.getElementById('maskrect');

    var heicoun = 0;
    var hei, yei;

    setInterval(
        function() {
            offset = (offset+2)%100;
            pattern2.setAttribute('x',offset);

            heicoun+=.1;
            hei = Math.round(Math.sin(heicoun)*30)+110;
            yei = Math.round(hei / 2);

            myrect.setAttribute('height',''+hei+'px');
            pattern2.setAttribute('height',''+hei+'px');
            myimage.setAttribute('height',''+hei+'px');

            myrect.setAttribute('y',''+yei+'px');
            pattern2.setAttribute('y',''+yei+'px');

            maskrect.setAttribute('width',''+Math.round(hei*5)+'px');
        },
        50
    );
}

if (document.readyState == "complete") {
    // page has already been loaded
    start();
} else {
    // preserving any existing listener
    var origOnload = window.onload || function(){};

    window.onload = function(){
        origOnload();
        start();
    }
}
