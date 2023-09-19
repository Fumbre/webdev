(()=>{

    const btn = document.querySelector('.header-nav__btn');
    const searchBtn = document.querySelector('.header-search__btn');
    const list = document.querySelector('.header-nav__list');
    const login = document.querySelector('.login__link');


    function toggleFunctionBtn() {
        list.classList.toggle('header-nav__list--active');
        btn.classList.toggle('header-nav__btn--active');
        login.classList.toggle('login__link--visible');
    }

    function toggleFunctionSearch() {
        searchBtn.classList.toggle('header-search__btn--active');
    }

    btn.addEventListener('click', toggleFunctionBtn);
    searchBtn.addEventListener('click', toggleFunctionSearch);

})();