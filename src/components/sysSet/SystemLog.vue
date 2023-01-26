<template>
  <div>
    <div class="block" style="margin-top: 30px">
      <h4>Login Record</h4>
      <el-main style="height: 500px; margin-top: 10px" class="goTop">
        <el-backtop target=".goTop">
          <i class="el-icon-caret-top"></i>
        </el-backtop>

        <el-timeline>
          <el-timeline-item v-for="(item,index) in RecordData" :timestamp="item.loginTime" placement="top">
            <el-card>
              <span style="color: orange; margin-right: 10px">{{ item.username }}</span>
              <span> Login at </span>
              <span style="color: orange; margin-left: 10px">{{ item.loginTime }}</span>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-main>
    </div>
  </div>
</template>

<script>
export default {
  name: "SystemLog",
  data(){
    return{
      RecordData: {},
      // RecDate: '',
      // LoginUser: JSON.parse(window.sessionStorage.getItem('LoginUser')),
      // LoginDate: JSON.parse(window.sessionStorage.getItem('LoginDate')),
    }
  },

  methods:{
    getRecordData(){
      this.$getRequest("/apis/sysSetting/getRecord").then(resp => {
        if(resp){
          this.RecordData = resp;
        }
      })
    }
    // parseDate(){
    //   var RecDate = this.LoginDate.LogDate.slice(0,10);
    //   this.RecDate = RecDate;
    // }
  },

  mounted() {
    // this.parseDate();
    this.getRecordData();
  }
}
</script>

<style scoped>
  .goTop{
    height: 100vh;
    overflow-x: hidden;
  }

</style>
