/* eslint-disable react/jsx-closing-tag-location */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Task } from '.';

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
        { userInfo && userInfo.tasks.map((task) => (
          <Task
            key={ task.id }
            task={ task }
            userInfo={ userInfo }
            setUpdateList={ setUpdateList }
          />
        )) }
      </section>
    </>
  );
}

export default Tasks;
