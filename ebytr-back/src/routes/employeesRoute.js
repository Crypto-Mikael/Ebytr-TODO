const router = require('express').Router();

const employeesController = require('../controllers/employeesController');

const tokenValidation = require('../middlewares/tokenValidation');

router.get('/', employeesController.getAllEmployees);
router.get('/:id', employeesController.getEmployeeById);
router.post('/login', employeesController.loginToken);
router.post('/register', employeesController.registerEmployee);

module.exports = router;