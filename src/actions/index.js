export const getNextMonth = () => ({
  type: "NEXT_MONTH"
});

export const getPrevMonth = () => ({
  type: "PREV_MONTH"
});

export const openModal = ([idx, date, currentDay, edit = false]) => ({
  type: 'OPEN_MODAL',
  data: {
    idx,
    date,
    currentDay,
    edit
  }
});

export const closeModal = () => ({
  type: 'CLOSE_MODAL'
});

export const onInputChange = (value, type) => ({
  type: 'ON_INPUT_CHANGE',
  data: {
    value,
    type
  }
});

export const addEvent = (eventData) => ({
  type: 'ADD_EVENT',
  data: eventData
});

export const editEvent = (eventData) => ({
  type: 'EDIT_EVENT',
  data: eventData
});

export const removeEvent = (eventData) => ({
  type: 'REMOVE_EVENT',
  data: eventData
})