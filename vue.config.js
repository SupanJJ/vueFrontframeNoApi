"use strict";
const path = require("path");
var webpack = require("webpack");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
function resolve(dir) {
    return path.join(__dirname, dir);
}
let webpack_plugins = [
    new webpack.ProvidePlugin({
        "window.Quill": "quill/dist/quill.js",
        Quill: "quill/dist/quill.js",
    }),
    new BundleAnalyzerPlugin(), // 使用默认配置
    new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 100000, // 通过合并小于 minChunkSize 大小的 chunk，将 chunk 体积保持在指定大小限制以上
    }),
    new CompressionPlugin({
        algorithm: "gzip", // 使用gzip压缩
        test: /\.js$|\.css$|\.html$/, // 匹配文件名
        filename: "[path][base].gz", // 压缩后的文件名(保持原文件名，后缀加.gz)
        minRatio: 0.8, // 压缩率小于0.8才会压缩
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
    }),
];

if (process.env.NODE_ENV === "production") {
    webpack_plugins.push(
        new TerserPlugin({
            cache: true,
            sourceMap: false,
            parallel: true,
            terserOptions: {
                ecma: undefined,
                warnings: false,
                parse: {},
                compress: {
                    //drop_console: process.env.NODE_ENV === 'production' ? true : false,//console
                    drop_debugger:
                        process.env.NODE_ENV === "production" ? true : false,
                    pure_funcs:
                        process.env.NODE_ENV === "production"
                            ? ["console.log", "console.warn"]
                            : [], //移除console
                },
            },
        })
    );
}
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
    productionSourceMap: process.env.NODE_ENV === "production" ? false : true, //不显示webpack源码
    devServer: {
        port: process.env.VUE_APP_DEVELOP_PORT,
        proxy: {
            "/geely_api": {
                //target: 'http://gap-service-tenant-auth.app.dev01.geely.ocp', // 你请求的第三方接口 测试
                target: "http://gap-service-tenant-auth-sit.sgw.geely.svc", // 你请求的第三方接口 正式
                changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {
                    // 路径重写，
                    "^/geely_api": "", // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
                },
                timeout: 60 * 1000,
            },
            "/geely_sso_api": {
                target: "http://geely-uc-sso-protocol-restful-sit.sgw.test.geely.svc", // 你请求的第三方接口
                //target: "http://geely-uc-sso-protocol-restful.sgw.geely.svc/", // 你请求的第三方接口 正式
                changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {
                    // 路径重写，
                    "^/geely_sso_api": "", // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
                },
                timeout: 60 * 1000,
            },
            "/geely_file_api": {
                target: "http://preview-test.test.geely.com:80", // 你请求的第三方接口
                //target:"https://preview.geely.com/",
                changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {
                    // 路径重写，
                    "^/geely_file_api": "", // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
                },
                timeout: 60 * 1000,
            },
            // '/api': {
            //     target: 'http://10.190.49.113:8000', // 你请求的第三方接口
            //     changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
            //     pathRewrite: { // 路径重写，
            //         '^/api': '' // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
            //     },
            //     timeout:60*1000
            // },
        },
    },
    configureWebpack: {
        devtool: "source-map",
        plugins: webpack_plugins,
        performance: {
            hints: "warning",
            maxEntrypointSize: 50000000,
            maxAssetSize: 80000000,
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith(".js");
            },
        },
        resolve: {
            alias: {
                "%": resolve("public_modules"), //外部公共模块引入
            },
        },
    },
    chainWebpack: (config) => {
        config
            .plugin("ignore")
            .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)); //忽略/moment/locale下的所有文件
        // svg rule loader
        const svgRule = config.module.rule("svg"); // 找到svg-loader
        svgRule.uses.clear(); // 清除已有的loader, 如果不这样做会添加在此loader之后
        svgRule.exclude.add(/node_modules/); // 正则匹配排除node_modules目录
        svgRule // 添加svg新的loader处理
            .test(/\.svg$/)
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]",
            });
        // 修改images loader 添加svg处理
        config.module
            .rule("images")
            .exclude.add(resolve("src/assets/icon_font"))
            .end();
        //解决elementUI icon部署不显示
        config.module
            .rule("fonts")
            .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
            .use("url-loader")
            .loader("url-loader")
            .options({
                esModule: false,
                limit: 10000, // 小于12kb的图片压缩成base64，图片太大转成base64反而不太合适
                name: "fonts/[name].[hash:7].[ext]", //指定打包后的图片存放的位置，一般放在static下img文件夹里 name.ext分别为：文件名.文件后缀（按照原图片名）
            });
        config.module
            .rule("images")
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
            .use("url-loader")
            .loader("url-loader")
            .options({
                esModule: false,
                limit: 1024 * 12, // 小于12kb的图片压缩成base64，图片太大转成base64反而不太合适
                name: "img/[name].[ext]", //指定打包后的图片存放的位置，一般放在static下img文件夹里 name.ext分别为：文件名.文件后缀（按照原图片名）
            })
            .end() // 返回上一级 以便于继续添加loader
            .use("image-webpack-loader")
            .loader("image-webpack-loader")
            .options({
                disable: process.env.NODE_ENV == "development" ? true : false, // 开发环境禁用压缩，生产环境才做压缩，提升开发调试速度
                mozjpeg: { quality: 60 }, // 压缩JPEG图像，压缩质量quality为60，范围0到100
                optipng: { enabled: true }, // 压缩PNG图像，enabled为true开启压缩
                pngquant: { quality: [0.65, 0.9], speed: 4 }, // 质量区间和速度就使用默认值吧
                gifsicle: { interlaced: false }, // Interlace gif for progressive rendering 默认false
                webp: { quality: 60 }, // 压缩webp图片，压缩质量quality为60，范围0到100
            })
            .end() // 返回上一级 继续添加loader
            .enforce("post"); // 表示先执行配置在下面那个loader，即image-webpack-loader
    },
    css: {
        extract: {
            ignoreOrder: true,
        },
    },
};
