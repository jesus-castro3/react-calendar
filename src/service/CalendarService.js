import moment from 'moment';

const calendarService = (() => {
  
  const monthLimit = moment().month();
  let currentMonth = moment().month();
  let currentMonthData = [];

  const setNextMonth = () => {
    currentMonth = (currentMonth <= 10) ? currentMonth+1 : currentMonth;
    return calendarService;
  }

  const setPrevMonth = () => {
    currentMonth = (currentMonth >= 1) ? currentMonth-1 : currentMonth;
    return calendarService; 
  }

  const weekdays = () => moment.weekdays()

  const isMonthLimit = () => monthLimit === currentMonth
  
  const getMonthName = () => moment().month(currentMonth).format('MMMM')

  const firstDayOfMonth = () => moment().month(currentMonth).startOf('month').day()

  const lastDayOfMonth = () => { 
    const day = moment().month(currentMonth).endOf('month').day()+1;
    return (day === 7 ) ? 0 : 7-day;
  }

  const getDaysInMonth = () => moment().month(currentMonth).daysInMonth();

  const getMonth = () => moment().month(currentMonth).format('MM');

  const getYear = () => moment().year();

  const currentDayReset = () => ({
    idx: 0,
    time: '',
    title: '',
    color: '#ffffff',
    date: ''
  })

  const getDayFromMonth = (m, d, y) =>  moment(`${m}/${d}/${y}`, 'MM/D/YYYY').format('DD');

  const addEvent = ([idx, time, title, color, date, uuid]) => {
    const [ hour, minutes ] = time.split(':');
    const unix = moment(date, 'MM/DD/YYYY').set({ hour, minutes }).unix();
    if(currentMonthData[idx].events[unix]) {
      currentMonthData[idx].events[unix].push({ idx, time, title, color, date, uuid })
    } else {
      currentMonthData[idx].events[unix] = [{idx, time, title, color, date, uuid}];
    }
    return {      
      days: currentMonthData,
      monthName: getMonthName()    
    }
  }

  const editEvent = ([idx, time, title, color, date, uuid]) => {
    const [ hour, minutes ] = time.split(':');
    const unix = moment(date, 'MM/DD/YYYY').set({ hour, minutes }).unix();
    currentMonthData[idx].events[unix] = currentMonthData[idx].events[unix].map((event)=> {
      if(uuid === event.uuid) {
        event = { idx, time, title, color, date, uuid };
      }
      return event;
    })
    
    return {      
      days: currentMonthData,
      monthName: getMonthName()    
    }    
  }

  const removeEvent = ([idx, time, _title, _color, date, uuid]) => {
    const [ hour, minutes ] = time.split(':');
    const unix = moment(date, 'MM/DD/YYYY').set({ hour, minutes }).unix();
    currentMonthData[idx].events[unix] = currentMonthData[idx].events[unix].filter((event) => uuid !== event.uuid);
    return {      
      days: currentMonthData,
      monthName: getMonthName()    
    }
  }

  const getCalendarMonthData = () => {
    const daysInMonth = getDaysInMonth();
    const monthName = getMonthName();
    const month = getMonth();
    const year = getYear();
    const firstDay = firstDayOfMonth();

    const days = Array(daysInMonth).fill().map((_, idx) => {
      const day = getDayFromMonth(month, idx+1, year);
      return {
        idx: idx+firstDay,
        dayNumber: day,
        events: {},
        date: `${month}/${day}/${year}`
      }
    });

    const dayWithEmptyShells = Array(firstDay).fill(null).concat(days).concat(Array(lastDayOfMonth()).fill(null))
    currentMonthData = [...dayWithEmptyShells];

    return {
      days: dayWithEmptyShells,
      monthName
    };
  }

  return(
    {
      isMonthLimit,
      getCalendarMonthData,
      addEvent,
      editEvent,
      removeEvent,
      setNextMonth,
      setPrevMonth,
      currentDayReset,
      weekdays
    }
  )
})();

export default calendarService;