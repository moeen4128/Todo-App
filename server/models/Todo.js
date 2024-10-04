const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },  // Default is 'false'
    created: { type: Date, default: Date.now },
});


const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;