<!--
 * @Author: w
 * @Date: 2019-08-05 16:11:20
 * @LastEditors: w
 * @LastEditTime: 2019-08-10 15:08:08
 -->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>

    </div>
    <button @click="msg.show = true">更新</button>
    <router-view />
    <update @close="closeUpdate" :msg="msg"></update>
  </div>
</template>

<script>
import update from "@/components/update.vue";
import { ipcRenderer } from "electron";
export default {
  name: "app",
  components: {
    update
  },
  data() {
    return {
      msg: {
        show: false,
        percent: 0,
        install: false
      }
    };
  },
  mounted() {
    // ipcRenderer.send("checkForUpdate");
    this.updateApp();
    this.returnMsg();
    this.download();
    this.update();
  },
  methods: {
    downloadProgress() {
      ipcRendereron.on("downloadProgress", (event, data) => {
        this.percent = data.percent.toFixed(2);
        if (data.percent >= 100) {
          // this.show = false;
        }
      });
    },
    returnMsg() {
      ipcRenderer.on("message", (event, data) => {
        this.$message.info(`${data.msg}`);
      });
    },
    download() {
      ipcRenderer.on("downloadProgress", (event, progressObj) => {
        this.msg.percent = progressObj.percent || 0;
      });
    },
    update() {
      ipcRenderer.on("isUpdateNow", () => {
        ipcRenderer.send("isUpdateNow");
      });
    },
    updateApp() {
      ipcRenderer.send("checkForUpdate");
    },
    closeUpdate() {
      this.msg.close = false;
      this.msg.percent = 0;
      this.msg.install = false;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
