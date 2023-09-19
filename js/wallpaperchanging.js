(()=>{
    const bgi = document.querySelector('.bgi');
    let globalIndex = 0;

    function toChangeBgi(){
        globalIndex >= bgi.childElementCount - 1 ? globalIndex = 0 : ++globalIndex;
        let index = 0;
        for(const image of bgi.children){
            image.classList.remove('bgi--active');    
            if(index === globalIndex) {
                image.classList.add('bgi--active');
            }
            ++index;
        }
    }

    setInterval(toChangeBgi, 25000);

})();