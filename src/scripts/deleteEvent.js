//DeleteEvent
import { eventsArray} from './storage.js';
import {markValuable} from './editEvent.js';
import {indexOfElement} from './editEvent.js';
import {funcForMakeindexOfElementNull} from './editEvent.js';
import { clearFunc} from './genarateEventObject.js';
import {renderEventObject} from './genarateEventObject.js';
import {popupBlock} from './eventOnClick.js';
import {funcForMakeMarkValuableNull} from './editEvent.js';
import {renderRedLIne} from './redLine.js';
import {onClearValidateMessages} from './validate.js';
import {onMakeMarkValuavle4Null} from './validate.js';

export const funcForDeleteEvene = () => {
    if(markValuable !== 0){
        eventsArray.splice(indexOfElement,1);
        eventsArray.splice(indexOfElement-1,1);
    }else eventsArray.splice(indexOfElement,1);
    funcForMakeindexOfElementNull();
    clearFunc();
    renderEventObject(eventsArray);
    popupBlock.style.display = 'none';
    deleteBasket.style.display = 'none';
    funcForMakeMarkValuableNull();
    renderRedLIne(); 
    onClearValidateMessages();
    onMakeMarkValuavle4Null();
};
const deleteBasket = document.querySelector('.event__btn-delete');
deleteBasket.addEventListener('click', funcForDeleteEvene);
