import calendarService from '../service/CalendarService';

const initialState = {
  edit: false,
  calendar: calendarService.getCalendarMonthData(),
  isModalOpened: false,
  currentDay: {
    idx: 0,
    time: '',
    title: '',
    color: '#ffffff',
    date: '',
    city: ''
  }
}

export const calendar = (state = initialState, action) => {
  switch (action.type) {
    case 'NEXT_MONTH':
      return {
        ...state,
        calendar: calendarService.setNextMonth().getCalendarMonthData()
      }

    case 'PREV_MONTH':
      return {
        ...state,
        calendar: calendarService.setPrevMonth().getCalendarMonthData()
      }

    case 'OPEN_MODAL':
      const { idx, date, currentDay, edit } = action.data;
      return {
        ...state,
        edit,
        isModalOpened: true,
        currentDay: {
          ...currentDay,
          date,
          idx
        }
      }

    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpened: false
      }

    case 'ADD_EVENT':
      return {
        ...state,
        currentDay: calendarService.currentDayReset(),
        isModalOpened: false,
        calendar: calendarService.addEvent(action.data)
      }

    case 'REMOVE_EVENT':
      return {
        ...state,
        currentDay: calendarService.currentDayReset(),
        isModalOpened: false,
        calendar: calendarService.removeEvent(action.data)
      }

    case 'EDIT_EVENT':
      return {
        ...state,
        currentDay: calendarService.currentDayReset(),
        isModalOpened: false,
        calendar: calendarService.editEvent(action.data)        
      }

    case 'ON_INPUT_CHANGE':
      return {
        ...state,
        currentDay: {
          ...state.currentDay,
          [action.data.type]: action.data.value
        }
      }

    default:
      return state;
  }
}

// export const modal = (state = initialState, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// }