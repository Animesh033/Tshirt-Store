const express = require('express');
const app = express();
// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

const port = 8000;

app.get('/', (req, res) => {
    return res.send('hello there!');
});

const admin = (req, res, next) => {
    return res.send('this is admin dashboard!');
    next();
};

const isAdmin = (req, res, next) => {
    return res.send('isAdmin is running!');
    next();
};

const isLoggedIn = (req, res, next) => {
    return res.send('isLoggedIn is running!');
    next();
};

app.get('/admin', isLoggedIn, isAdmin, admin);

app.listen(port, () => {
    console.log(`My app listening at http://localhost:${port}`)
});