const router = require('express').Router();

const TasksController = require('../controllers/tasks');
const TasksValidation = require('../middlewares/tasks-validation');
const MacAddressValidation = require('../middlewares/macaddress-validation');

const tasksController = new TasksController();

router.post('/', TasksValidation, tasksController.create);
router.put('/:id', TasksValidation, tasksController.update);
router.get('/filter/all', MacAddressValidation, tasksController.findAll);
router.get('/:id', tasksController.findOne);

module.exports = router;
