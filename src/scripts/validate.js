//Validate

import {funcForDeleteEvene} from './deleteEvent.js';
export const deleteBasket = document.querySelector('.event__btn-delete');
export let validateMessageElem = document.querySelector('.message_validation');

export let markValuble4 = 0;

export const onMakeMarkValuavle4Null = () => {
    markValuble4 = 0;
};

export const onClearValidateMessages = () => validateMessageElem.innerHTML = '';


export const onCheckIntersectionEvents = (object) => {
    let errorText = undefined;
    let currentStartTime = object.startTime.getTime();
    let currentEndTime = object.endTime.getTime();
    for(let i = 0; i < eventsArray.length; i++) {
        if(eventsArray[i].ident === object.ident) continue;
        let elemStartTime = eventsArray[i].startTime.getTime();
        let elemEndTime = eventsArray[i].endTime.getTime();
        if((currentStartTime < elemEndTime 
            && currentStartTime < elemEndTime) 
        && 
            (currentEndTime > elemStartTime
            && currentEndTime > elemStartTime)
        ){
            errorText = 'Error! Event can`t intersect';
        }
    };
    return errorText; 
};


export const onCheckCorrectDates = (object) =>
    object.endTime < object.startTime
        ? 'Error! End date can`t be ealier than start date'
        : undefined;


export const onCheckEventLength = (object) =>
    21600000 <= object.endTime - object.startTime
    ? 'Error! Event can`t be more than 6 hours'
    : undefined;


export const onCheckMinutes = (object) => 
    (object.startTime.getMinutes() !== 0 && object.startTime.getMinutes() % 15 !== 0) 
    ||
    (object.endTime.getMinutes() !== 0 && object.endTime.getMinutes() % 15 !== 0)
        ? 'Error! Minuts must be a multiple of fifteen'
        : undefined;

        
export const onMakeObjectFromValuesInForm = () => {
    const tempObj = [...new FormData(form)]
        .reduce((acc,[field,value]) => ({...acc, [field]:value}),{});
    
    const startDate_hours = tempObj.startTimePlace.split(':')[0];
    const startDate_min = tempObj.startTimePlace.split(':')[1];
    tempObj.startTime = [...tempObj.startTime.split('-')];
    tempObj.startTime[1] = tempObj.startTime[1] - 1;
    tempObj.startTime.push(startDate_hours, startDate_min);
    tempObj.startTime = new Date(...tempObj.startTime);
    
    const endDate_hours = tempObj.endTimePlace.split(':')[0];
    const endDate_min = tempObj.endTimePlace.split(':')[1];
    tempObj.endTime = [...tempObj.endTime.split('-')];
    tempObj.endTime[1] = tempObj.endTime[1] - 1;
    tempObj.endTime.push(endDate_hours, endDate_min);
    tempObj.endTime = new Date(...tempObj.endTime);
    
    if(dataId !== ''){
        tempObj.ident = dataId;
    }else tempObj.ident = Math.random().toFixed(10);

    return tempObj;
};


export const form = document.querySelector('.popup');
export const arrOfValidateFuncs = [onCheckMinutes, onCheckEventLength, 
    onCheckCorrectDates, onCheckIntersectionEvents];
export const onInputValidate = event => {
    if(!event.target.classList.contains('input')) return;
    const tempObj = onMakeObjectFromValuesInForm();
    const errorText = arrOfValidateFuncs
        .map(func => func(tempObj))
        .filter(erroText => erroText)
        .join(' ');
    validateMessageElem.textContent = errorText;
    if(validateMessageElem.textContent !== ''){
        markValuble4 = 1;
    }else{
        markValuble4 = 0;
    } 
};
form.addEventListener('input', onInputValidate);




export const onCheckLateEffortOfDeleteOrEdite = (object) => {
    const timeToEvent = (object.startTime.valueOf() - Date.now())/1000/60;
    if(timeToEvent <= 15 && timeToEvent > 0){
        validateMessageElem.innerHTML = 'You can`t change or delete event after 15 minutes to event';
        markValuble4 = 1;
        deleteBasket.removeEventListener('click', funcForDeleteEvene);
    }else{
        validateMessageElem.innerHTML = '';
        markValuble4 = 0;
        deleteBasket.addEventListener('click', funcForDeleteEvene);
    };
};