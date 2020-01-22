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
app.use((req, res, next) => {
    
    //  Set headers to allow requests from any host
    req.header('Access-Control-Allow-Origin', '*');
    req.header('Access-Control-Allow-Headers', '*');

    // Set allowed request methods
    if (req.method === 'OPTIONS') {
        req.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        res.status(200).json()
    }

    next(); // next middleware in line
});

app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.get('/images/:imageName', async (req, res, next) => {
    const {imageName} = req.params;
    res.sendFile(path.resolve([__dirname, `./public/uploads/${imageName}`]));
});

// Start Server
app.listen(port = process.env.PORT || 3000, async () => {
    // Load up System resources from database
    System.init();
});
