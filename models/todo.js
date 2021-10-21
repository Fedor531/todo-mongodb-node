const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = model('Todo', todoSchema);
