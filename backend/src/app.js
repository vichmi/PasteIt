require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3005;
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const cors = require('cors');

app.use(bodyParser());
app.use(cors());
app.use('/', routes);

app.listen(port, () => console.log(`Server started at: ${port}`));