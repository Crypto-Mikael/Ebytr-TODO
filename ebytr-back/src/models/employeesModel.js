const { ObjectId } = require('mongodb');
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
}

const findEmployeeByEmail = async (email) => {
  const db = await connection();
  return db.collection(COLLECTION_NAME).findOne({ email });
};

const registerEmployee = async (name, email, password) => {
  const db = await connection();
  const date = await new Date(Date.now()).toISOString();
  await db.collection(COLLECTION_NAME)
  .insertOne({name, email, password, role: 'user', date });
};

module.exports = {
  findEmployeeByEmail,
  registerEmployee,
  getAllEmployees,
  getEmployeeById,
};