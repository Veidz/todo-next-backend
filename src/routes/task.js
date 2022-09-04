const router = require('express').Router();
const TaskController = require('../controllers/task');
const TaskValidation = require('../middlewares/task-validation');

const taskController = new TaskController();

router.post('/', TaskValidation, taskController.create);
router.put('/:id', TaskValidation, taskController.update);

module.exports = router;
