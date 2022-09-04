const router = require('express').Router();

const TasksController = require('../controllers/tasks');
const TasksValidation = require('../middlewares/tasks-validation');

const tasksController = new TasksController();

router.post('/', TasksValidation, tasksController.create);

router.get('/:id', tasksController.findOne);
router.put('/:id', TasksValidation, tasksController.update);
router.put('/:id/:done', tasksController.done);
router.delete('/:id', tasksController.delete);

router.get('/filter/all/:macaddress', tasksController.findAll);
router.get('/filter/late/:macaddress', tasksController.late);
router.get('/filter/today/:macaddress', tasksController.today);
router.get('/filter/week/:macaddress', tasksController.week);
router.get('/filter/month/:macaddress', tasksController.month);
router.get('/filter/year/:macaddress', tasksController.year);

module.exports = router;
