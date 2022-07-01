const express = require(`express`);
const controller = require(`../controllers/controller.js`);

const app = express();

app.get('/favicon.ico', controller.getFavicon);
app.get('/', controller.getIndex);

app.post('/addPost', controller.submitPost);
app.get('/addPost', controller.addPost);
app.get('/profile', controller.getProfile);
app.get('/logout', controller.userLogout);


module.exports = app;