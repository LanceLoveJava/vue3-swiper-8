module.exports = {
    publicPath: '/',
    assetsDir: 'static',
    productionSourceMap: false,
    lintOnSave: process.env.NODE_ENV === 'development',
    devServer: {
        open: true,
        disableHostCheck: true,
        port: 80,
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: process.env.VUE_APP_PATH,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: '',
                },
            },
        },
    },
}