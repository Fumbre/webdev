(()=>{
    const items = document.querySelectorAll('.catalog-person-select__item');

    function toggleSelect(item) {
        item.classList.toggle('catalog-person-select__item--active');
        setHeights(item);
    }

    function setHeights(item) {
        const text = document.querySelector('.catalog-person-select__text');
        const textHeight = text.offsetHeight;
        const container = item.lastElementChild;
        const containerHeight = container.clientHeight;

        if(item.classList.contains('catalog-person-select__item--active')) {
            item.style.height = textHeight + containerHeight + 'px';
        }else {
            item.style.height = textHeight + 'px';
        }
    }

    window.addEventListener('DOMContentLoaded', ()=> {
        items.forEach( (item)=> {
            item.style.height = item.clientHeight + 'px';

            item.addEventListener('click', ()=>{
                toggleSelect(item);
            });

            window.addEventListener('resize', () => {
                setHeights(item);
            });
        });

    });

})();
