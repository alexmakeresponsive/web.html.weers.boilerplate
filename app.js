var express = require('express');
var app = express();





app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var myLogger = function (req, res, next) {
    console.log('__LOGGED__');
    next();
};

app.use(myLogger);


app.delete('/sendemail', function (req, res) {
    console.log('form name = ' + req.body.name);
    console.log('form email = ' + req.body.email);


    res.send('form sended ! Action method: ' + req.method);
    // res.status(500).send('form sended !');
});










//Templates
app.set('views', './src/views');
app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hey',
        message: 'Hello there!'
    });
});








//Open port for ewb browsers
app.listen(3000, function () {
    console.log('app.js listen:');
    console.log('http://localhost:3000');
});
