import React, { Component } from 'react';
import calendarService from './service/CalendarService';

class CalendarHeader extends Component {
  render() {
    return(
      <div className="calendar-header">
        <button onClick={this.props.prevMonth} style={{ visibility: calendarService.isMonthLimit() ? 'hidden' : 'visible'}}> {`<`} </button>
        <h1>{this.props.month}</h1>
        <button onClick={this.props.nextMonth}> {`>`} </button>
      </div>
    )
  }
}

export default CalendarHeader;