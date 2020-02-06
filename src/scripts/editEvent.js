//EditEvents
import { week} from './currentWeek.js';
import {blockOfDays} from './eventOnClick.js';
import {popupBlock} from './eventOnClick.js';
import { eventsArray} from './storage.js';
import {onCheckLateEffortOfDeleteOrEdite} from './validate.js';
import {funcForDeleteEvene} from './deleteEvent.js';

export const iconDelete = document.querySelector('.event__btn-delete');

export let currentObject = [];
export let indexOfElement = 0; 
export let markValuable = 0;
export let markValuable2 = 0;
export let dataId = '';

export const funcForMakeMarkValuableNull = () => {
    markValuable = 0;
    markValuable2 = 0;
};

export const funcForMakeindexOfElementNull = () => {
    indexOfElement = 0;
};

export const funcForMakeDataIdEmpty = () => {
    dataId = '';
};


export const funcForEditEvent = event => {
    const blockOfEvent = event.target;
    if(!blockOfEvent.classList.contains('main__sidebar_day_object')) return;

    popupBlock.style.display = 'block';
    iconDelete.style.display = 'block';

    dataId = blockOfEvent.dataset.id;
    eventsArray.forEach((element,index) => {
        if(element.ident === dataId) indexOfElement = index;
    })
    currentObject = eventsArray.filter(elem => elem.ident === dataId);

    const title = document.querySelector('.event__name');
    currentObject[0].header !== undefined
    ? title.value = currentObject[0].header
    : title.value = ''; 
   

    let dataAttr = blockOfEvent.closest('.main__sidebar_days_hours');
    if(dataAttr === 0){
        const startDate = document.querySelector('.event__date-start');
        let tempStartDate = currentObject[0].startTime.setDate(currentObject[0].startTime.getDate()+1);
        startDate.value = new Date(tempStartDate).toISOString().substr(0, 10);
    
        const endDate = document.querySelector('.event__date-end');
        currentObject.length === 1
        ? endDate.value = new Date(currentObject[0].endTime.setDate(currentObject[0].endTime.getDate()+1))
            .toISOString().substr(0, 10)
        : endDate.value = new Date(currentObject[1].endTime.setDate(currentObject[0].endTime.getDate()+1))
            .toISOString().substr(0, 10);
    }
    if(dataAttr === 1){
        const startDate = document.querySelector('.event__date-start');
        let tempStartDate = currentObject[0].startTime.setDate(currentObject[0].startTime.getDate()+1);
        startDate.value = new Date(tempStartDate).toISOString().substr(0, 10);
    
        const endDate = document.querySelector('.event__date-end');
        currentObject.length === 1
        ? endDate.value = new Date(currentObject[0].endTime).toISOString().substr(0, 10)
        : endDate.value = new Date(currentObject[1].endTime).toISOString().substr(0, 10);
    }

    const startTimePlace = document.querySelector('.startTime_place');
    let startHour = new Date(currentObject[0].startTime).getHours(); 
    startHour < 10 ? startHour = `0${startHour}` : startHour;
    let startMin = new Date(currentObject[0].startTime).getMinutes(); 
    startMin < 10 ? startMin = `0${startMin}` : startMin;
    startTimePlace.value = `${startHour}:${startMin}`;
    
    const endTimePlace = document.querySelector('.endTime_place');
    if(currentObject.length === 1){
        let endHour = new Date(currentObject[0].endTime).getHours(); 
        endHour < 10 ? endHour = `0${endHour}` : endHour;
        let endMin = new Date(currentObject[0].endTime).getMinutes(); 
        endMin < 10 ? endMin = `0${endMin}` : endMin;
        endTimePlace.value = `${endHour}:${endMin}`;
    }else {
        let endHour = new Date(currentObject[1].endTime).getHours(); 
        endHour < 10 ? endHour = `0${endHour}` : endHour;
        let endMin = new Date(currentObject[1].endTime).getMinutes(); 
        endMin < 10 ? endMin = `0${endMin}` : endMin;
        endTimePlace.value = `${endHour}:${endMin}`;
        markValuable = 1;
    }
    onCheckLateEffortOfDeleteOrEdite(currentObject[0]);
    markValuable2 = 1;
};
blockOfDays.addEventListener('click', funcForEditEvent);
