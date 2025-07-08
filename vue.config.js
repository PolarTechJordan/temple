const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  
  // 公共路径
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  
  // 输出目录
  outputDir: 'dist',
  
  // 静态资源目录
  assetsDir: 'static',
  
  // 生产环境关闭source map
  productionSourceMap: false,
  
  // 路径别名
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@stores': path.resolve(__dirname, 'src/stores'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@utils': path.resolve(__dirname, 'src/utils')
      }
    },
    
    // 优化配置
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          },
          web3: {
            test: /[\\/]node_modules[\\/](web3|ethers|@walletconnect)[\\/]/,
            name: 'web3',
            chunks: 'all'
          }
        }
      }
    }
  },
  
  // CSS配置 - 暂时移除自动导入
  css: {
    loaderOptions: {
      scss: {
        // additionalData: `
        //   @import "@/styles/global.css";
        //   @import "@/styles/responsive.css";
        // `
      }
    }
  },
  
  // 开发服务器配置
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    hot: true,
    
    // 代理配置 - 用于API请求
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/deepseek': {
        target: 'https://api.deepseek.com',
        changeOrigin: true,
        pathRewrite: {
          '^/deepseek': ''
        }
      }
    },
    
    // 历史模式回退
    historyApiFallback: true
  },
  
  // PWA配置
  pwa: {
    name: '财神庙 - Rich Temple',
    themeColor: '#d4af37',
    msTileColor: '#d4af37',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    
    // 图标配置
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    },
    
    // Workbox配置
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/sw.js'
    }
  },
  
  // 链式操作
  chainWebpack: config => {
    // 设置页面标题
    config.plugin('html').tap(args => {
      args[0].title = '财神庙 - Rich Temple | Web3祈福平台'
      return args
    })
    
    // 预加载资源 - 检查插件是否存在
    if (config.plugins.has('preload')) {
      config.plugin('preload').tap(options => {
        options[0] = {
          rel: 'preload',
          include: 'initial',
          fileBlacklist: [/\.map$/, /hot-update\.js$/]
        }
        return options
      })
    }
    
    // 预获取资源 - 检查插件是否存在
    if (config.plugins.has('prefetch')) {
      config.plugin('prefetch').tap(options => {
        options[0].fileBlacklist = options[0].fileBlacklist || []
        options[0].fileBlacklist.push(/\.map$/, /hot-update\.js$/)
        return options
      })
    }
    
    // 图片压缩 - 暂时注释掉，避免与默认配置冲突
    // config.module
    //   .rule('images')
    //   .test(/\.(gif|png|jpe?g|svg)$/i)
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     mozjpeg: {
    //       progressive: true,
    //       quality: 80
    //     },
    //     optipng: {
    //       enabled: true
    //     },
    //     pngquant: {
    //       quality: [0.8, 0.9],
    //       speed: 4
    //     },
    //     gifsicle: {
    //       interlaced: false
    //     }
    //   })
    
    // 处理视频文件
    config.module
      .rule('media')
      .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'media/[name].[hash:8].[ext]'
      })
  },
  
  // 插件配置
  pluginOptions: {
    // 自动导入
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/styles/variables.scss')
      ]
    }
  }
}) 