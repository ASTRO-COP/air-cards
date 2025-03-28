const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { prototype } = require('nodemailer/lib/dkim');
const userRouter = require('./routes/user.route.js');
const setRouter = require('./routes/set.route.js');
const cardRouter = require('./routes/card.route.js');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/sets', setRouter);
app.use('/api/v1/cards', cardRouter);

mongoose.connect('mongodb+srv://trav:travisbruh@cluster0.cfb0yez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to the database');

    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    })
})
.catch((err) => {
    console.log('Failed: ' + err);
})