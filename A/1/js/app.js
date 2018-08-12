$(document).ready(function() {
    let output = $(".output");

    let runIt = $('#testRun button');

    let newClass = "";

    $.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
            return this;
        }
    });
    runIt.on('click', function(e) {
        e.preventDefault();
        let name = $(this).text()

        let newClass = name;
        // console.log(name);
        output.animateCss(newClass);
    })

});
// function animate() {
//     output.addClass(input);
//     setTimeout(function() {
//         output.removeClass(input)
//     }, 1000);
// };
// run.on('submit', function(e) {
//     e.preventDefault();
//     input = data.val();
//     // console.log(input);
//     animate();
// })