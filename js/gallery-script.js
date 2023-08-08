(()=>{
    const container = document.getElementById('gallery');
    const sliderBtnNext = container.querySelector('.gallery-slider__next');
    const sliderText = container.querySelector('.gallery-slider__count');
    const sliderBtnPrev = container.querySelector('.gallery-slider__prev');
    let currentCount = 1;

    console.log('wita');
    function toSlide(where) {
        console.log(where);
    }

    sliderBtnNext.addEventListener('click', ()=>{
        toSlide(currentCount++);
    });
    sliderBtnPrev.addEventListener('click', ()=>{
        toSlide(currentCount--);
    });


})();