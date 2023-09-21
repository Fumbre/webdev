
(()=> {
    
    const container = document.getElementById('project');
    const btn = container.querySelectorAll('.project-partners__btn');

    let buttonCount = 0;

    function swipe(btn) {
        const list = container.querySelector('.project-partners__list');
        const links = container.querySelectorAll('.project-partners__link');

        function getProperty() {
            const listChildCount = list.childElementCount;
            const styleItem = getComputedStyle(list.querySelector('.project-partners__item'));
            const itemShow = parseInt(styleItem.getPropertyValue('--project-partnersShow'));
            const itemMargin = parseInt(styleItem.getPropertyValue('--project-partnersMargin'));
            return [listChildCount, itemShow, itemMargin];
        }

        function availableClick() {
            const itemProperty = getProperty();
            const availableClick = itemProperty[0] % itemProperty[1] ? Math.floor(itemProperty[0] / itemProperty[1]) : itemProperty[0] / itemProperty[1] - 1;
            return availableClick;
        }

        function itemTransform(item) {
            const itemProperty = getProperty();
            item.style.transform = `translateX(calc(((-100% - ${itemProperty[2]}px) * ${itemProperty[1]}) * ${buttonCount}))`;
            toTabIndexitem(buttonCount, itemProperty[1]);
        }

        function toTabIndexitem(buttonCount, itemShow) {
            let indexStart = buttonCount * itemShow ;
            links.forEach((item, index)=>{
                if(index === indexStart && itemShow !== 0){
                    item.tabIndex = 0;
                    ++indexStart;
                    --itemShow;
                }else item.tabIndex = -1;
            });
        }
        
        if(btn === true) {
            for(const item of list.children) {
                if (buttonCount > availableClick()){
                    buttonCount = availableClick();
                }
                itemTransform(item);
            }
        }else if(btn.classList.contains('btn-next')) {
            buttonCount >= availableClick() ? buttonCount = 0 : buttonCount++ ;
            for(const item of list.children) {
                itemTransform(item);
            }
        }else if(btn.classList.contains('btn-prev')) {
            buttonCount > 0 ? buttonCount-- : buttonCount = availableClick();
            for(const item of list.children) {
                itemTransform(item);
            }
        }
        
    } swipe(true);

    window.addEventListener("DOMContentLoaded", ()=>{
        btn.forEach((b)=>{
            b.addEventListener('click', ()=>{
                swipe(b)
            });
        });
        
        window.addEventListener('resize', ()=>{
            swipe(true);
        })
    });

})();