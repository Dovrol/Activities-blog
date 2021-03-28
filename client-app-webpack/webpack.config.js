const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
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
            test: /\.(tsx|ts)$/,
            use: 'ts-loader',
            include: [path.resolve(__dirname, './src')],
            exclude: /node_modules/,
        },
        {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
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
    devServer: {
        historyApiFallback: true,
      },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}