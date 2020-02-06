
function renderSidebar () {
  const sidebar = document.querySelector('.sidebar');
  const dayHours = [];
  
  for (let hour = 0; hour < 24; hour++) {
    
    const sidebarHour = document.createElement('div');
    sidebarHour.classList.add('sidebar__hour');
    
    const sidebarHourText = document.createElement('span');
    sidebarHourText.classList.add('sidebar__hour-text');
    
    sidebarHourText.textContent = `${(hour < 10) ? '0' + hour : hour}:00`;
    
    sidebarHour.append(sidebarHourText);
    dayHours.push(sidebarHour);
  }
  
  sidebar.append(...dayHours);
};

export { renderSidebar };

renderSidebar();