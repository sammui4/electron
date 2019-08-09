/*
 * @Author: w
 * @Date: 2019-08-05 16:11:20
 * @LastEditors: w
 * @LastEditTime: 2019-08-09 17:42:21
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
        productName:'electron-cpms',
        win: {
          icon: './public/app.ico',
          artifactName: "${productName}_setup_${version}.${ext}"      //一定要设置，不然会出问题
        },
        mac: {
          icon: './public/app.png',
          artifactName: "${productName}_setup_${version}.${ext}"      //一定要设置，不然会出问题
        },
        // nsis: {
        //   oneClick: true,
        //   perMachine: true,
        //   allowElevation: true,
        //   allowToChangeInstallationDirectory: true,
        //   createDesktopShortcut: true,
        //   runAfterFinish: true,
        //   installerIcon: "./build/icon.ico",
        //   uninstallerIcon: "./build/icon.ico"
        // },
      }
    }
  }
};