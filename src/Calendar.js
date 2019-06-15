import React, { Component } from 'react';
import calendarService from './service/CalendarService';
import CalendarHeader from './CalendarHeader';
import CalendarDay from './CalendarDay';
import CalendarModal from './CalendarModal';
import uuid from 'uuid/v4';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.previousMonth = this.previousMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.openModal = this.openModal.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.state = {
      edit: false,
      calendar: calendarService.getCalendarMonthData(),
      isModalOpened: false,
      currentDay: {
        idx: 0,
        time: '',
        title: '',
        color: '#ffffff',
        date: ''
      }
    }
  }
  //calendar will receive calendar data to render calendar the appropiate way

  previousMonth() {
    const calendar = calendarService.setPrevMonth().getCalendarMonthData();
    this.setState({
      calendar
    })
  }

  nextMonth() {
    const calendar = calendarService.setNextMonth().getCalendarMonthData();
    this.setState({
      calendar
    })
  }

  openModal(e, idx, date, currentDay = this.state.currentDay, edit = false) {
    e.stopPropagation();
    this.setState({
      edit,
      isModalOpened: true,
      currentDay: {
        ...currentDay,
        date,
        idx
      }
    });
  }

  closeModal() {
    this.setState({
      isModalOpened: false,
      currentDay: calendarService.currentDayReset()         
    });
  }

  addEvent(eventData) {    
    this.setState({
      currentDay: calendarService.currentDayReset(),
      isModalOpened: false,
      calendar: calendarService.addEvent(eventData)
    })
  }

  removeEvent(eventData) {
    this.setState({
      currentDay: calendarService.currentDayReset(),
      isModalOpened: false,
      calendar: calendarService.removeEvent(eventData)
    })
  }

  editEvent(eventData) {
    this.setState({
      currentDay: calendarService.currentDayReset(),
      isModalOpened: false,
      calendar: calendarService.editEvent(eventData)
    })
  }  

  onInputChange(value, type) {
    this.setState({
      currentDay: {
        ...this.state.currentDay,
        [type]: value
      }
    })
  }

  render() {
    return(
      <div className="calendar">     
        <CalendarHeader 
          month={this.state.calendar.monthName}
          prevMonth={this.previousMonth}
          nextMonth={this.nextMonth}/>
        <CalendarWeekDays/>
        <div className="calendar-days">
          {this.state.calendar.days.map((day) => 
            ((day === null) ? <CalendarDayEmptyShell/> : <CalendarDay key={uuid()} day={day} openModal={this.openModal} />)          
          )}
        </div>

        <CalendarModal
          currentDay={this.state.currentDay}
          isModalOpened={this.state.isModalOpened}
          addEvent={this.addEvent}
          closeModal={this.closeModal}
          onInputChange={this.onInputChange}
          edit={this.state.edit}
          editEvent={this.editEvent}
          removeEvent={this.removeEvent}/>
      </div>
    )
  }
}

function CalendarWeekDays() {
  return(
    <div className="calendar-week-days">
      <div className="calendar-week-day">Sunday</div>
      <div className="calendar-week-day">Monday</div>
      <div className="calendar-week-day">Tuesday</div>
      <div className="calendar-week-day">Wednesday</div>
      <div className="calendar-week-day">Thursday</div>
      <div className="calendar-week-day">Friday</div>
      <div className="calendar-week-day">Saturday</div>
    </div>
  )
}
function CalendarDayEmptyShell() {
  return(
    <div className="calendar-day calendar-day--empty">
      {/* empty for now */}
    </div>
  )
}


export default Calendar;