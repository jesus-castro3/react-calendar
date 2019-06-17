import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { openModal } from './actions'

const Events = (props) => (
  <div className="calendar-events">
    {props.data && props.data.map((event) => (        
      <div key={event.uuid} className="calendar-event" style={{backgroundColor: event.color, cursor: 'pointer'}} onClick={ (_) => { props.openModal(event.idx, event.date , event, true ) }}>
        <span style={{fontWeight: 'bolder'}}>{event.time}</span>
        <span>{event.title}</span>
      </div>
    ))}
  </div>
)


const CalendarDay = (props) => {
  const { day: {dayNumber, events, idx, date}, currentDay, openModal } = props;
  
  let calendarDayEvents = null;

  if(Object.keys(events).length) {
    calendarDayEvents = Object.values(events);    
  }
  return(
    <div className="calendar-day">
      <span className="calendar-day__number">{dayNumber}</span>
      <button className="calendar-day__button" onClick={(_) => openModal(idx, date, currentDay)}>Add Event</button>
      {calendarDayEvents && calendarDayEvents.map((data) => <Events key={uuid()} data={data} idx={idx} date={date} openModal={openModal}/>)}        
    </div>
  )
};


const mapDispatchToProps = dispatch => ({
  openModal: (...params) => dispatch(openModal(params))
});


export default connect(
  null,
  mapDispatchToProps
)(CalendarDay);