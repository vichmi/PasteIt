require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3005;
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const querystring = require('querystring');

mongoose.connect('mongodb://localhost:27017', {
    dbName: 'pasteit',
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('mongodb connected'))
.catch(err => console.log(err));

app.use(bodyParser());
app.use(cors());
app.use(expressSession({secret: 'carrot'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.listen(port, () => console.log(`Server started at: ${port}`));