const { Router } = require('express');
const Todo = require('../models/todo')

const router = Router();

// Получение списка задач
router.get('/', async (req, res) => {
    const todos = await Todo.find({}).select('title done createdAt updatedAt').lean()
    res.status(200).json(todos);
})

// Создание новой задачи
router.post('/', async (req, res) => {
    try {
        // req.body - буффер по умолчанию, нужно привести к объекту
        const todo = new Todo({
            title: req.body.title,
            done: false
        })

        await todo.save();
        res.status(200).json({ todo });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
})

// Изменение задачи
router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id).lean();

        console.log(req.body.done)
        todo.done = req.body.done;
        todo.updatedAt = req.body.updatedAt;

        await Todo.findByIdAndUpdate(req.params.id, todo);
        res.status(200).json({ todo });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
})

// Удаление задачи
router.delete('/:id', (req, res) => {

})

module.exports = router
