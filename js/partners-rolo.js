
(()=> {

    window.addEventListener("DOMContentLoaded", ()=>{

        const btn = document.querySelectorAll('.project-partners__btn');
        const item = document.querySelectorAll('.project-partners__item');

        let buttonCount = 0;

        btn.forEach((swipe)=> {
            swipe.addEventListener('click', ()=>{
                const listCount = document.querySelector('.project-partners__list').childElementCount;
                const styleItem = getComputedStyle(document.querySelector('.project-partners__item'));

                const itemShow = parseInt(styleItem.getPropertyValue('--project-partnersShow'));
                const itemMargin = parseInt(styleItem.getPropertyValue('--project-partnersMargin'));

                let availableClick = listCount % itemShow ? Math.floor(listCount / itemShow) : listCount / itemShow - 1;

                if(swipe.classList.contains('btn__next')) {
                    buttonCount >= availableClick ? buttonCount = 0 : buttonCount++ ;
                    item.forEach((itemTransform)=>{
                        itemTransform.style.transform = `translateX(calc(((-100% - ${itemMargin}px) * ${itemShow}) * ${buttonCount}))`;
                    });
                } else if(swipe.classList.contains('btn__prev')) {
                    buttonCount > 0 ? buttonCount-- : buttonCount = availableClick;
                    item.forEach((itemTransform)=>{
                        itemTransform.style.transform = `translateX(calc(((-100% - ${itemMargin}px) * ${itemShow}) * ${buttonCount}))`;
                    });
                }
            });
        });

    });

})();