
//Popup 
import {form} from './validate.js';
import {markValuble4} from './validate.js';
import { eventsArray} from './storage.js';
import {markValuable2} from './editEvent.js';
import { clearFunc} from './genarateEventObject.js';
import {renderEventObject} from './genarateEventObject.js';
import {popupBlock} from './eventOnClick.js';
import {blockOfDays} from './eventOnClick.js';
import {renderEventOnClick} from './eventOnClick.js';
import {renderRedLIne} from './redLine.js';
import {funcForMakeDataIdEmpty} from './editEvent.js';
import {iconDelete} from './editEvent.js';
import {onClearValidateMessages} from './validate.js';
import {onMakeMarkValuavle4Null} from './validate.js';

export let markValuable3 = 0;


export const lockWindow = document.querySelector('.popup__btn-close');
export const funcForLockWindow = () => {
    popupBlock.style.display = 'none';
    iconDelete.style.display = 'none';
    blockOfDays.addEventListener('click', renderEventOnClick);
    onClearValidateMessages();
    funcForMakeDataIdEmpty();
    onMakeMarkValuavle4Null();
};
lockWindow.addEventListener('click', funcForLockWindow);



export const funcForSaveButton = event => {
    event.preventDefault();
    
    let tempObj = [...new FormData(form)]
        .reduce((acc, [field,value]) => ({...acc,[field]:value}),{});
    tempObj.startTime = tempObj.startTime.split('-');
    tempObj.startTime[1] = tempObj.startTime[1] - 1;
    tempObj.startTimePlace = tempObj.startTimePlace.split(':');
    tempObj.startTime = tempObj.startTime.concat(tempObj.startTimePlace);
    tempObj.startTime = new Date(...tempObj.startTime);

    tempObj.endTime = tempObj.endTime.split('-');
    tempObj.endTime[1] = tempObj.endTime[1] - 1;
    tempObj.endTimePlace = tempObj.endTimePlace.split(':');
    tempObj.endTime = tempObj.endTime.concat(tempObj.endTimePlace);
    tempObj.endTime = new Date(...tempObj.endTime);
    
    tempObj.ident = Math.random().toFixed(10);

    delete tempObj.startTimePlace;
    delete tempObj.endTimePlace;
    if(markValuble4 === 1) return;
    eventsArray.push(tempObj);
    markValuable3 = 1;
    if(markValuable2 === 1 && markValuable3 === 1){
        if(markValuable !== 0){
           eventsArray.splice(indexOfElement,1);
           eventsArray.splice(indexOfElement-1,1);
           markValuable3 = 0;
        }else{
            eventsArray.splice(indexOfElement,1);
            markValuable3 = 0;
        } 
    funcForMakeindexOfElementNull();
    funcForMakeMarkValuableNull();
   }

    clearFunc();
    renderEventObject(eventsArray);
    popupBlock.style.display = 'none';
    blockOfDays.addEventListener('click', renderEventOnClick);
    renderRedLIne();
    funcForMakeDataIdEmpty();
};
form.addEventListener('submit', funcForSaveButton);