import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function Task({ task, userInfo, setUpdateList, taskStatus }) {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [isStatusTask, setIsStatusTask] = useState(taskStatus);

  const removeTask = async (id) => {
    const { email } = userInfo;
    const data = { email };
    setUpdateList(true);
    await axios.put(`http://localhost:4000/employees/deleteTask/${id}`, data);
    setUpdateList(false);
  };

  const updateTask = async ({ parentNode }) => {
    const { status, id } = task;
    const { value } = parentNode.firstChild;
    const data = { text: value, status };
    setUpdateList(true);
    await axios.put(`http://localhost:4000/employees/editTask/${id}`, data);
    setUpdateList(false);
    setIsInEditMode(false);
  };

  const changeStatus = async () => {
    const { id, text } = task;
    if (isStatusTask === 'pendente') setIsStatusTask('andamento');
    if (isStatusTask === 'andamento') setIsStatusTask('pronto');
    if (isStatusTask === 'pronto') setIsStatusTask('pendente');
    const data = { text, status: isStatusTask };
    setUpdateList(true);
    await axios.put(`http://localhost:4000/employees/editTask/${id}`, data);
    setUpdateList(false);
  };

  const changeToEditMode = () => (
    isInEditMode ? setIsInEditMode(false) : setIsInEditMode(true)
  );

  const renderEditView = (text) => (
    <>
      <input type="text" defaultValue={ text } />
      <button
        type="button"
        onClick={ ({ target }) => updateTask(target) }
        className="btn btn-success btn-sm"
      >
        Save
      </button>
      <button
        type="button"
        onClick={ () => changeToEditMode() }
        className="btn btn-warning btn-sm"
      >
        Cancel
      </button>
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

  const renderDeleteButton = () => (
    <button
      type="button"
      onClick={ () => removeTask(task.id) }
      className="btn btn-outline-danger btn-sm"
    >
      Remove
    </button>
  );

  return (
    <div className="card" key={ task.id } style={ { marginTop: '1rem' } }>
      <div
        className="card-header"
        style={ {
          display: 'flex',
          height: '2.6rem',
          justifyContent: 'space-between',
          alignItems: 'center',
        } }
      >
        { isInEditMode ? renderEditView(task.text) : renderDefautView(task.text) }
        { task.status === 'pronto' && renderDeleteButton()}
      </div>
      <div
        className="card-body"
        style={ {
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'baseline',
        } }
      >
        <input
          type="radio"
          defaultChecked
          onClick={ () => changeStatus() }
          style={ {
            marginRight: '1rem',
          } }
        />
        <h5
          className="card-title"
        >
          {task.status}
        </h5>
      </div>
    </div>
  );
}

Task.propTypes = {
  taskStatus: PropTypes.string.isRequired,
  task: PropTypes.objectOf(String).isRequired,
  setUpdateList: PropTypes.func.isRequired,
  userInfo: PropTypes.objectOf(String).isRequired,
};

export default Task;
