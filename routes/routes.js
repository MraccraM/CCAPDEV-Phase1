const express = require(`express`);
const controller = require(`../controllers/controller.js`);

const app = express();
//new stuff

//end of new stuff
app.get('/favicon.ico', controller.getFavicon);
app.get('/', controller.getIndex);

app.get('/addPost', controller.addPost);
app.post('/addPost', controller.submitPost);
app.get('/:id' , controller.getID);

app.get('/profile', controller.getProfile);

//app.get('/addProfile', controller.getRegister);

app.get('/addelse', function(req,res){
    res.render("register");
})

app.get('/test', controller.getTest);

app.get('/logout', controller.userLogout);

module.exports = app;