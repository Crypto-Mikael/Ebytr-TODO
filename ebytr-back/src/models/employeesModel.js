const ObjectId = require('mongodb').ObjectId;
const connection = require('../connection');

const COLLECTION_NAME = 'employees';

const getAllEmployees = async () => {
  const db = await connection();
  const employees = await db.collection(COLLECTION_NAME).find().toArray();
  return employees;
};

const getEmployeeById = async (id) => {
  const db = await connection();
  const employee = await db.collection(COLLECTION_NAME).find(ObjectId(id)).toArray();
  return employee;
};

const findEmployeeByEmail = async (email) => {
  const db = await connection();
  return db.collection(COLLECTION_NAME).findOne({ email });
};

const registerEmployee = async (name, email, password) => {
  const db = await connection();
  const date = await new Date(Date.now()).toISOString();
  const inserted = await db.collection(COLLECTION_NAME)
  .insertOne({ name, email, password, role: 'user', tasks: [], date });
  return { 
    _id: inserted.insertedId, 
    name, 
    email, 
    password, 
    role: 'user',
    tasks: [],
    date 
  };
};

// TASKS

const setEmployeeTask = async (id, text, status) => {
  const db = await connection();
  const date = await new Date(Date.now()).toISOString();
  const tasks = { id: ObjectId(), text, status, date }
  await db.collection(COLLECTION_NAME).updateOne({ _id: ObjectId(id)  }, { $push: { tasks } })
  return tasks;
};

const getEmployeeTask = async (id) => {
  const db = await connection();
  const task = await db.collection(COLLECTION_NAME)
  .aggregate([ 
  { 
    $match: { 
      _id: ObjectId(id)
    },
  },
  { 
    $project: { 
      _id: 0, 
      tasks: 1
    },
  },
  ]).toArray();
  return task[0];
};

const getAllEmployeesTask = async () => {
  const db = await connection();
  const task = await db.collection(COLLECTION_NAME).aggregate([
    {
      $unwind: {
        path: '$tasks'
      }
    },
    {
      $project: {
        _id: 0,
        task: '$tasks',
      }
    }
  ]).toArray();
  return { tasks: [...task] };
}

const editEmployeeTask = async (id, text, status) => {
  const db = await connection();
  const task = { message: 'task edited!' };
  await db.collection(COLLECTION_NAME)
  .updateOne({ 'tasks.id': ObjectId(id) }, 
  { $set: { 'tasks.$.text': text, 'tasks.$.status': status } });
  return task;
};

const deleteEmployeeTask = async (id, email) => {
  const db = await connection();
  const task = { message: 'task removed!' };
  await db.collection(COLLECTION_NAME)
  .updateOne({ email }, { $pull: { tasks: { id: ObjectId(id) } } }, { multi:true });
  return task;
};

module.exports = {
  findEmployeeByEmail,
  getAllEmployeesTask,
  deleteEmployeeTask,
  editEmployeeTask,
  registerEmployee,
  setEmployeeTask,
  getEmployeeTask,
  getAllEmployees,
  getEmployeeById,
};