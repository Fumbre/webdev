(()=>{

    const list = document.querySelector('.events__list');
    const items = document.querySelectorAll('.events__item');
    const item = document.querySelector('.events__item');
    const btn = document.querySelector('.events__btn');
    const container = document.getElementById('events__roll');


    function getItemStyleProperty(){
        const itemStyle = getComputedStyle(item);
        const itemColumn = parseInt(itemStyle.getPropertyValue('--eventsItemColumnShow'));
        const itemRow = parseInt(itemStyle.getPropertyValue('--eventsItemRowShow'));
        return [itemColumn, itemRow];
    }
    
    function addItemInvisibility(){
        const itemStyleProperty = getItemStyleProperty();

        items.forEach((item, index)=>{
            if(index >= itemStyleProperty[0] * itemStyleProperty[1]) {
                item.classList.add('events-item--invisible');
            }else{
                item.classList.remove('events-item--invisible');
            }
        });


    }addItemInvisibility();

    function removeItemInvisibility(){
        items.forEach((item)=>{
            item.classList.remove('events-item--invisible');
        })
    }

    function btnMore(){
        item.removeEventListener('transitionend', addItemInvisibility);

        list.style.maxHeight = '100%';

        removeItemInvisibility();
        
        btn.parentElement.classList.add('events__btn--activated');    
    }

    function createDotElement(){
        for(let i = 0; i !== list.childElementCount; i++) {
            const li = document.createElement('li');
            li.classList.add('roll__dot');
            container.append(li);
            if(i === 0){
                li.classList.add('roll__dot--active');
            }
            li.addEventListener('click', (e)=>{
                for(const item of container.children){
                    item.classList.remove('roll__dot--active');
                }
                li.classList.add('roll__dot--active');
                toSwipe(i);
            });
        }
    } createDotElement();
   

    function toSwipe(count) {
        const maxWidth = window.innerWidth;
        if(count !== false){
            item.removeEventListener('transitionend', addItemInvisibility);
            items.forEach((item)=>{
                item.style.transform = `translateX(calc(-100% * ${count}))`;
                item.classList.remove('events-item--invisible');
            })
        } else {
            if(maxWidth > 602) {
                for(const item of list.children){
                    item.style.transform = `translateX(0)`;
                }
                for(const item of container.children){
                    item.classList.remove('roll__dot--active');
                }
                container.firstChild.classList.add('roll__dot--active');
                if(!btn.parentElement.classList.contains('events__btn--activated')){
                    item.addEventListener('transitionend', addItemInvisibility);
                }
            }
        }
        }

    btn.addEventListener('click', btnMore);
    window.addEventListener('resize', ()=>{
        toSwipe(false);
    });


})();