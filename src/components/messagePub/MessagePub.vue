<template>
  <div>
    <div style="display: flex; justify-content: space-between">
      <div style="margin-top: 15px">
        <el-form :rules="rules" :model="messageInfo">
          <el-form-item prop="title">
          <el-input v-model="messageInfo.title" class="titleClass" placeholder="Message Title" size="mini"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-right: 60px">
        <el-button @click="pubMsg(2)" icon="el-icon-folder-opened" size="mini" type="warning" style="margin-right: 20px">Save to Draft Box</el-button>
        <el-button @click="pubMsg(1)" icon="el-icon-s-promotion" size="mini" type="primary">Publish Message</el-button>
      </div>
    </div>
    <div>
      <mavon-editor v-model="messageInfo.mdContent" @change="mdChange" class="md" language="en" :ishljs="true"></mavon-editor>
    </div>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: "MessagePub",
  data(){
    return{
      messageInfo:{
        id: null,
        title: '',
        mdContent: '',
        htmlContent: '',
        status: -1,
      },
      rules:{
        title:[{required:true,message:'Title is Required',trigger:'blur'}],
      }
    }
  },
  methods:{
    initEditMsg(){
      this.$getRequest("/apis/msgPub/getMsgForEdit/?id="+this.$route.query.mid).then(resp => {
        if(resp){
          Object.assign(this.messageInfo, resp)
        }
      })
    },

    pubMsg(status){
      if(this.messageInfo.title != '' && this.messageInfo.title != null && this.messageInfo.mdContent != '' && this.messageInfo.mdContent != null){
        this.messageInfo.status = status;
        if(this.messageInfo.id == null){
          this.$postRequest("/apis/msgPub/pub",this.messageInfo).then(resp => {
            if(resp){
              this.messageInfo.id = resp.obj.id;
              pubsub.publish('token');
            }
          })
        }else {
          this.$putRequest("/apis/msgPub/modifyMsg",this.messageInfo).then(resp => {
            pubsub.publish('token');
          })
        }
      }
      else {
        this.$message.warning('Message Title or Content Required')
      }
    },

    mdChange(md,html){
      this.messageInfo.mdContent = md;
      this.messageInfo.htmlContent = html;
    }
  },

  mounted() {
    if(this.$route.query.mid){
      this.initEditMsg();
    }
  }
}
</script>

<style scoped>
  .titleClass{
    width: 300px;
  }
  .md{
    margin-top: 10px;
    width: 95%;
    height: 500px;
  }
</style>
