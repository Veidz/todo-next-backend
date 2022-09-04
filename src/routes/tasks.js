const router = require('express').Router();

const TasksController = require('../controllers/tasks');
const TasksValidation = require('../middlewares/tasks-validation');
const MacAddressValidation = require('../middlewares/macaddress-validation');

const tasksController = new TasksController();

router.post('/', TasksValidation, tasksController.create);
router.put('/:id', TasksValidation, tasksController.update);
router.get('/filter/all', MacAddressValidation, tasksController.findAll);
router.get('/:id', tasksController.findOne);
router.delete('/:id', tasksController.delete);
router.put('/:id/:done', tasksController.done);
router.get('/filter/late', MacAddressValidation, tasksController.late);
router.get('/filter/today', MacAddressValidation, tasksController.today);
router.get('/filter/week', MacAddressValidation, tasksController.week);
router.get('/filter/month', MacAddressValidation, tasksController.month);

module.exports = router;
