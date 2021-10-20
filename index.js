const path = require("path");
const express = require('express');

const todoRoutes = require('./routes/todo');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/todo', todoRoutes);

const PORT = process.env.PORT ?? 3000;

app.use((req, res, next) => {
    res.sendFile('/index.html')
})

try {
    app.listen(PORT, (e) => {
        console.log(`Server is running on port ${ PORT }`);
    })
}
catch (e) {
    console.log(e);
}
