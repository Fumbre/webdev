(()=>{

    const edition = document.getElementById('edition');
    let currentCount = 1;

    function slider() {
        const btnPrev = edition.querySelector('.edition-slider__prev');
        const btnNext = edition.querySelector('.edition-slider__next');
        const counterText = edition.querySelector('.edition-slider__count');
        const list = edition.querySelector('.edition-offers__list');
        const items = edition.querySelectorAll('.edition-offers__item');
        const listStyle = getComputedStyle(list);
        const itemsCount = list.childElementCount;

        function toSlide(currentCount) {
            const margin = parseInt(listStyle.getPropertyValue('--editionOffersItemMargin'));
            const itemsShow = parseInt(listStyle.getPropertyValue('--editionOffersShow'));
            const countMax = itemsCount % itemsShow ? Math.floor(itemsCount / itemsShow + 1) : itemsCount / itemsShow;
           
            if (currentCount > countMax){
                currentCount = countMax;
            } else if (currentCount < 1) {
                currentCount = 1;
            }

            items.forEach((item)=>{
                item.style.transform = `translateX(calc((-100% - ${margin}px) * ${itemsShow} * ( ${currentCount} - 1) ))`;
            });

            counterText.textContent = `${currentCount} / ${countMax}`;
            return [countMax];
        }toSlide(currentCount);


        btnNext.addEventListener('click', ()=> {
            if (toSlide(currentCount) > currentCount) {
                toSlide(++currentCount);
            }
        });
        btnPrev.addEventListener('click', ()=> {
            if (currentCount > toSlide(currentCount)) {
                currentCount = toSlide(currentCount);
                toSlide(--currentCount);
            } else if (1 < currentCount) {
                toSlide(--currentCount);
            }
        });
        
        list.addEventListener('transitionend', ()=>{
            toSlide(currentCount);
        });
    }

    slider();

    function accordion() {
        const btn = edition.querySelector('.edition-form__list-title'); 
        const list = edition.querySelector('.edition-form__list');
        const items = list.querySelectorAll('.edition-form__item'); 

        items.forEach((item)=>{
            const input = item.querySelector('.edition-form-item__input');
           
            input.addEventListener('click', ()=>{
                item.classList.toggle('edition-form__item--checked');
            });
        });

        btn.addEventListener('click', ()=>{
            btn.classList.toggle('edition-form__list-title--active');
            list.classList.toggle('edition-form__list--active');
        });
    }

    accordion()

})();