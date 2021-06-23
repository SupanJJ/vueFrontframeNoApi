'use strict'
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    devServer: {
        port: process.env.VUE_APP_DEVELOP_PORT
    },
    configureWebpack: {
        devtool: 'source-map',
        performance: {
            hints: 'warning',
            maxEntrypointSize: 50000000,
            maxAssetSize: 30000000,
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js');
            }
        },
        resolve: {
            alias: {
                "%": resolve('jq_modules')
            },
        },
    }
}