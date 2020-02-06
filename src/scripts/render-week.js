import { currentWeek } from './render-current-week.js';
export { createDaysOfWeek };


function createDaysOfWeek(week){
    const daysContainer = document.querySelector('.days-of-week');
    daysContainer.innerHTML = '';
     
    //GTM Block
    const gmtBlock = document.createElement('div');
    gmtBlock.textContent = 'GTM+02';
    gmtBlock.classList.add('gmt');
    daysContainer.append(gmtBlock);
     
    //week day
    for (let i = 0; i < week.length; i++){
     const oneDay = document.createElement('div');
        oneDay.classList.add('day');
        //name of day
        const dayName = document.createElement('span');
        dayName.classList.add('day-name');
        dayName.textContent = week[i].toDateString().split(' ')[0];
        oneDay.append(dayName);
           // date of day
        const dayDate = document.createElement('div');
        dayDate.classList.add('day-date');
        dayDate.textContent = week[i].getDate();
        oneDay.append(dayDate);
          
        //current day
        if (week[i].toDateString() == new Date().toDateString()) {
            dayDate.classList.add('day-date_current');
        }
        
        daysContainer.append(oneDay);
    }
};
