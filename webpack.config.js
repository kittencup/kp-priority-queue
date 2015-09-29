var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        'KpPriorityQueue':'./src/PriorityQueue.js',
        'KpPriorityQueue.min':'./src/PriorityQueue.js'
    },
    output: {
        filename: './dist/[name].js',
        library: 'KpLocalStorage',
        libraryTarget:'umd'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js']
    },
    // Add minification
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include:/\.min\.js($|\?)/i
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                include: [
                    path.resolve(__dirname, "src")
                ]
            }
        ],
        preLoaders: [{
            test: /\.js$/,
            include: [
                path.resolve(__dirname, "src"),
                path.resolve(__dirname, "test")
            ],
            loader: 'jshint-loader'
        }]
    },
    jshint: {
        'node': false,
        'browser': true,
        'esnext': true,
        'bitwise': false,
        'camelcase': true,
        'curly': false,
        'eqeqeq': true,
        'immed': true,
        'forin':true,
        'latedef': true,
        'newcap': true,
        'noarg': true,
        'quotmark': 'single',
        'regexp': true,
        'undef': true,
        'unused': true,
        'strict': true,
        'trailing': true,
        'smarttabs': false,
        'globals': {},
        'predef': [
            'define',
            'require',
            'exports',
            'module',
            'describe',
            'before',
            'beforeEach',
            'after',
            'afterEach',
            'it',
            'inject',
            'expect',
            'spyOn'
        ],
        'indent': 4,
        'devel': true,
        'noempty': true,
        'maxlen': 0
    }
}