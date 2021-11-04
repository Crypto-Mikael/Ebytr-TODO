const router = require('express').Router();

const employeesController = require('../controllers/employeesController');

const tokenValidation = require('../middlewares/tokenValidation');

router.get('/logged', tokenValidation, employeesController.getEmployeeByToken);
router.get('/getAllTask', employeesController.getAllEmployeesTask);
router.get('/:id', employeesController.getEmployeeById);
router.get('/', employeesController.getAllEmployees);
router.post('/login', employeesController.loginToken);
router.post('/register', employeesController.registerEmployee);

router.get('/getTask/:id', employeesController.getEmployeeTask);
router.post('/setTask/:id', employeesController.setEmployeeTask);
router.put('/editTask/:id', employeesController.editEmployeeTask);
router.put('/deleteTask/:id', employeesController.deleteEmployeeTask);

module.exports = router;