import { autoUpdater } from 'electron-updater';
import { ipcMain } from 'electron';

let uploadUrl = 'http://172.20.200.84:8888/client'

class Update{
  // mainWindow;
  constructor(mainWindow){
    this.mainWindow = mainWindow
    this.message = {
      error: '检查更新出错',
      checking: '正在检查更新……',
      updateAva: '检测到新版本，正在下载……',
      updateNotAva: '现在使用的就是最新版本，不用更新',
      updateFinish:'下载成功'
    }
    const os = require('os');
    autoUpdater.setFeedURL(uploadUrl);

    this.error();
    this.start();
    this.allow();
    this.unallowed();
    this.listen();
    this.download();
    this.load()
  }
  error(){
    autoUpdater.on('error',  (error) =>{
      sendUpdateMessage(this.message.error)
    });
  }
  start () { // 当开始检查更新的时候触发
    autoUpdater.on('checking-for-update', (event, arg) => {
      this.Message(this.message.checking)
    })
  }
  allow () { // 发现可更新数据时
    autoUpdater.on('update-available', (event, arg) => {
      this.Message(this.message.updateAva)
    })
  }
  unallowed () { // 没有可更新数据时
    autoUpdater.on('update-not-available', (event, arg) => {
      this.Message(this.message.updateNotAva)
    })
  }
  listen () { // 下载监听
    autoUpdater.on('download-progress', (progressObj) => {
      // this.Message(this.message.updateAva)
      this.mainWindow.webContents.send('downloadProgress', progressObj)
    })
  }
  download () { // 下载完成
    autoUpdater.on('update-downloaded', () => {
      // this.Message(this.message.updateFinish)
      ipcMain.on('isUpdateNow',(e,arg)=>{
        console.log(arguments);
        console.log('开始更新');
        autoUpdater.quitAndInstall();
      })
      this.mainWindow.webContents.send('isUpdateNow')
    })
  }
  load(){
    ipcMain.on("checkForUpdate",()=>{
      //执行自动更新检查
      autoUpdater.checkForUpdates();
    })
  }
  // load () { // 触发器
  //   autoUpdater.checkForUpdates()
  // }
  Message (type, data) {
    // this.mainWindow.webContents.send('message', type, data)
    this.mainWindow.webContents.send('message', type)
  }
}

export default Update