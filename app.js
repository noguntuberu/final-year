/**
 * 
 */
const   express = require('express'),
        mongoose = require('mongoose'),
        cors = require('cors'),
        fileUpload = require('express-fileupload'),
        bodyParser = require('body-parser'),
        compression = require('compression'),
        helmet = require('helmet'),
        config = require('./config/config'),
        path = require('path');

const UserRoute = require('./src/routes/user.route');
const PostRoute = require('./src/routes/post.route');

const System = require('./src/controllers/system.control');

// Set Up Database
config.setUpDatabase(mongoose);

// Instantiate app
const app = express();

// Set up Middleware
app.use(cors());
app.use(express.static('public'));
app.use(compression());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());

// Set up Routes
// app.use((req, res, next) => {
//     req.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     req.setHeader('Access-Control-Allow-Headers', '*');

//     next();
// });

app.use('/user', UserRoute);
app.use('/post', PostRoute);

// Start Server
app.listen(port = process.env.PORT || 3000, async () => {
    // Load up System resources from database
    System.init();
});
