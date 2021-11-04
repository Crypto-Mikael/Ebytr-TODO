const employeesModel = require('../models/employeesModel');
const { ObjectId } = require('mongodb');

const getAllEmployees = async () => {
  const employees = await employeesModel.getAllEmployees();
  return employees;
};

const getEmployeeById = async (id) => {
  if(!ObjectId.isValid(id)) return { message: 'employee not found' };
  const employee = await employeesModel.getEmployeeById(id);
  if (!employee || employee.length === 0) return { message: 'employee not found' };
  return employee;
};

const findEmployeeByEmail = async (email) => {
  const employee = await employeesModel.findEmployeeByEmail(email);
  if (!employee || employee.length === 0) return { message: 'employee not found' };
  return employee;
};

const registerEmployee = async (name, email, password) => {
  const messageInvalid = { message: 'user name, email or password invalid' };
  const checkEmail = await employeesModel.findEmployeeByEmail(email);
  if (!name || !email || !password) return messageInvalid;
  if (checkEmail) return messageInvalid;
  if (!email.includes('@') || !email.includes('.com')) return messageInvalid;

  const created = await employeesModel.registerEmployee(name, email, password);
  return created;
};

// TASKS

const setEmployeeTask = async (id, text, status) => {
  const messageInvalid = { message: 'task camp invalid' };
  if (!text || !status) return messageInvalid;
  const task = await employeesModel.setEmployeeTask(id, text, status);
  return task
};

const getEmployeeTask = async (id) => {
  const messageInvalid = { message: 'task id invalid'};
  if (!id) return messageInvalid;
  const task = await employeesModel.getEmployeeTask(id);
  return task;
};

const getAllEmployeesTask = async () => {
  const task = await employeesModel.getAllEmployeesTask();
  return task;
};

const editEmployeeTask = async (id, text, status) => {
  const messageInvalid = { message: 'task is invalid' };
  if (!text || !status || !id) return messageInvalid;
  const task = await employeesModel.editEmployeeTask(id, text, status);
  return task;
};

const deleteEmployeeTask = async (id) => {
  const messageInvalid = { message: 'task is invalid' };
  if (!id) return messageInvalid;
  const task = await employeesModel.deleteEmployeeTask(id);
  return task;
}

module.exports = {
  getAllEmployeesTask,
  findEmployeeByEmail,
  deleteEmployeeTask,
  registerEmployee,
  editEmployeeTask,
  getAllEmployees,
  getEmployeeTask,
  getEmployeeById,
  setEmployeeTask,
};