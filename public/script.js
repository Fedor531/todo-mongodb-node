new Vue({
    el: '#app',
    data() {
        return {
            isDark: true,
            show: true,
            todoTitle: '',
            todos: []
        }
    },

    created() {
        fetch('api/todo', {
            method: 'GET'
        }).then(res => res.json())
            .then(todos => {
                this.todos = todos
            })
    },

    methods: {
        addTodo() {
            const title = this.todoTitle.trim()
            if (!title) {
                return
            }

            fetch('/api/todo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title })
            })
                .then(res => res.json())
                .then(({ todo }) => {
                    this.todos.push(todo);
                    this.todoTitle = '';
                })
        },
        removeTodo(id) {
            fetch('api/todo/' + id, {
                method: 'DELETE'
            })
                .then(() => {
                    this.todos = this.todos.filter(t => t._id !== id)
                })
                .catch(e => console.log(e))
        },
        completeTodo({ _id, done }) {
            fetch('api/todo/' + _id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ done: done, updatedAt: new Date() })
            })
                .then(res => res.json())
                .then(({ todo }) => {
                    const idx = this.todos.findIndex(t => t._id === todo._id);
                    this.todos[idx].updatedAt = todo.updatedAt;
                })
                .catch(e => console.log(e))
        }
    },
    filters: {
        capitalize(value) {
            return value.toString().charAt(0).toUpperCase() + value.slice(1)
        },
        date(value, withTime) {
            const options = {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            }

            if (withTime) {
                options.hour = '2-digit';
                options.minute = '2-digit';
                options.second = '2-digit';
            }

            return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
        }
    }
})
