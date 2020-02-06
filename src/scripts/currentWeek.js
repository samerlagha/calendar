//CurrentWeek
export const week = [
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date()
]; 
export const monthAndYear = document.querySelector('.header__datenow');

export const getMonday = (arr) => {
   
    const currentDay = new Date().getDay()-1;
    const currentDate = new Date().getDate();
    let countDays = currentDay;
    let next = 1;
    for (let i = 0; i < arr.length; i++) {
 
        if (i < currentDay) {
            let date = currentDate - countDays;
            arr[i] = new Date(new Date().setDate(date));
            countDays--;
        } else if (i == currentDay) {
            arr[i] = new Date();
        } else {
            let date = currentDate + next;
           arr[i] = new Date(new Date().setDate(date));
            next++;
        }
    }
    showDate(week);
    showWeek(week);
};


getMonday(week); 

export function showDate(arr) {
    let arrMonth = [];
    let arrYear = [];
    let result;
    let month;
    for (let i = 0; i < arr.length; i++) {
        let m = arr[i].getMonth();
        if (m==0) month=" янв";
if (m==1) month=" фев";
if (m==2) month=" март";
if (m==3) month=" апр";
if (m==4) month=" май";
if (m==5) month=" июнь";
if (m==6) month=" июля";
if (m==7) month=" авг";
if (m==8) month=" сент";
if (m==9) month=" окт";
if (m==10) month=" нояб";
if (m==11) month=" дек";

    
        let year = arr[i].toDateString().split(' ')[3];

        if (arrMonth.indexOf(month) == -1) {
            arrMonth.push(month);
        };
        if (arrYear.indexOf(year) == -1) {
            arrYear.push(year);
        }

    }
    if (arrMonth.length == 1) {
        result = `${arrMonth[0]} ${arrYear[0]}`;
    }
    if (arrMonth.length == 2) {
        result = `${arrMonth[0]} - ${arrMonth[1]} ${arrYear[0]}`;
    }
    if (arrYear.length == 2) {
        result = `${arrMonth[0]} ${arrYear[0]} - ${arrMonth[1]} ${arrYear[1]}`;
    }
    monthAndYear.innerHTML = result;
}




export function showWeek(arr){
    const daysContainer = document.querySelector('.days-container');
    daysContainer.innerHTML = '';

    const gmtBlock = document.createElement('div');
    gmtBlock.textContent = 'gmt+02';
    gmtBlock.classList.add('gmt');
    daysContainer.append(gmtBlock);

    for (let i = 0; i < arr.length; i++){
        const oneDay = document.createElement('div');
        oneDay.classList.add('day');
        
        let dayName = document.createElement('span');
       let dName;
       
        dayName.classList.add('day-name');
        let dayNum = arr[i].getDay();
        if (dayNum ==1) dName = " ПН";
        if (dayNum==2) dName = " ВТ";
        if (dayNum==3) dName= " СР";
        if (dayNum ==4) dName= " ЧТ";
        if (dayNum==5) dName= " ПТ";
        if (dayNum==6) dName = " СБ";
        if (dayNum ==0) dName = " ВС";
        dayName.textContent = dName;
        oneDay.append(dayName);

        const dayDate = document.createElement('div');
        dayDate.classList.add('day-date');
        dayDate.textContent = arr[i].getDate();
        oneDay.append(dayDate);

        if (week[i].toDateString() == new Date().toDateString()) {
            dayDate.classList.add('day-date_current');
        }
        
        daysContainer.append(oneDay);
    }
};
