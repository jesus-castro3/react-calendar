import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { addEvent, closeModal, onInputChange, editEvent, removeEvent} from './actions'
import _uuid from 'uuid/v4';

const CalendarModal = (props) => {

  const { currentDay: { idx, time, title, color, date, uuid, city, weather }, isModalOpened, addEvent, closeModal, onInputChange, edit, editEvent, removeEvent} = props;
  const style = (isModalOpened) ? { display: 'flex' } : { display: 'none' };

  return(
    <Fragment>
      <div className="calendar-modal" style={style}> 
        <div onClick={closeModal} style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer'}}>
          <span>( X )</span>
        </div>
        <div className="calendar-modal-group">
          <label htmlFor="calendar-event-title">Event Title: </label>
          <input name="calendar-event-title" type="text" value={title} onChange={(e) => onInputChange(e.target.value, 'title')}/>             
        </div>
        <div className="calendar-modal-group">
          <label htmlFor="calendar-event-time">Event Time: </label>
          <input name="calendar-event-time" value={time} type="time" onChange={(e) => onInputChange(e.target.value, 'time')}/>
        </div>
        <div className="calendar-modal-group">
          <label htmlFor="calendar-event-city">City: </label>
          <input name="calendar-event-city" type="text" value={city} onChange={(e) => onInputChange(e.target.value, 'city')}/>
        </div>          
        <div className="calendar-modal-group">
          <label htmlFor="calendar-event-color">Event Color: </label>
          <input name="calendar-event-color" value={color} type="color" onChange={(e) => onInputChange(e.target.value, 'color')}/>
        </div>
        {
          edit ?
          (
            <Fragment>
              <button onClick={() => editEvent([idx, time , title, color, date, city, uuid])}>Edit Event</button>
              <button onClick={() => removeEvent([idx, time , title, color, date, city, uuid])}>Remove</button>
            </Fragment>
          ) : (
            <button onClick={() => addEvent([idx, time , title, color, date, city, _uuid()])}>Add Event</button>
          )
        }
      </div>
      <div className="calendar-modal__overlay" style={style} onClick={closeModal}></div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  currentDay: state.calendar.currentDay,
  isModalOpened: state.calendar.isModalOpened,
  edit: state.calendar.edit
})

const mapDispatchToProps = dispatch => ({
  addEvent: (evenData) => dispatch(addEvent(evenData)),
  closeModal: () => dispatch(closeModal()),
  onInputChange: (value, type) => dispatch(onInputChange(value, type)),
  editEvent: (eventData) => dispatch(editEvent(eventData)),
  removeEvent: (eventData) => dispatch(removeEvent(eventData))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarModal);