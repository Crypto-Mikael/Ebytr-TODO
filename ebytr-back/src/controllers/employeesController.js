const employeesService = require('../services/employeesService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = 'secretToken';

const getAllEmployees = async (_req, res) => {
  const employees = await employeesService.getAllEmployees();
  return res.status(200).json(employees);
};

const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  const employee = await employeesService.getEmployeeById(id);
  return res.status(200).json(employee);
};

const loginToken = async (req, res) => {
  const { email, password } = req.body;

  const employee = await employeesService.findEmployeeByEmail(email);
  const passwordCheck = await bcrypt.compare(password, employee.password);
  if (!passwordCheck) return res.status(404).json({ message: 'employee not found' });
  if (employee.message) return res.status(404).json(employee);

  const { _id, role } = employee;

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ _id, email, role }, secret, jwtConfig);
  return res.status(200).json({ token });
};

const getEmployeeByToken = async (req, res) => {
  const user = req.user;
  return res.status(200).json(user);
};

const registerEmployee = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const employee = await employeesService.registerEmployee(name, email, hashedPassword);
  return res.status(200).json(employee);
};

// TASKS

const setEmployeeTask = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const { text, status } = req.body;
  const task = await employeesService.setEmployeeTask(id, text, status);
  return res.status(200).json(task);
};

const getEmployeeTask = async (req, res) => {
  const { id } = req.params;
  const task = await employeesService.getEmployeeTask(id);
  return res.status(200).json(task);
};

const getAllEmployeesTask = async (_req, res) => {
  const tasks = await employeesService.getAllEmployeesTask();
  return res.status(200).json(tasks);
}

const editEmployeeTask = async (req, res) => {
  const { id } = req.params;
  const { text, status } = req.body;
  const task = await employeesService.editEmployeeTask(id, text, status);
  return res.status(200).json(task);
};

const deleteEmployeeTask = async (req, res) => {
  const { id } = req.params;
  const task = await employeesService.deleteEmployeeTask(id);
  return res.status(200).json(task);
}

module.exports = {
  getAllEmployeesTask,
  deleteEmployeeTask,
  getEmployeeByToken,
  editEmployeeTask,
  registerEmployee,
  getEmployeeTask,
  setEmployeeTask,
  getAllEmployees,
  getEmployeeById,
  loginToken,
};
