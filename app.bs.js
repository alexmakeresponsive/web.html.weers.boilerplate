var webpack          = require("webpack");
var webpackConfigObj = require('./webpack.config.js');
var bs               = require("browser-sync").create();
var { exec }         = require('child_process');



// exec('node app.js');



//Webpack
// var webpackProvider = webpack(webpackConfigObj, (err, stats) => {
//     if (err || stats.hasErrors()) {
//         console.log(err);
//     } else {
//         bs.reload();
//     }
// });
//Webpack



//BrowserSync
bs.watch("./components/**/*.ejs").on("change", function () {
    // exec('node app.js', function () {
    //     bs.reload();
    // });

    bs.reload();
});

bs.watch("./components/**/*.styl", function (event, file) {
    if (event === "change") {
        webpack(webpackConfigObj, (err, stats) => {
            if (err || stats.hasErrors()) {
                console.log(err);
            } else {
                bs.reload();
            }
        });
    }
});

bs.init({
    proxy: 'localhost:3000',
    ui: false,
    open: false
});
//BrowserSync