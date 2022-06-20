require('dotenv').config()

const express = require('express')
const authRoutes = require('./routes/auth')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const errorHandler = require('./middleware/error-handler')

const app = express();

mongoose.connect(`mongodb+srv://${process.env.MONGO_NICK}:${process.env.MONGO_PW}@todo-app.6kddvz6.mongodb.net/users-db`, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => console.error(err));


app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080'
}));
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/', authRoutes);
// app.use(errorHandler)

// app.use((err, req, res, next) => {
//   console.log(err);

//   if(err instanceof Error) {
//     return res.status(err.status).json({ message: err.message })
//   }
//   return res.status(500).json({ message: 'error' })
// })

app.listen(3000, () => {
    console.log('Listening on port 3000')
})