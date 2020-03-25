//Require modules
var path              = require("path");
var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer      = require('autoprefixer');
var lostGrid          = require('lost');




//init
//Objects
var extractCommonThemeCSS  = new ExtractTextPlugin('./bundles/common.theme.styles.min.css');
var extractCommonVendorCSS = new ExtractTextPlugin('./bundles/common.vendor.styles.min.css');
//Variables
var entryPoints  = {};
var plugins      = [];
var devtoolValue = '';
var NODE_ENV     = process.env.NODE_ENV;


//Actions
//1
plugins.push(extractCommonThemeCSS);
plugins.push(extractCommonVendorCSS);
// plugins.push(
//     new webpack.ProvidePlugin({
//         M:         'moduleMPath'
//     })
// );
//2
switch(NODE_ENV) {
    case 'development':
        devtoolValue = 'source-map';
        break;
    case 'production':
        devtoolValue = 'nosources-source-map';
        break;
}
//3
entryPoints  = {
    './bundles/common.theme.scripts.min.js':  './entry/theme/common.js',
    './bundles/common.vendor.scripts.min.js':  './entry/vendor/common.js'
};
//4
if (NODE_ENV === 'production') {
    var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

    plugins.push(
        new UglifyJsPlugin({
            sourceMap: true
        })
    );
}
//5
if (NODE_ENV === 'development') {
    var liveReloadString = 'webpack-dev-server/client?http://localhost:9000';

    for (var prop in entryPoints) {
        typeof entryPoints[prop] ===  "object" ? entryPoints[prop].unshift(liveReloadString) : true;
    }
}



module.exports = {
    devtool: false,

    context: __dirname + '/',
    entry: entryPoints,
    output: {
        path: __dirname + '/',
        filename: '[name]',
        publicPath: '/'
    },
    module: {
        rules: [
            // {
            //     test: /\/?(?:[^\/]+\/?)*.js$/,
            //     use: [
            //         {
            //             loader: 'babel-loader',
            //             options: { presets: ['env'] }
            //         }
            //     ]
            // },
            {
                // test: /components\/theme\/?(?:[^\/]+\/?)*.styl$/,
                test: /entry\/theme\/common.styl/,
                use: extractCommonThemeCSS.extract(
                    {
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    // If you are having trouble with urls not resolving add this setting.
                                    // See https://github.com/webpack-contrib/css-loader#url
                                    url: false,
                                    minimize: true,
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        autoprefixer({
                                            browsers:['ie >= 10', 'last 2 version']
                                        }),
                                        lostGrid

                                    ],
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'stylus-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    }
                )
            },
            {
                // test: /entry\/vendor\/?(?:[^\/]+\/?)*.css$/,
                test: /components\/vendor\/?(?:[^\/]+\/?)*.css$/,
                use: extractCommonVendorCSS.extract(
                    {
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    // If you are having trouble with urls not resolving add this setting.
                                    // See https://github.com/webpack-contrib/css-loader#url
                                    url: false,
                                    minimize: true,
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        autoprefixer({
                                            browsers:['ie >= 10', 'last 2 version']
                                        })
                                    ],
                                    sourceMap: true
                                }
                            }
                        ]
                    }
                )
            }
        ]
    },
    resolve: {
        alias: {
            // moduleMPath:         path.resolve(__dirname, './draft/components/vendor/lp/materialize1/materialize.js'),
        }
    },
    plugins: plugins,

    devServer: {
        host: 'localhost',
        port: 9000,
        contentBase: __dirname + '/',
        publicPath: '/',
        watchContentBase: true,
        // proxy: {
        //     '/': {
        //         target: 'http://localhost:9000/',
        //         secure: false
        //     }
        // }
    }
};