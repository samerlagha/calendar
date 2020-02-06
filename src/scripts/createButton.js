//Create_button
import {popupBlock} from './eventOnClick.js';
import {saveBtn} from './eventOnClick.js';
import {blockOfDays} from './eventOnClick.js';
import {renderEventOnClick} from './eventOnClick.js';
const createButton = document.querySelector('.header__btn-create');


export const funcForCreateButton = () => {
    const startHour = new Date().getHours();
    const endHour = startHour + 1;
   
    document.querySelector('.startTime_place')
        .value = [startHour, '00'].join(':');
    
    document.querySelector('.endTime_place')
        .value = [endHour, '00'].join(':');

    popupBlock.style.display = 'block';
    saveBtn.style.display = 'block';

    const myDate = document.querySelectorAll('.specialDate');
    const today = new Date();
    [...myDate].forEach(elem => elem.value = today.toISOString().substr(0, 10));


    const headerInput = document.querySelector('.event__name');
    headerInput.value = '';

    const descriptionInput = document.querySelector('.multiline__text');
    descriptionInput.value = '';

    blockOfDays.removeEventListener('click', renderEventOnClick);
};
createButton.addEventListener('click', funcForCreateButton);
