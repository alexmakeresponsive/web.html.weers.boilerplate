//Require
var express = require('express');
var app     = express();


// var path = require('path');

// console.log('__dirname = ', __dirname);
// console.log('__dirname resolved = ', path.resolve(__dirname, './resolved string'));



//Shared folders
app.use(express.static('assets'));
app.use(express.static('bundles'));



//Tpl engine
app.set('views', './components/theme');
app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');



//Routes
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Page index'
    });
});

app.get('/product-list', function (req, res) {
    res.render('product-list', {
        title: 'Page Product List',
    });
});

app.get('/product', function (req, res) {
    res.render('product', {
        title: 'Page Product',
    });
});




//Server config
var port = 3000;

app.listen( port, function () {
    console.log('app.js listen: http://localhost:' + port);
});


