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
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
};