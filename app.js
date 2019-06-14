/**
 * 
 */
const   express = require('express'),
        mongoose = require('mongoose');
        cors = require('cors'),
        multer = require('multer'),
        bodyParser = require('body-parser'),
        compression = require('compression'),
        helmet = require('helmet'),
        config = require('./config/config');

// Set Up Database
config.setUpDatabase(mongoose);

// Instantiate app
const app = express();

// Set up Middleware
app .use(express.static('client'))
    .use(compression)
    .use(cors)
    .use(multer().array())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use(helmet);

// Set up Routes


// Start Server
app.listen(process.env.PORT || 3000, () => {
    console.log("Server Running...");
});
