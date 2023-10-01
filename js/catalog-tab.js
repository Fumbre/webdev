(()=>{

    const container = document.getElementById('catalog');
    const links = container.querySelectorAll('.catalog-person-container__link');
    const artists = container.querySelectorAll('.catalog-person-information__artist')

    function toAddClasslist(artist, link){
        artist.classList.add('catalog-person-information__artist--active');
        link.classList.add('catalog-person-container__link--active');
    }

    function toRemoveClasslistArtist(artist){
        artist.classList.remove('catalog-person-information__artist--active');
    }

    function toRemoveClasslistLink(){
        links.forEach((l)=>{
            l.classList.remove('catalog-person-container__link--active');
        })
    }

    function changeArtist(link){
        const target = () => link.getAttribute("data-target");
        artists.forEach((artist)=>{
            if(artist.getAttribute("data-path") !== target()){
                toRemoveClasslistArtist(artist);
            }else {
                toRemoveClasslistLink()
                toAddClasslist(artist, link);
            }
        })
    }
    

    links.forEach((link)=>{
        link.addEventListener('click', ()=>{
            changeArtist(link);
        });
    })

})();