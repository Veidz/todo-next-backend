const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/todo-next';
mongoose.connect(url, { useNewUrlParser: true });

module.exports = mongoose;
