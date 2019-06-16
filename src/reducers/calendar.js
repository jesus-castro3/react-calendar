import calendarService from '../service/CalendarService';

const initialState = calendarService.getCalendarMonthData()

export const calendar = (state = initialState, action) => {
  switch (action.type) {
    case 'NEXT_MONTH':
      return {
          ...state,
          ...calendarService.setNextMonth().getCalendarMonthData()
          };
    case 'PREV_MONTH':
      return {
        ...state,
        ...calendarService.setPrevMonth().getCalendarMonthData()
        };
    default:
      return state;
  }
}