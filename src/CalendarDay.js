import React, { Component } from 'react';
import uuid from 'uuid/v4';

function Events(props) {
  return(
    <div className="calendar-events">
      {props.data && props.data.map((event) => (        
        <div key={event.uuid} className="calendar-event" style={{backgroundColor: event.color, cursor: 'pointer'}} onClick={ (e) => { props.openModal(e, event.idx, event.date , event, true ) }}>
          <span style={{fontWeight: 'bolder'}}>{event.time}</span>
          <span>{event.title}</span>
        </div>
      ))}
    </div>
  )
}

class CalendarDay extends Component {
  render(){

    const { day: {dayNumber, events, idx, date}, openModal } = this.props;
    let calendarDayEvents = null;

    if(Object.keys(events).length) {
      calendarDayEvents = Object.values(events);
    }

    return(
      <div className="calendar-day">
        <span className="calendar-day__number">{dayNumber}</span>
        <button className="calendar-day__button" onClick={(e) => openModal(e, idx, date)}>Add Event</button>
        {calendarDayEvents && calendarDayEvents.map((data) => <Events key={uuid()} data={data} idx={idx} date={date} openModal={openModal}/>)}        
      </div>
    )
  }
}

export default  CalendarDay;