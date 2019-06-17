import React from 'react';
import { connect } from 'react-redux';
import calendarService from './service/CalendarService';
import CalendarHeader from './CalendarHeader';
import CalendarDay from './CalendarDay';
import CalendarModal from './CalendarModal';
import uuid from 'uuid/v4';

const Calendar = (props) => (

  <div className="calendar">

    <CalendarHeader/>
    
    <CalendarWeekDays weekdays={calendarService.weekdays()}/>
    
    <div className="calendar-days">
      {
        props.calendar.days.map((day) => (
          (day === null) ? 
          <CalendarDayEmptyShell key={uuid()}/> : 
          <CalendarDay key={uuid()} day={day} currentDay={props.currentDay}/>)          
        )
      }
    </div>

    <CalendarModal/>
  </div>
);


const CalendarWeekDays = (props) => (
  <div className="calendar-week-days">
    { props.weekdays.map( day => <div key={uuid()} className="calendar-week-day">{day}</div> ) }
  </div>
)

const CalendarDayEmptyShell = () =>  (
  <div className="calendar-day calendar-day--empty">
    {/* empty for now */}
  </div>
)


const mapStateToProps = state => ({
  ...state.calendar
})



export default connect(
  mapStateToProps, 
  null
)(Calendar);