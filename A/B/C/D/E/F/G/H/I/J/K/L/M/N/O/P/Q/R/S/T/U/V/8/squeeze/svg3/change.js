
var start = function() {

    var offset = 0;
    var mypattern = document.getElementById('mypattern');
    var myrect = document.getElementById('myrect');
    var myuse = document.getElementById('myuse');

    var mypattern2 = document.getElementById('mypattern2');
    var myrect2 = document.getElementById('myrect2');
    var myuse2 = document.getElementById('myuse2');


    var myimage = document.getElementById('myimage');

    var heicoun = 0;
    var hei, yei, hei2;

    setInterval(
        function() {
            myimage.setAttribute('height','140px');

            offset = (offset+2)%100;

            heicoun+=.1;
            hei = Math.round(Math.sin(heicoun)*30)+110;
            yei = Math.round(hei / 2);

            mypattern.setAttribute('x',-offset);
            mypattern2.setAttribute('x',offset);

            myrect.setAttribute('height',''+hei+'px');
            mypattern.setAttribute('height',''+hei+'px');
            myuse.setAttribute('transform', 'scale(1, '+(hei/140)+')');

            hei2 = Math.round(Math.cos(heicoun)*30)+110;

            myrect2.setAttribute('height',''+hei2+'px');
            mypattern2.setAttribute('height',''+hei2+'px');
            myuse2.setAttribute('transform', 'scale(1, '+(hei2/140)+')');

            myrect.setAttribute('y',''+yei+'px');
            mypattern.setAttribute('y',''+yei+'px');

            myrect2.setAttribute('y',''+yei+'px');
            mypattern2.setAttribute('y',''+yei+'px');
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
