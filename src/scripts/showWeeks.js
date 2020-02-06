import { week} from './currentWeek.js';
import { showDate} from './currentWeek.js';
import { showWeek} from './currentWeek.js';
export const todayBtn = document.querySelector('.header__btn-day');
export const todayWeekSwitcher = () => {
    getMonday(week);
};
export const switchToTodaysWeek = todayBtn.addEventListener('click', todayWeekSwitcher);

export const forwardSwitcherBtn = document.querySelector('.header__arrow-btn_arr-right');
export const backwardSwitcherBtn = document.querySelector('.header__arrow-btn_arr-left');


export function showNextWeek(week) {
    let newWeek = [...week];

    newWeek.map(dateOfDay => {
        const newDate = dateOfDay.getDate();

        dateOfDay = new Date(dateOfDay.setDate(newDate + 7));
    });
    showDate(week);
    showWeek(week);
};
 export const switchWeekForward = forwardSwitcherBtn.addEventListener('click', showNextWeek.bind(forwardSwitcherBtn, week));



export const showPrevWeek = (week) => {
    let newWeek = [...week];

    newWeek.map(dateOfDay => {
        const newDate = dateOfDay.getDate();

        dateOfDay = new Date(dateOfDay.setDate(newDate - 7));
    });
    showDate(week);
    showWeek(week);
};
export const switchWeekBackward = backwardSwitcherBtn.addEventListener('click', showPrevWeek.bind(backwardSwitcherBtn, week));

