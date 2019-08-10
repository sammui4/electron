<!--
 * @Author: w
 * @Date: 2019-08-05 16:11:20
 * @LastEditors: w
 * @LastEditTime: 2019-08-10 15:20:32
 -->
<template>
  <transition name="fade">
    <el-dialog
      title="应用更新"
      :visible.sync="msg.show"
      class=""
      :close-on-click-modal="false"
      @closed="close"
      append-to-body
      width="900px">

      <el-progress :percentage="msg.percent"></el-progress>
      <div class="dialog-footer" slot="footer">
        <el-button size="small" @click="updateApp" type="primary">确定</el-button>
        <!-- <el-button size="small" @click="msg.show = false">取消</el-button> -->
      </div>
    </el-dialog>
    
  </transition>
</template>

<script>
import { ipcRenderer } from "electron";
export default {
  name: "update",
  methods: {
    close() {
      ipcRenderer.removeAllListeners(["message", "downloadProgress", "isUpdateNow"]);//remove只能移除单个事件，单独封装removeAll移除所有事件
      this.$emit("update:show", false);
    },
    updateApp() {
      ipcRenderer.send("checkForUpdate");
    },
    closeAndInstall(){
      
    }
  },
  props: {
    msg:{
      type:Object,
      required:true,
      default(){
        return {
        show:false,
        percent:0   
        }
      }
    }
  }
}
</script>


<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.percentage {
  margin-top: 20px;
}

.progress {
  width: 350px;
  height: 30px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  margin: 10px auto;
}

.progress .length {
  background-color: #e4393c;
  border-radius: 8px;
  width: 10px;
  height: 30px;
}
</style>