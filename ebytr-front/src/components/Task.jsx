/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';

function Task({ task, userInfo, setUpdateList }) {
  const [isInEditMode, setIsInEditMode] = useState(false);

  const removeTask = async (id) => {
    const { email } = userInfo;
    const data = { email };
    setUpdateList(true);
    await axios.put(`http://localhost:4000/employees/deleteTask/${id}`, data);
    setUpdateList(false);
  };

  const changeToEditMode = () => (
    isInEditMode ? setIsInEditMode(false) : setIsInEditMode(true)
  );

  const renderEditView = (text) => (
    <>
      <input type="text" defaultValue={ text } />
      <button type="button" onClick={ () => changeToEditMode() }>Cancel</button>
    </>
  );

  const renderDefautView = (text) => (
    <h5
      className="card-title"
      style={ { justifyContent: 'start', margin: '0' } }
      onDoubleClick={ () => changeToEditMode() }
    >
      {text}
    </h5>
  );

  return (
    <div className="card" key={ task.id } style={ { marginTop: '1rem' } }>
      <div
        className="card-header"
        style={ {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        } }
      >
        { isInEditMode ? renderEditView(task.text) : renderDefautView(task.text) }
        <button
          type="button"
          onClick={ () => removeTask(task.id) }
          className="btn btn-danger"
        >
          Remove
        </button>
      </div>
      <div className="card-body">
        <div
          className="form-check form-switch"
          style={ {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          } }
        >
          <label
            className="form-check-label"
            htmlFor="flexSwitchCheckDefault"
          >
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
            <h5 className="card-title">{task.status}</h5>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Task;
