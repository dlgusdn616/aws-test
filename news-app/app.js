const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
// const mysql = require('mysql');
const mysql = require('promise-mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
const {addArticlePage, addArticle, deleteArticle, editArticle, editArticlePage} = require('./routes/article');
const port = 8080;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createPool ({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'news'
});

db.getConnection().then(conn => {
    console.log('Connected to database');
    global.db = db;
}).catch(err => done(err));

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static('./'));
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app
app.get('/', getHomePage);
app.get('/add', addArticlePage);
app.get('/edit/:id', editArticlePage);
app.get('/delete/:id', deleteArticle);
app.post('/add', addArticle);
app.post('/edit/:id', editArticle);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});