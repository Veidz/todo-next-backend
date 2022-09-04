const router = require('express').Router();
const TaskController = require('../controllers/tasks');
const TaskValidation = require('../middlewares/tasks-validation');

const taskController = new TaskController();

router.post('/', TaskValidation, taskController.create);
router.put('/:id', TaskValidation, taskController.update);
router.get('/filter/all', taskController.findAll);

module.exports = router;
