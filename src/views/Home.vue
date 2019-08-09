<!--
 * @Author: w
 * @Date: 2019-08-05 16:11:20
 * @LastEditors: w
 * @LastEditTime: 2019-08-09 17:58:58
 -->

<template>
  <div class="home">
    <update :show.sync="show" :percent="percent"/>
    <p>version 1.0</p>
    <p>这是home页面</p>
    <button @click="updateApp" style="width:100px;height: 40px;">更新</button>
  </div>
</template>

<script>
// @ is an alias to /src
import update from '@/components/update.vue'
import { ipcRenderer } from "electron";
export default {
  name: 'home',
  components: {
    update
  },
  data(){
    return{
      show:false,
      percent:0
    }
  },
  mounted(){

  },
  methods:{
    downloadProgress(){
      ipcRendereron.on('downloadProgress', (event, data) => {
        this.percent = (data.percent).toFixed(2);
        if (data.percent >= 100) {
            // this.show = false;
        }
      });
    },
    returnMsg(){
      ipcRenderer.on('message', (event, data) => {
          switch (data.status) {
              case -1:
                  this.$Message.error(data.msg);
                  break;
              case 0:
                  this.$Message.loading(data.msg);
                  break;
              case 1:
                  this.show = true;
                  break;
          }
      });
    },
    updateApp(){
      ipcRenderer.send('checkForUpdate', 'asdad')
    }
  }
}
</script>
