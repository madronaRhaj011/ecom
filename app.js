const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/router');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));

// Set up session middleware
app.use(session({
    secret: 'secret',  // Replace with a secure key for your app
    resave: false,            // Prevents session from being saved back to the store if not modified
    saveUninitialized: true,  // Save uninitialized sessions (new but not modified)
    cookie: { secure: false } // Set to true if using HTTPS
}));
app.use('/', routes);

app.listen(3000, () =>{
    console.log('server initialized on http://localhost:3000');
    
})