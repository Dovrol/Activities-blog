const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
        { 
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, 
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.tsx$/,
            use: 'ts-loader',
            include: [path.resolve(__dirname, './src')],
            exclude: /node_modules/,
        },
        {
            test: /\.(jpg|png)$/,
            use: [
                {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'Assets/',
                    publicPath: 'Assets/'
                }
            }],
        }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}