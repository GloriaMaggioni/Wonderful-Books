const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        index: './src/js/main.js'
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
    },
    module: 
       {
        rules:[
           {
             test: /\.(sass|scss)$/i,
             use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options:{
                        sassOptions:{
                            quietDeps:true,
                        }
                    }
                }
              ],
           },
           {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
           },
           {
            test: /\.(png|jpe?g|gif|svg|webp)$/i,
            type: 'asset/resource',
           }
           
        ]
       },
       
    plugins:[
        new HtmlWebpackPlugin({
            title: 'Wonderfull Books ',
            template: 'index.html',
            favicon: './src/img/favicon.png',
        })
    ],
    devServer:{
        port: 5000,
        open: true,
        static: path.resolve(__dirname, 'dist')
    },
    mode: 'production'
}