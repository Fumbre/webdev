
(()=>{
    const gallery = document.getElementById('gallery');
    const select = gallery.querySelector('.gallery-filter__select');
    const options = gallery.querySelectorAll('.gallery-filter__option');
    const lists = gallery.querySelectorAll('.gallery__list');
    const sliderCount = gallery.querySelector('.gallery-slider__count');
    const btnNext = gallery.querySelector('.gallery-slider__next');
    const btnPrev = gallery.querySelector('.gallery-slider__prev');
    let currentCount = 1;

    function slider() {
        const list = gallery.querySelector('.gallery-pictures__list--active');
        const count = list.childElementCount;
        const styleList = getComputedStyle(list);
        const rowCount = parseInt(styleList.getPropertyValue('--galleryRowCount'));
        const columnCount = parseInt(styleList.getPropertyValue('--galleryColumnCount'));
        const itemMargin = parseInt(styleList.getPropertyValue('--galleryItemMargin'));
        let maxCount = count / rowCount % columnCount ? Math.floor((count / rowCount / columnCount) + 1) : count / rowCount / columnCount ;

        sliderCount.textContent = `${currentCount} / ${maxCount}`;

        for(let item of list.children) {
            item.style.transform = `translateX(calc( ( -100% - ${itemMargin}px ) * ( (${currentCount} - 1 ) * ${columnCount} ) ))`;
        }

        return maxCount;
    }

    slider();

    function sliderNext() {
        const maxCount = slider() ;
        if(currentCount < maxCount ){
            currentCount++
            sliderCount.textContent = `${currentCount} / ${maxCount}`;
            slider()
        }

    }
    function sliderPrev() {
        const maxCount = slider() ;
        if(currentCount !== 1 ){
            currentCount--
            sliderCount.textContent = `${currentCount} / ${maxCount}`;
            slider()
        }

    }


    const toggleOptions = () => {
        options.forEach((option)=>{
           option.classList.toggle('gallery-filter__option--show')
        });
    };

    const filterOption = (event) => {
        const selectedOption = event.currentTarget;
        const path = selectedOption.getAttribute('data-path');

        if(!selectedOption.classList.contains('gallery-filter__option--selected')) {
            currentCount = 1;
        }

        options.forEach((option)=>{
           option.classList.remove('gallery-filter__option--selected');
        });

        selectedOption.classList.add('gallery-filter__option--selected')

        lists.forEach((list)=>{
           const target = list.getAttribute('data-target');
           if(path === target) {

               list.classList.add('gallery-pictures__list--active');
               slider();

           } else {
               list.classList.remove('gallery-pictures__list--active');
           }
        });

    }

    select.addEventListener('click', toggleOptions);
    options.forEach((option)=>{
        option.addEventListener('click', filterOption);
    });
    btnNext.addEventListener('click', sliderNext);
    btnPrev.addEventListener('click', sliderPrev);
    lists.forEach((list)=>{
        list.addEventListener('transitionend', ()=>{
            slider();
        })
    });

})();