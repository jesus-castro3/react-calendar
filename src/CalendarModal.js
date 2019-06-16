import React, {Fragment} from 'react';
import _uuid from 'uuid/v4';

const CalendarModal = (props) => {

  const { currentDay: { idx, time, title, color, date, uuid }, isModalOpened, addEvent, closeModal, onInputChange, edit, editEvent, removeEvent} = props;
  const style = (isModalOpened) ? { display: 'flex' } : { display: 'none' };

  return(
    <Fragment>
      <div className="calendar-modal" style={style}> 
        <div onClick={closeModal} style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer'}}>
          <span>( X )</span>
        </div>
        <div>
          <label htmlFor="calendar-event-title">Event Title: </label>
          <input name="calendar-event-title" type="text" value={title} onChange={(e) => onInputChange(e.target.value, 'title')}/>             
        </div>
        <div>
          <label htmlFor="calendar-event-time">Event Time: </label>
          <input name="calendar-event-time" value={time} type="time" onChange={(e) => onInputChange(e.target.value, 'time')}/>
        </div>
        {/* <div>
          <label htmlFor="calendar-event-city">City: </label>
          <input name="calendar-event-city" value={city} type="city" onChange={(e) => onInputChange(e.target.value, 'city')}/>
          <button type="button">Search</button>
          <span>{weather}</span>
        </div>           */}
        <div>
          <label htmlFor="calendar-event-color">Event Color: </label>
          <input name="calendar-event-color" value={color} type="color" onChange={(e) => onInputChange(e.target.value, 'color')}/>
        </div>
        {
          edit ?
          (
            <Fragment>
              <button onClick={() => editEvent([idx, time , title, color, date, uuid])}>Edit Event</button>
              <button onClick={() => removeEvent([idx, time , title, color, date, uuid])}>Remove</button>
            </Fragment>
          ) : (
            <button onClick={() => addEvent([idx, time , title, color, date, _uuid()])}>Add Event</button>
          )
        }
      </div>
      <div className="calendar-modal__overlay" style={style} onClick={closeModal}></div>
    </Fragment>
  )
}

export default CalendarModal;