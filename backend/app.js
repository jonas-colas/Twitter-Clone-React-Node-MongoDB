const express      = require('express');
const mongoose     = require('mongoose');
const morgan       = require('morgan');
const cors         = require('cors');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const validator    = require('express-validator');


//App
require('dotenv').config();
const app = express();

//Import Routes
const userRoutes = require('./routes/userRoute');

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => console.log("Database is connected"))
.catch(err => console.log(error.reason));

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(validator());

//Routes Middlewares
app.use('/api', userRoutes);

//Port
const port = process.env.PORT || 1002;

//View , port listener
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;