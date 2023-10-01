import inputmask from '../lib/Inputmask/dist/inputmask.es6.js';

(()=>{

    const inputName = document.getElementById('name');
    const inputPhone = document.getElementById('phone');
    const form = document.getElementById('contacts__form');

    let mask = new inputmask("+0 (999) 999 9999");
    mask.mask(inputPhone);

    function isAddClass (input){
        const check = input === inputName ? validateName(inputName) : validatePhone(inputPhone);

        if(!check){
            input.parentElement.classList.add('contacts-form__error');
        }else {
            input.parentElement.classList.remove('contacts-form__error');
        }
    }

    function validateName (input){
        let inputValue = input.value;
        let index = 0;
        for(const inputLetter of inputValue){
            if(inputLetter.toUpperCase(inputLetter) === inputLetter.toLowerCase(inputLetter)){
                return false;
            }
            ++index;
        }
        if(index < 2){
            return false;
        }
        if(index > 24){
            return false;
        }
        return true;
    }

    function validatePhone (input){
        let inputValue = input.inputmask.unmaskedvalue();
        let index = 0;
        for(const inputLetter of inputValue){
            if (inputLetter === " "){
                return false;
            }
            if(isNaN(inputLetter)){
                if(inputLetter === '+' && index === 0){
                    ++index;
                    continue;
                }
                return false;
            }
            ++index;
        }
        if(index < 10){
            return false;
        }
        if(index > 13){
           return false; 
        }
        return true;
    }

    function submitChecker(e){
        const firstInput = validateName(inputName);
        const secondInput = validatePhone(inputPhone);
        if(!firstInput) {
            e.preventDefault();
            isAddClass(inputName);
        }
        if(!secondInput) {
            e.preventDefault();
            isAddClass(inputPhone);
        }
        
    }

    window.addEventListener('DOMContentLoaded', ()=>{
        inputName.addEventListener('change', ()=>{
            isAddClass(inputName);
        });
    
        inputPhone.addEventListener('change', ()=>{
            isAddClass(inputPhone);
        });

        form.addEventListener('submit', (event)=>{
            submitChecker(event);
        })

    })
})();