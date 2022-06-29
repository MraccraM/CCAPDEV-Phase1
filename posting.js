const express = require('express');
const app = new express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/submissionDB',
{useNewURLParser: true, useUnifiedTopology: true});

const fileUpload = require('express-fileupload');

const Post = require('./database/models/PostModel')
const path = require('path');
app.use(express.json());
app.use(express.urlencoded( {extended:true}));
app.use(express.static('public'));
app.use(fileUpload());

//handlebars
var hbs = require('hbs');
app.set('view engine', 'hbs');

app.post('/submit-post', function(req, res) {
    const {image} = req.files
    image.mv(path.resolve(__dirname, 'public/images',image.name),(error) => {
        Post.create({
            ...req.body,
            image:'/images/'+image.name
        }, (error,post) => {
            res.redirect('/')
        })
    })
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '\\' + 'submit.html');
});

var server = app.listen(3000, function() {
    console.log("Node server is running at port 3000....");
});