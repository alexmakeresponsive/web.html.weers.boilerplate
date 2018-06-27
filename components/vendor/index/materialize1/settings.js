document.addEventListener('DOMContentLoaded', function() {

    var carousel1 = document.querySelectorAll('.carousel1');

    if (carousel1) {
        var instances = M.Carousel.init( carousel1, {
            fullWidth: true,
            indicators: true
        });
    }

    var instanceCarousel1 = M.Carousel.getInstance(carousel1[0]);
    // console.log(instanceCarousel1);

    var btnPrev = document.querySelector('.carousel1-btnPrev');
    var btnNext = document.querySelector('.carousel1-btnNext');

    if ( btnPrev && btnNext ) {
        btnPrev.addEventListener( "click" , function() {
            instanceCarousel1.prev();
        });
        btnNext.addEventListener( "click" , function() {
            instanceCarousel1.next();
        });
    }


});
