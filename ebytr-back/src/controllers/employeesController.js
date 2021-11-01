const employeesService = require('../services/employeesService');
const jwt = require('jsonwebtoken')
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
  const { email } = req.body;

  const employee = await employeesService.findEmployeeByEmail(email);
  if (employee.message) return res.status(404).json(employee);

  const { _id, role } = employee;

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ _id, email, role }, secret, jwtConfig);
  return res.status(200).json({ token })
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  loginToken,
}