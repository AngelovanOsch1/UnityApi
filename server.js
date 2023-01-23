const dev = require('./config/dev.js');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const cors = require('cors')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.use(cors({
    origin: "*",
}))

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect(dev.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

require('./model/Account');

require('./routes/authenticationRoutes')(app);

app.listen(dev.port, () => {
    console.log("Listening on " + dev.port);
});