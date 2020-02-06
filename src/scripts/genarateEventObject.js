//GenarateEventObject
import { week} from './currentWeek.js';
import { eventsArray} from './storage.js';
export let firstPoint, lastPoint;
export const fileOfHoures = document.querySelectorAll('.main__sidebar_days_line');

export const clearFunc = () => {
    const arrOfHours = document.querySelectorAll('.main__sidebar_days_hours');
    [...arrOfHours].forEach(elem => elem.innerHTML = '');
};



export const transformObjectFunc = (element) => {
    const endYearForObj1 = new Date(element.startTime).getFullYear();
    const endMonthForObj1 = new Date(element.startTime).getMonth();
    const endDateForObj1 = new Date(element.startTime).getDate();
    let endTimeForObj1 = new Date(endYearForObj1,endMonthForObj1,endDateForObj1,24);
    
    const startYearForObj2 = new Date(element.endTime).getFullYear();
    const startMonthForObj2 = new Date(element.endTime).getMonth();
    const endDateForObj2 = new Date(element.endTime).getDate();
    const startTimeForObj2 = new Date(startYearForObj2,startMonthForObj2,endDateForObj2);
    const indentificator = Math.random().toFixed(10);

    const obj1 = {
        header: element.header,
        startTime:element.startTime,
        endTime: endTimeForObj1,
        description:element.description,
        ident: indentificator,
    };
    const obj2 = {
        header: element.header,
        startTime:startTimeForObj2,
        endTime: element.endTime,
        description:element.description,
        ident: indentificator,
    };
    eventsArray.push(obj1, obj2);  
};


export const forHeight = (object, elem) => {
    if(object.startTime.getMinutes() === 15)elem.style.top = '25%';
    if(object.startTime.getMinutes() === 30)elem.style.top = '50%';
    if(object.startTime.getMinutes() === 45)elem.style.top = '75%';

    let timesOfRange = (object.endTime - object.startTime)/1000/60/15;
    elem.style.height = (timesOfRange*24.5) + '%';
    if(timesOfRange < 4) elem.style.padding = 0;
}

export const transformHourFormat = (hour) => {
    if(hour === 13) hour = 1;
    if(hour === 14) hour = 2;
    if(hour === 15) hour = 3;
    if(hour === 16) hour = 4;
    if(hour === 17) hour = 5;
    if(hour === 18) hour = 6;
    if(hour === 19) hour = 7;
    if(hour === 20) hour = 8;
    if(hour === 21) hour = 9;
    if(hour === 22) hour = 10;
    if(hour === 23) hour = 11;
    if(hour === 24) hour = 0;
    return hour;
};

export const fillDayPlace = (dayObject) => {
    const startTime = new Date(dayObject.startTime);
    const endTime = new Date(dayObject.endTime);

    let certainHour = startTime.getHours();
  
    let startTimeHour = startTime.getHours();
    startTimeHour = transformHourFormat(startTimeHour);
    let startTimeMinutes = startTime.getMinutes();
  
    let endTimeHour = endTime.getHours();
    endTimeHour = transformHourFormat(endTimeHour);
    let endTimeMinutes = endTime.getMinutes();
    
    if(startTimeMinutes !== 0) {
        startTimeHour += `:${startTimeMinutes}`; 
    }
    if(endTimeMinutes !== 0) {
        endTimeHour += `:${endTimeMinutes}`; 
    }
    
    let certainDay = [...fileOfHoures]
        .find((elem,index) => index === new Date(dayObject.startTime).getDay());
    let certainPlace = [...certainDay.children]
        .find((elem,index) => index === certainHour);
    let tempNum = 12;
    let tempVal;
    [...fileOfHoures].forEach(() => {
        if(startTime.getHours() <= tempNum && endTime.getHours() <= tempNum){
            tempVal = `${startTimeHour} - ${endTimeHour} AM`;
        }
        if(startTime.getHours() <= tempNum && endTime.getHours() > tempNum){
            tempVal = `${startTimeHour} AM - ${endTimeHour} PM`;
        }
        if(startTime.getHours() > tempNum){
            tempVal = `${startTimeHour} - ${endTimeHour} PM`;
        }
    });
   
    const divElem = document.createElement('div');
    const h7Elem = document.createElement('h7');
    dayObject.header ? h7Elem.innerHTML = dayObject.header : h7Elem.innerHTML = "without of header";
    const pElem = document.createElement('p');
    pElem.innerHTML = tempVal;
    divElem.classList.add('main__sidebar_day_object');
    divElem.setAttribute('data-id', dayObject.ident);
    forHeight(dayObject, divElem);
    divElem.append(h7Elem, pElem);
    certainPlace.append(divElem); 
};



export const filterCorrectDays = (eventsArray, firstDayOfWeek, lastDayOfWeek) => {
    let firstDateInWeek = new Date(firstDayOfWeek);
    let firstDayYear = firstDateInWeek.getFullYear();
    let firstDayMonth = firstDateInWeek.getMonth();
    let firstDayDate = firstDateInWeek.getDate();
    firstPoint = new Date(firstDayYear, firstDayMonth, firstDayDate);
    
    let lastDateInWeek = new Date(lastDayOfWeek);
    let lastDayYear = lastDateInWeek.getFullYear();
    let lastDayMonth = lastDateInWeek.getMonth();
    let lastDayDate = lastDateInWeek.getDate();
    lastPoint = new Date(lastDayYear, lastDayMonth, lastDayDate+1); 
    
    return eventsArray
        .filter(elem => elem.startTime >= firstPoint && elem.startTime < lastPoint);        
};

export const forChangingEventsArray = (array) => {
    array.map((element,index) => {
        if(element.startTime.getDate() !== element.endTime.getDate() && element.endTime.getHours() > 0){
            array.splice(index,1);
            transformObjectFunc(element);
        }
    });
    let tempArr = filterCorrectDays(array,week[0],week[6]);
    tempArr.forEach(elem => fillDayPlace(elem));
};


export const renderEventObject = (array) => {
    return forChangingEventsArray(array);    
};
renderEventObject(eventsArray);
