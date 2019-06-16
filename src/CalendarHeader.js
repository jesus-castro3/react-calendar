import React from 'react';
import { connect } from 'react-redux';
import { getNextMonth, getPrevMonth } from './actions';
import calendarService from './service/CalendarService';

const CalendarHeader = (props) => (
  <div className="calendar-header">
    <button onClick={props.prevMonth} style={{ visibility: calendarService.isMonthLimit() ? 'hidden' : 'visible'}}> {`<`} </button>
    <h1>{props.month}</h1>
    <button onClick={props.nextMonth}> {`>`} </button>
  </div>
);

const mapStateToProps = state => {
  debugger;
  return {
    month: state.calendar.monthName
  }
};

const mapDispatchToProps = dispatch => ({
  prevMonth: () => dispatch(getPrevMonth()),
  nextMonth: () => dispatch(getNextMonth())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarHeader);