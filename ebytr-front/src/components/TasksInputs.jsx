/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/jsx-closing-tag-location */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Tasks() {
  const [userInfo, setUserInfo] = useState('');
  const [inputTask, setInputTask] = useState('');
  const [updateList, setUpdateList] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: token } };
      const validation = await axios.get('http://localhost:4000/employees/logged', config);
      setUserInfo(validation.data);
    };
    getUserInfo();
  }, [updateList]);

  const setTask = async () => {
    const id = Object.values(userInfo)[0];
    const data = {
      text: inputTask,
      status: 'In-progress',
    };
    setUpdateList(true);
    await axios.post(`http://localhost:4000/employees/setTask/${id}`, data);
    setUpdateList(false);
  };

  const removeTask = async (id) => {
    const { email } = userInfo;
    const data = { email };
    setUpdateList(true);
    await axios.put(`http://localhost:4000/employees/deleteTask/${id}`, data);
    setUpdateList(false);
  };

  return (
    userInfo && <>
      <section className="col-mb-3">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={ inputTask }
            onChange={ ({ target }) => setInputTask(target.value) }
            placeholder="Task's"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={ () => setTask() }
            id="button-addon2"
          >
            Add
          </button>
        </div>
      </section>
      <section>
        {userInfo && userInfo.tasks.map((task) => (
          <div className="card" key={ task.id } style={ { marginTop: '1rem' } }>
            <div
              className="card-header"
              style={ {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              } }
            >
              <h5
                className="card-title"
                style={ { justifyContent: 'start', margin: '0' } }
              >
                {task.text}
              </h5>
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
        ))}
      </section>
    </>
  );
}

export default Tasks;
