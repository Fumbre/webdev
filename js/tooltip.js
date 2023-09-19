(()=>{

    const container = document.querySelector('.tool-tip');
    const btn = container.querySelectorAll('.tool-tip__btn');
    const texts = container.querySelectorAll('.tool-tip__text');


    function btnSwitch() {

        btn.forEach((current)=>{
            current.addEventListener('click', ()=>{
                current.classList.toggle('tool-tip__btn--active');
            })
           
        });
    }

    
    function transformToolTip() {
        const maxWidth = container.offsetWidth;
        const margin = container.offsetLeft;

        texts.forEach((text)=>{
            text.style.transform = `translate(-50%, -11px)`
            const textCords = text.getBoundingClientRect();
            const textPosition = textCords.width + textCords.left - margin;

            if(textPosition > maxWidth ){
                let translate = maxWidth - textPosition;
                text.style.transform = `translate(calc(-50% + ${translate}px), -11px)`;
            }else if(textCords.left < margin){
                let translate = -1 *(textCords.left - margin) ;
                text.style.transform = `translate(calc(-50% + ${translate}px), -11px)`;
            }else {
                text.style.transform = `translate(-50%, -11px)`;
            }
            
            
        });
    }


    document.addEventListener('DOMContentLoaded', ()=>{
        btnSwitch();
        
        onload = () => {
            transformToolTip();
        }

        window.addEventListener('resize', ()=>{
            transformToolTip();
        });
    
    });

})();