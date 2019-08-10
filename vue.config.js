/*
 * @Author: w
 * @Date: 2019-08-05 16:11:20
 * @LastEditors: w
 * @LastEditTime: 2019-08-10 18:16:46
 */
const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  devServer: {
    // can be overwritten by process.env.HOST
    host: '0.0.0.0',  
    port: 8080
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'));
  },
  pluginOptions:{
    electronBuilder: {
      builderOptions: {
        productName:'新供应商协作系统',
        win: {
          icon: './public/app.ico',
          artifactName: "${productName}_setup_${version}.${ext}"      //一定要设置，不然会出问题
        },
       
        mac: {
          icon: './public/app.png',
          artifactName: "${productName}_setup_${version}.${ext}"      //一定要设置，不然会出现打包的文件名和latest.yml不一样的问题
        },
        publish: {
          // provider: 'github',
          // repo: 'xxxx', // git仓库
          // owner: 'xxxx', // 拥有者
          // token: 'xxxxxxxxxxxxxxx', // gitToken
          // releaseType: 'release',
          // publishAutoUpdate: true, // 发布自动更新（需要配置GH_TOKEN）。 默认true
          provider: "generic",
          url: "http://localhost:888/client"
        },
        nsis: {
          /** 压缩形式，默认normal;store打包最快，适合测试;maximum打包体积最小，适合生产模式 **/
          oneClick: false,
          perMachine: true,
          allowElevation: true,
          allowToChangeInstallationDirectory: true,
          createDesktopShortcut: true,
          runAfterFinish: true,
        },
      }
    }
  }
};