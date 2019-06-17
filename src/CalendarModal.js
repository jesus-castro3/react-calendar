import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { addEvent, closeModal, onInputChange, editEvent, removeEvent, getWeather } from './actions'
import _uuid from 'uuid/v4';

const CalendarModal = (props) => {

  const { currentDay, isModalOpened, addEvent, closeModal, onInputChange, edit, editEvent, removeEvent, getWeather} = props;
  const { time, title, color, uuid, city, weather, icon } = currentDay;
  const style = (isModalOpened) ? { display: 'flex' } : { display: 'none' };
  
  return(
    <Fragment>
      <div className="calendar-modal" style={style}> 
        <div onClick={closeModal} style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer'}}>
          <span>( X )</span>
        </div>
        <div className="calendar-modal-group">
          <label htmlFor="calendar-event-title">Event Title: </label>
          <input name="calendar-event-title" type="text" value={title} onChange={(e) => onInputChange(e.target.value, 'title')} maxLength="30"/>
        </div>
        <div className="calendar-modal-group">
          <label htmlFor="calendar-event-time">Event Time: </label>
          <input name="calendar-event-time" value={time} type="time" onChange={(e) => onInputChange(e.target.value, 'time')} maxLength="30"/>
        </div>
        <div className="calendar-modal-group">
          <label htmlFor="calendar-event-city">City: </label>
          <input name="calendar-event-city" type="text" value={city} onChange={(e) =>  onInputChange(e.target.value, 'city')} maxLength="30"/>
          <button onClick={(e) => getWeather(city, 'city')}>search</button>
          <div className="calendar-modal-weather">          
            { weather && <div>{weather}</div>}
            { icon && <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="forecast icon" width="40" height="40"/>}
          </div>
        </div>          
        <div className="calendar-modal-group">
          <label htmlFor="calendar-event-color">Event Color: </label>
          <input name="calendar-event-color" value={color} type="color" onChange={(e) => onInputChange(e.target.value, 'color')} maxLength="30"/>
        </div>
        {
          edit ?
          (
            <Fragment>
              <button onClick={() => editEvent({...currentDay, uuid})}>Edit Event</button>
              <button onClick={() => removeEvent({...currentDay, uuid})}>Remove</button>
            </Fragment>
          ) : (
            <button onClick={() => addEvent({...currentDay, uuid: _uuid()})}>Add Event</button>
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
  removeEvent: (eventData) => dispatch(removeEvent(eventData)),
  getWeather: (value, type) => dispatch(getWeather(value, type))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarModal);