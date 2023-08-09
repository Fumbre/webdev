(()=>{

    const list = document.querySelector('.events__list');
    const items = document.querySelectorAll('.events__item');
    const item = document.querySelector('.events__item');
    const btn = document.querySelector('.events__btn');
    
    function itemVisibility(){
        const itemStyle = getComputedStyle(item);
        const itemColumn = parseInt(itemStyle.getPropertyValue('--eventsItemColumnShow'));
        const itemRow = parseInt(itemStyle.getPropertyValue('--eventsItemRowShow'));

        items.forEach((item, index)=>{
            if(index >= itemColumn * itemRow) {
                item.classList.add('events-item--invisible');
            }else{
                item.classList.remove('events-item--invisible');
            }
        });


    }itemVisibility();

    function btnMore(){

        item.removeEventListener('transitionend', itemVisibility);

        list.style.maxHeight = '100%';

        items.forEach((item)=>{
            item.classList.remove('events-item--invisible');
        })
        btn.style.display = 'none';
    }


    item.addEventListener('transitionend', itemVisibility);
    btn.addEventListener('click', btnMore);


})();