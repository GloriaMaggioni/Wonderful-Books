 const path = require('path');
 const HtmlWebpackPlugin =  require('html-webpack-plugin')

 module.exports = {
    entry:{
        app: './src/index.js'
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module:{},
    plugins:[
        new HtmlWebpackPlugin({
            title: 'Wonderful Books',
            template: './src/index.html'
        })
    ],
    devServer:{
        port: 5000,
        open: true,
        static: path.resolve(__dirname, 'dist')
    },
    mode: 'development'
 }