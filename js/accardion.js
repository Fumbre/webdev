
(()=>{
    window.addEventListener('DOMContentLoaded', () =>{

        document.querySelectorAll('.catalog-person-select__item').forEach( (item)=> {
            const itemHeight = item.clientHeight;

            item.style.height = itemHeight+'px';
            item.addEventListener('click', ()=>{
                const container = item.lastElementChild;

                let containerHeight = container.clientHeight;

                item.classList.toggle('catalog-person-select__item--active');

                if(item.classList.contains('catalog-person-select__item--active')) {
                    item.style.height = itemHeight + containerHeight + 'px';
                }else {
                    item.style.height = itemHeight+'px';
                }

            });
        });


    });

})();
