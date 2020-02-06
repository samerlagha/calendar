import { renderCalendar } from "./render-calendar.js";

const redLine= document.querySelector('.redline');
const currenHourBar = displayReadLineOnCurrentHourBar();

export function renderRedLine(){

    const ball = document.createElement('div');
    ball.classList.add('redline__ball');
    const line = document.createElement('div');
    line.classList.add("redline__line");
  
    redLine.append(ball);
    redLine.append(line);
  
    currentHourBar.append(redLine);
  }
  
  renderRedLine();

  function displayRedLineOnCurrentHourBar() {

  
    const hourContainer = document.querySelectorAll(".calendar__hour-bar");
  
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes()
  
    let positionInsideHourBar = currentMinute - 4;
  
    redLine.style.marginTop = positionInsideHourBar + 'px';
  
    return [...hourContainer].find(
      el => el.dataset.day == currentDay && el.dataset.hour   ==currentHour);
  }
  
  displayRedLineOnCurrentHourBar();