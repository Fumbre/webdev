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
        const allOffersBtn = edition.querySelectorAll('.edition-offers__btn');

        function getItemProperty() {
            const margin = parseInt(listStyle.getPropertyValue('--editionOffersItemMargin'));
            const itemsShow = parseInt(listStyle.getPropertyValue('--editionOffersShow'));
            const countMax = itemsCount % itemsShow ? Math.floor(itemsCount / itemsShow + 1) : itemsCount / itemsShow;

            return [margin, itemsShow, countMax];
        }

        function toSlide() {
            const itemPropertys = getItemProperty();
           
            if (currentCount >= itemPropertys[2]){
                currentCount = itemPropertys[2];
            } else if (currentCount <= 1) {
                currentCount = 1;
            }

            items.forEach((item)=>{
                item.style.transform = `translateX(calc((-100% - ${itemPropertys[0]}px) * ${itemPropertys[1]} * ( ${currentCount} - 1) ))`;
            });

            counterText.textContent = `${currentCount} / ${itemPropertys[2]}`;
            toDisableButtons(currentCount, itemPropertys[2]);
            toTabIndexBtn(currentCount, itemPropertys[1]);
        }toSlide();

        function toDisableButtons(currentCount, countMax){
            btnPrev.disabled = currentCount === 1;
            btnNext.disabled = currentCount === countMax;
        }

        function toTabIndexBtn(currentCount, itemsShow){
            const checker = itemsShow === 0 ? true : false;
            let indexStart = currentCount * itemsShow - itemsShow;
            allOffersBtn.forEach((btn, index)=>{
                if(checker){
                    btn.tabIndex = 0;
                }else if(indexStart === index && itemsShow !== 0) {
                    btn.tabIndex = 0;
                    ++indexStart;
                    --itemsShow;
                }else btn.tabIndex = -1;
            })
        }

        btnNext.addEventListener('click', ()=> {
            ++currentCount;
            toSlide();
        });
        btnPrev.addEventListener('click', ()=> {
            --currentCount;
            toSlide();
        });
        
        list.addEventListener('transitionend', ()=>{
            toSlide();
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