module.exports = {
    // 相当于webpack-dev-server，对本地服务器进行配置
    devServer: {
        proxy: {
            "/video": {
                target: "http://localhost:11111/video/",// 需要跨域的目标url，我这里用到的是豆瓣API
                changeOrigin: true, // 将基于名称的虚拟托管网站的选项，如果不配置，请求会报404
                ws: true,
                pathRewrite: {
                    "^/video": ''
                }
            },
            "/member": {
                target: "http://localhost:11111/member/",// 需要跨域的目标url，我这里用到的是豆瓣API
                changeOrigin: true, // 将基于名称的虚拟托管网站的选项，如果不配置，请求会报404
                ws: true,
                pathRewrite: {
                    "^/member": ''
                }
            },
            "/article": {
                target: "http://localhost:11111/article/",// 需要跨域的目标url，我这里用到的是豆瓣API
                changeOrigin: true, // 将基于名称的虚拟托管网站的选项，如果不配置，请求会报404
                ws: true,
                pathRewrite: {
                    "^/article": ''
                }
            }
        }
    },
    //打包
    publicPath: '/'
}