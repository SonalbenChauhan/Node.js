const http = require('http');
const path = require('path');

// const shortid = require('shortid');
// const fileUpload = require('express-fileupload')();

const expInst = require('express');
const express = new expInst();
const server = http.createServer(express);
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const db = require('./db.js');
db.init();

//use npm to add the bcrypt library
const bcrypt = require('bcryptjs');

//generate a salt value to combine with the password for hashing
let salt = bcrypt.genSaltSync();
//generate a hash value between the user's password and the salt
let hash = bcrypt.hashSync('password', salt);
//... later, compare a received password with the hash we store
let isValid = bcrypt.compareSync('password', hash);
    
// express.use(expInst.static(path.resolve(__dirname, 'client')));
express.use(bodyParser.urlencoded({ extended: true }));
express.use(bodyParser.json());
express.use(
    cookieSession({
        name: 'session',
        keys: ['key1', 'key2'],
    })
);
// express.use(fileUpload);
require("./items")(express, db);
require("./order_items")(express, db);
require("./orders")(express, db);
require("./comments")(express, db);
require("./users")(express, db);
server.listen(8081, '0.0.0.0', () => {
    let addr = server.address();
    console.log(`listening on ${addr.port}`);
});

// express.get('/db', async (req, res) => {
//     let students = await db.find('students', {ConestogaID: '111123'});
//     res.json(students);
// });

// //this handles a get to a url of the form: localhost/hello/1
// express.get('/hello/:id', (req, res) => {
//     res.send(`<h1>Hello. The parameter is ${req.params.id}</h1>`);
// });

// //this handles a get to a url of the form: localhost/hello?id=1
// express.get('/hello', (req, res) => {
//     res.send(`<h1>Hello. The parameter is ${req.query.id}</h1>`);
// });

// //this handles a post to the localhost/hello url
// //with a body of {id: 1}
// express.post('/hello', (req, res) => {
//     res.send(`<h1>Hello. The parameter is ${req.body.id}</h1>`);
// });

// //tell the router how to handle the /upload POST request
// //we'll respond with json formatted data
// //the client will consume this data so it doesn't have to navigate to a new page
// express.post('/upload', async function(req, res) {
//     let success = false;

//     //if there actually are files
//     if (req.files) {
//         // The name of the input field is used to retrieve the uploaded file
//         let file = req.files.file;

//         try {
//             // Use the mv() method to place the file somewhere on your server
//             await file.mv(`data/${shortid.generate()}.txt`);
//             success = true;
//         } catch (err) {
//             //do nothing, but don't let the exception cause us to not respond
//             console.log(err);
//         }
//     }
//     //send back json data in the agreed upon format
//     res.json({ success: success });
// });
