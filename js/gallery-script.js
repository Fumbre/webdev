(()=>{
    const container = document.getElementById('gallery');

    function slider() {
        let sliderCount = 1;

        const sliderBtnNext = container.querySelector('.gallery-slider__next');
        const sliderText = container.querySelector('.gallery-slider__count');
        const sliderBtnPrev = container.querySelector('.gallery-slider__prev');

        const list = container.querySelector('.gallery-pictures__list--active');
        const itemCount = list.childElementCount;

        function getItemProperty() {
            const listStyle = getComputedStyle(list);
            const itemRow = parseInt(listStyle.getPropertyValue('--galleryRowCount'));
            const itemColumn = parseInt(listStyle.getPropertyValue('--galleryColumnCount'));
            const itemMargin = parseInt(listStyle.getPropertyValue('--galleryItemMargin'));
            let sliderMaxCount = itemCount / itemRow % itemColumn ? Math.floor(( itemCount / itemRow / itemColumn) + 1) : itemCount / itemRow / itemColumn ;

            return [sliderMaxCount, itemMargin, itemColumn, itemRow];
        }
        function toSlide(){
            const sliderProperty = getItemProperty();

            if(sliderCount > sliderProperty[0]) {
                sliderCount = sliderProperty[0];
            }

            if(sliderCount <= 1){
                sliderCount = 1;
            }

            sliderText.textContent = `${sliderCount} / ${sliderProperty[0]}`;

            for(const item of list.children) {
                item.style.transform = `translateX(calc( ( -100% - ${sliderProperty[1]}px ) * ( (${sliderCount} - 1 ) * ${sliderProperty[2]} ) ))`;
            }

            toTabIndex(sliderCount, sliderProperty[2], sliderProperty[3]);
            toDisable(sliderCount, sliderProperty[0]);

        }toSlide();

        function toTabIndex(sliderPosition, itemColumn, itemRow){
            let itemToTabIndex = itemColumn * itemRow;
            let itemFromIndex = sliderPosition * itemColumn * itemRow - itemColumn * itemRow;
            let index = 0;
            for(const item of list.children) {
                if(itemFromIndex === index && itemToTabIndex !== 0) {
                    item.tabIndex = 0;
                    --itemToTabIndex;
                    ++itemFromIndex;
                }else {
                    item.tabIndex = -1;
                }
                ++index;
            }
        }

        function toDisable(sliderCount, sliderMax){
            sliderBtnNext.disabled = sliderCount === sliderMax;
            sliderBtnPrev.disabled = sliderCount === 1;
        }

        function toIncrease() {
            ++sliderCount;
            toSlide();
        }
        function toDecrease() {
            --sliderCount;
            toSlide();
        }

        sliderBtnNext.addEventListener('click', toIncrease);
        sliderBtnPrev.addEventListener('click', toDecrease);
        window.addEventListener('resize', toSlide);

    }

    function filter(){
        const list = container.querySelector('.gallery-filter__select');
        function showItem(){
            for(const item of list.children) {
                item.classList.toggle('gallery-filter__option--show');
            }
        }

        function selectItem(event) {
            const selectedItem = event.currentTarget;
            const path = selectedItem.getAttribute('data-path');
            const targetList = container.querySelectorAll('.gallery__list');

            if(!selectedItem.classList.contains('gallery-filter__option--selected')) {
                targetList.forEach((item)=>{
                    const target = item.getAttribute('data-target');
                    if (path === target) {
                        removeClassSelected();
                        selectedItem.classList.add('gallery-filter__option--selected');
                        item.classList.add('gallery-pictures__list--active');
                        slider();
                    } else item.classList.remove('gallery-pictures__list--active');
                });
            }
            function removeClassSelected() {
                for(const item of list.children) {
                    item.classList.remove('gallery-filter__option--selected');
                }
            }
        }

        list.addEventListener('click', showItem);
        for(const item of list.children){
            item.addEventListener('click', selectItem);
        }
    }

    function modalWindow() {
        const lists = container.querySelectorAll('.gallery__list');
        const list = container.querySelector('.gallery__list-content');
        const buttons = container.querySelectorAll('.gallery-item-content__btn');

        function toShow(target) {
            for(const item of list.children){
                const path = item.getAttribute('data-target');
                if (path === target) {
                    addClasses(item);
                    break;
                }
            }
        }

        function addClasses(item){
            for(const item of list.children){
                item.classList.remove('gallery__item-content--active');
                item.classList.add('gallery__item-content--hidden');
            }
            item.classList.remove('gallery__item-content--hidden');
            item.classList.add('gallery__item-content--active');
            list.classList.add('gallery__list-content--active');
        }

        function toHide() {
            for(const item of list.children){
                item.classList.remove('gallery__item-content--active');
                item.classList.remove('gallery__item-content--hidden');
            }
            list.classList.remove('gallery__list-content--active');
        }

        lists.forEach((list)=>{
            for(const item of list.children) {
                item.addEventListener('click', (event)=>{
                    toShow(event.currentTarget.classList[1]);
                });
            }          
        });

        buttons.forEach((btn)=>{
            btn.addEventListener('click', toHide);
        });

        for(const item of list.children) {
            item.addEventListener('click', (event)=>{
                if(event.target === event.currentTarget){
                    toHide();
                }
            });
        }
        
    }

    window.addEventListener('DOMContentLoaded', ()=>{
        slider();
        filter();
        modalWindow();
    });


})();