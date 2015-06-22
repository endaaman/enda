var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
// var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

var argv = require('yargs').argv;


var options = new function() {
    this.prod = !!argv.p;
    this.fileName = this.prod ? '[name]-[hash]' : '[name]';
    this.destDirName = 'build';
    this.defines = {
        'process.env.NODE_ENV': JSON.stringify(this.prod ? 'production' : 'development')
    }
}

module.exports = new function() {

    if (options.prod) {
    } else {
        this.devtool = '#inline-source-map';
    }


    this.module = {
        loaders: [
            { test: /\.coffee$/, loader: 'coffee!source-map' },
            { test: /\.jade$/,   loader: 'jade?self' },
            { test: /\.(png|jpe?g|gif)$/, loader: 'file'},
            { test: /\.sass$/,
                loader: ExtractTextPlugin.extract('css?sourceMap!sass?indentedSyntax&sourceMap!autoprefixer')
            },
            { test: /\.css$/,
                loader: ExtractTextPlugin.extract('css?sourceMap')
            },
            // { test: /\.scss$/,
            //     loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap!autoprefixer') },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url?limit=10000&minetype=application/font-woff' },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' }
        ]
    };


    this.resolve = {
        extensions: ['', '.js', '.coffee', '.webpack.js', '.web.js']
    };


    this.entry = {
        app: ['./app/index.coffee'],
        vendor: ['./app/vendor.coffee']
    };

    this.output = {
        path: path.join(__dirname, options.destDirName),
        publicPath: '/',
        filename:  options.fileName + '.js',
        chunkFilename: '[id].js'
    };


    this.plugins = [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin(options.defines),
        new webpack.optimize.CommonsChunkPlugin('vendor', options.fileName + '.js'),
        new ExtractTextPlugin(options.fileName + '.css', { allChunks: false }),
        new HtmlWebpackPlugin({
            template: 'app/index.html',
            favicon: './app/assets/favicon.ico',
            inject: 'body'
        })
    ];


    this.devServer = {
        contentBase: './' + options.destDirName,
        noInfo: true,
        hot: false,
        lazy: false,
        inline: true,
        historyApiFallback: true,
        stats: { colors: true }
    };
}
