const jwt = require('jsonwebtoken');
const usersServices = require('../services/employeesService');

const secret = 'secretToken';

const tokenValidation = async (req, res, next) => {
  const token = req.header('Authorization');
  if(!token) return res.status(401).json({ message: 'missing auth token' });

  const decodedUser = jwt.verify(token, secret);

  const user = await usersServices.findEmployeeByEmail(decodedUser.email);
  if (!user) return res.status(401).json({ message: 'jwt malformed'});

  req.user = user;
  next();
};

module.exports = tokenValidation;