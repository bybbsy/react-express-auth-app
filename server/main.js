require('dotenv').config()

const express = require('express')
const authRoutes = require('./routes/auth')

const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.use('/api/', authRoutes);

app.listen(3000, () => {
    console.log('Listening on port 3000')
})