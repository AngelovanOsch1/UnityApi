const express = require('express');
const keys = require('./config/keys.js');

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
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

require('./model/Account');

require('./routes/authenticationRoutes')(app);

app.listen(keys.port, () => {
    console.log("Listening on " + keys.port);
});